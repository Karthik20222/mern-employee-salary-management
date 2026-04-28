import axios from 'axios';
import {
    GET_DEDUCTION_DATA_SUCCESS,
    GET_DEDUCTION_DATA_FAILURE,
    CREATE_DEDUCTION_DATA_SUCCESS,
    CREATE_DEDUCTION_DATA_FAILURE,
    UPDATE_DEDUCTION_DATA_SUCCESS,
    UPDATE_DEDUCTION_DATA_FAILURE,
    DELETE_DEDUCTION_DATA_SUCCESS,
    DELETE_DEDUCTION_DATA_FAILURE
} from './deductionActionTypes';

const API_URL = 'http://localhost:5000';

export const getDeductionData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/salary_deductions`);
            dispatch({
                type: GET_DEDUCTION_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DEDUCTION_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDeductionData = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/salary_deductions`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_DEDUCTION_DATA_SUCCESS,
                payload: response.data
            });
            navigate("/data-deduction");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_DEDUCTION_DATA_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateDeductionData = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/salary_deductions/${id}`, data);
            dispatch({
                type: UPDATE_DEDUCTION_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_DEDUCTION_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDeductionData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/salary_deductions/${id}`);
            dispatch({
                type: DELETE_DEDUCTION_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_DEDUCTION_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};
