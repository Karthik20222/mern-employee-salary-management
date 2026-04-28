import axios from 'axios';
import {
    GET_SALARY_DATA_SUCCESS,
    GET_SALARY_DATA_FAILURE,
    DELETE_SALARY_DATA_SUCCESS,
    DELETE_SALARY_DATA_FAILURE
} from './salaryActionTypes';

const API_URL = 'http://localhost:5000';

export const getDataGaji = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/data_gaji_pegawai`);
            dispatch({
                type: GET_SALARY_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_SALARY_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDataGaji = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/data_gaji_pegawai/id/${id}`);
            dispatch({
                type: DELETE_SALARY_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_SALARY_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};
