import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getMe } from '../../../config/redux/action';
import Layout from '../../../layout';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../components';
import { TfiPrinter } from 'react-icons/tfi';

const SalaryDetail = () => {
    const [data, setData] = useState({
        year: '',
        month: '',
        nationalId: '',
        employeeName: '',
        positionName: '',
        baseSalary: '',
        transportAllowance: '',
        mealAllowance: '',
        deduction: '',
        total: '',
    });
    const { name } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const onSubmitPrint = () => {
        navigate(`/laporan/slip-gaji/print-page?month=${data.month}&year=${data.year}&name=${name}`);
    };

    useEffect(() => {
        const getEmployeeData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/employee_salaries/name/${name}`);
                const src = response.data[0] || {};
                const mapped = {
                    year: src.tahun || src.year || '',
                    month: src.bulan || src.month || '',
                    nationalId: src.nik || src.nationalId || '',
                    employeeName: src.employee_name || src.employeeName || '',
                    positionName: src.position || src.positionName || '',
                    baseSalary: src.base_salary || src.baseSalary || '',
                    transportAllowance: src.transport_allowance || src.transportAllowance || '',
                    mealAllowance: src.meal_allowance || src.mealAllowance || '',
                    deduction: src.deduction || src.deduction || '',
                    total: src.total || src.totalSalary || '',
                };

                setData(mapped);
            } catch (error) {
                console.log(error);
            }
        };

        getEmployeeData();
    }, [name]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
        if (user && user.accessRights !== 'admin') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName='Salary Detail' />
            <Link to='/data-gaji'>
                <ButtonTwo>
                    <span>Back</span>
                </ButtonTwo>
            </Link>
            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className='flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between'>
                </div>

                <div className='max-w-full overflow-x-auto'>
                    <div className='md:w-2/3'>
                        <div className='w-full md:text-lg'>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Name</span>
                                <span className='inline-block w-7'>:</span>
                                {data.employeeName}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>National ID</span>
                                <span className='inline-block w-6'>:</span>{' '}
                                <span className='pl-[-10] md:pl-0'></span>
                                {data.nationalId}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Position</span>
                                <span className='inline-block w-7'>:</span>
                                {data.positionName}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Month</span>
                                <span className='pl-[-8] md:pl-0'></span>
                                <span className='inline-block w-7'>:</span>
                                {data.month}
                            </h2>
                            <h2 className='font-medium mb-4 block text-black dark:text-white'>
                                <span className='inline-block w-32 md:w-40'>Year</span>
                                <span className='inline-block w-7'>:</span>
                                {data.year}
                                <span className='pl-[-8] md:pl-0'></span>
                            </h2>
                        </div>
                    </div>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    No
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Description
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { label: 'Base Salary', amount: data.baseSalary },
                                { label: 'Transport Allowance', amount: data.transportAllowance },
                                { label: 'Meal Allowance', amount: data.mealAllowance },
                                { label: 'Deduction', amount: data.deduction },
                            ].map((row, rowIndex) => (
                                <tr key={row.label} className='bg-gray-50 dark:border-strokedark'>
                                    <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                        {rowIndex + 1}
                                    </td>
                                    <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                        {row.label}
                                    </td>
                                    <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                        Rp. {row.amount}
                                    </td>
                                </tr>
                            ))}
                            <tr className='bg-gray-50 dark:border-strokedark'>
                                <td className='border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'></td>
                                <td className='font-medium border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Total Salary
                                </td>
                                <td className='font-medium border-b border-[#eee] dark:border-strokedark py-5 px-4 text-black dark:text-white'>
                                    Rp. {data.total}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='w-full md:w-1/2 md:justify-end py-6'>
                        <div className='w-full md:w-auto'>
                            <ButtonOne onClick={onSubmitPrint}>
                                <span>Print Employee Payslip</span>
                                <span>
                                    <TfiPrinter />
                                </span>
                            </ButtonOne>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SalaryDetail;
