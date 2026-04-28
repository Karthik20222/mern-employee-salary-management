import axios from 'axios';
import {
    GET_POSITION_DATA_SUCCESS,
    GET_POSITION_DATA_FAILURE,
    CREATE_POSITION_DATA_SUCCESS,
    CREATE_POSITION_DATA_FAILURE,
    UPDATE_POSITION_DATA_SUCCESS,
    UPDATE_POSITION_DATA_FAILURE,
    DELETE_POSITION_DATA_SUCCESS,
    DELETE_POSITION_DATA_FAILURE
} from './positionActionTypes';

const API_URL = 'http://localhost:5000';

export const getPositionData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/positions`);
            dispatch({
                type: GET_POSITION_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_POSITION_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createPositionData = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/positions`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_POSITION_DATA_SUCCESS,
                payload: response.data
            });
            navigate("/data-position");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_POSITION_DATA_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updatePositionData = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/positions/${id}`, data);
            dispatch({
                type: UPDATE_POSITION_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_POSITION_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deletePositionData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/positions/${id}`);
            dispatch({
                type: DELETE_POSITION_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_POSITION_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};
