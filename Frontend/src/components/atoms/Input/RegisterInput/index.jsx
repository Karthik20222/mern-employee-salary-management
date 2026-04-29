import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function RegisterInput() {
  const [formData, setFormData] = useState({
    national_id: "",
    employee_name: "",
    username: "",
    password: "",
    confPassword: "",
    gender: "Male",
    position: "Employee",
    designation: "Staff",
    hire_date: new Date().toISOString().split('T')[0],
    employment_status: "Permanent",
    role: "employee"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: response.data.msg,
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.msg || "Something went wrong",
      });
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='mb-4'>
          <label className='mb-2.5 block font-medium text-black dark:text-white text-sm'>
            National ID (NIK)
          </label>
          <input
            type='text'
            name="national_id"
            value={formData.national_id}
            onChange={handleChange}
            required
            className='w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input'
          />
        </div>

        <div className='mb-4'>
          <label className='mb-2.5 block font-medium text-black dark:text-white text-sm'>
            Full Name
          </label>
          <input
            type='text'
            name="employee_name"
            value={formData.employee_name}
            onChange={handleChange}
            required
            className='w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input'
          />
        </div>

        <div className='mb-4'>
          <label className='mb-2.5 block font-medium text-black dark:text-white text-sm'>
            Username
          </label>
          <input
            type='text'
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className='w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input'
          />
        </div>

        <div className='mb-4'>
          <label className='mb-2.5 block font-medium text-black dark:text-white text-sm'>
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className='w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input'
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className='mb-4'>
          <label className='mb-2.5 block font-medium text-black dark:text-white text-sm'>
            Password
          </label>
          <input
            type='password'
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className='w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input'
          />
        </div>

        <div className='mb-4'>
          <label className='mb-2.5 block font-medium text-black dark:text-white text-sm'>
            Confirm Password
          </label>
          <input
            type='password'
            name="confPassword"
            value={formData.confPassword}
            onChange={handleChange}
            required
            className='w-full rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input'
          />
        </div>
      </div>

      <div className='mt-6'>
        <input
          type='submit'
          value="Sign Up"
          className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 font-bold'
        />
      </div>

      <div className='mt-6 text-center'>
        <p className="text-black dark:text-white">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </form>
  );
}

export default RegisterInput;
