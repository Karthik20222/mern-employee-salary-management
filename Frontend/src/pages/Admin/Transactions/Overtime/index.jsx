import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../../layout';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../../components';
import { getMe } from '../../../../config/redux/action';

const initialFormState = {
    employeeId: '',
    overtimeDate: '',
    overtimeHours: '',
    reason: '',
};

const formatDateForInput = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toISOString().slice(0, 10);
};

const OvertimeData = () => {
    const [employees, setEmployees] = useState([]);
    const [overtimeEntries, setOvertimeEntries] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const { isError, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:5000/employees');
        setEmployees(response.data);
    };

    const fetchOvertimeEntries = async () => {
        const response = await axios.get('http://localhost:5000/overtime');
        setOvertimeEntries(response.data);
    };

    const validateForm = () => {
        const { employeeId, overtimeDate, overtimeHours, reason } = formData;

        if (!employeeId || !overtimeDate || !overtimeHours || !reason.trim()) {
            return 'All fields are required';
        }

        const parsedHours = Number(overtimeHours);
        if (!Number.isInteger(parsedHours) || parsedHours < 1 || parsedHours > 6) {
            return 'Overtime hours must be between 1 and 6';
        }

        const selectedDate = new Date(`${overtimeDate}T00:00:00`);
        if (Number.isNaN(selectedDate.getTime())) {
            return 'Invalid overtime date';
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const oldestAllowed = new Date(today);
        oldestAllowed.setDate(oldestAllowed.getDate() - 7);

        if (selectedDate > today) {
            return 'Date cannot be in the future';
        }

        if (selectedDate < oldestAllowed) {
            return 'Date cannot be more than 7 days in the past';
        }

        if (reason.trim().length < 10) {
            return 'Reason must be at least 10 characters';
        }

        return null;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initialFormState);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Failed',
                text: validationError,
            });
            return;
        }

        try {
            const payload = {
                employee_id: Number(formData.employeeId),
                overtime_date: formData.overtimeDate,
                overtime_hours: Number(formData.overtimeHours),
                reason: formData.reason.trim(),
            };

            const response = await axios.post('http://localhost:5000/overtime', payload);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.msg,
                timer: 1500,
                showConfirmButton: false,
            });

            resetForm();
            await fetchOvertimeEntries();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: error.response?.data?.msg || 'Unable to submit overtime entry',
            });
        }
    };

    const handleApprove = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:5000/overtime/${id}/approve`);
            Swal.fire({
                icon: 'success',
                title: 'Approved',
                text: response.data.msg,
                timer: 1200,
                showConfirmButton: false,
            });
            await fetchOvertimeEntries();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: error.response?.data?.msg || 'Unable to approve overtime entry',
            });
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchOvertimeEntries();
    }, []);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }

        if (user && user.role !== 'admin') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName='Overtime Entry & Approval' />

            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-8 mt-6'>
                <div className='border-b border-stroke pb-4 dark:border-strokedark'>
                    <h3 className='font-medium text-black dark:text-white'>
                        Log worker overtime for payroll processing
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className='mt-6 space-y-5'>
                    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
                        <div>
                            <label className='mb-2.5 block text-black dark:text-white'>
                                Worker <span className='text-meta-1'>*</span>
                            </label>
                            <select
                                name='employeeId'
                                value={formData.employeeId}
                                onChange={handleChange}
                                className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            >
                                <option value=''>Select worker</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.employee_name} - {employee.nik}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className='mb-2.5 block text-black dark:text-white'>
                                Overtime Date <span className='text-meta-1'>*</span>
                            </label>
                            <input
                                type='date'
                                name='overtimeDate'
                                value={formData.overtimeDate}
                                onChange={handleChange}
                                className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
                        <div>
                            <label className='mb-2.5 block text-black dark:text-white'>
                                Overtime Hours <span className='text-meta-1'>*</span>
                            </label>
                            <input
                                type='number'
                                name='overtimeHours'
                                min='1'
                                max='6'
                                value={formData.overtimeHours}
                                onChange={handleChange}
                                placeholder='1 - 6 hours'
                                className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>

                        <div>
                            <label className='mb-2.5 block text-black dark:text-white'>
                                Reason <span className='text-meta-1'>*</span>
                            </label>
                            <textarea
                                rows={3}
                                name='reason'
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder='Enter reason for overtime'
                                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                            />
                        </div>
                    </div>

                    <div className='flex justify-end gap-4'>
                        <ButtonTwo onClick={resetForm}>
                            Reset
                        </ButtonTwo>
                        <ButtonOne type='submit'>
                            Submit
                        </ButtonOne>
                    </div>
                </form>
            </div>

            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className='border-b border-stroke pb-4 dark:border-strokedark'>
                    <h3 className='font-medium text-black dark:text-white'>
                        Pending Overtime Approvals
                    </h3>
                </div>
                <div className='max-w-full overflow-x-auto py-4'>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Worker Name
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Date
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Hours
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Status
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {overtimeEntries.map((entry) => (
                                <tr key={entry.id}>
                                    <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                        <p className='text-black dark:text-white'>{entry.employee.employee_name}</p>
                                    </td>
                                    <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                        <p className='text-black dark:text-white'>{new Date(entry.overtime_date).toLocaleDateString()}</p>
                                    </td>
                                    <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                        <p className='text-black dark:text-white'>{entry.overtime_hours}</p>
                                    </td>
                                    <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                        <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${entry.status === 'approved' ? 'bg-success text-success' : 'bg-warning text-warning'
                                            }`}>
                                            {entry.status === 'approved' ? 'Approved' : 'Pending'}
                                        </p>
                                    </td>
                                    <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                        <div className='flex items-center space-x-3.5'>
                                            {entry.status !== 'approved' && (
                                                <ButtonOne onClick={() => handleApprove(entry.id)}>
                                                    Approve
                                                </ButtonOne>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default OvertimeData;