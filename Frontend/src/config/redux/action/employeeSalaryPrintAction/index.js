import axios from "axios";
import {
    GET_SINGLE_EMPLOYEE_SALARY_DATA_SUCCESS,
    GET_SINGLE_EMPLOYEE_SALARY_DATA_FAILURE,
} from "./salaryEmployeeDataPrintActionTypes";

export const viewSalaryDataSinglePegawaiSuccess = (data) => ({
    type: GET_SINGLE_EMPLOYEE_SALARY_DATA_SUCCESS,
    payload: data,
});

export const viewSalaryDataSinglePegawaiFailure = (error) => ({
    type: GET_SINGLE_EMPLOYEE_SALARY_DATA_FAILURE,
    payload: error,
});

export const viewGajiSinglePegawaiByYear = (dataYear) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/employee_salaries/month/${dataYear}`
        );
        const data = response.data;
        dispatch(viewSalaryDataSinglePegawaiSuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewSalaryDataSinglePegawaiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};

export const viewGajiSinglePegawaiByMonth = (dataMonth) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/employee_salaries/month/${dataMonth}`
        );
        const data = response.data;
        dispatch(viewSalaryDataSinglePegawaiSuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewSalaryDataSinglePegawaiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};

export const viewGajiSinglePegawaiByName = (employee_name) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/employee_salaries/name/${employee_name}`
        );
        const data = response.data;
        dispatch(viewSalaryDataSinglePegawaiSuccess(data));
    } catch (error) {
        console.log(error);
        if (employee_name) {
            dispatch(viewSalaryDataSinglePegawaiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};
