import axios from 'axios';
import {
    GET_ATTENDANCE_DATA_SUCCESS,
    GET_ATTENDANCE_DATA_FAILURE,
    CREATE_ATTENDANCE_DATA_SUCCESS,
    CREATE_ATTENDANCE_DATA_FAILURE,
    UPDATE_ATTENDANCE_DATA_SUCCESS,
    UPDATE_ATTENDANCE_DATA_FAILURE,
    DELETE_ATTENDANCE_DATA_SUCCESS,
    DELETE_ATTENDANCE_DATA_FAILURE,
} from './attendanceActionTypes';

const API_BASE_URL = 'http://localhost:5000';

export const getAttendanceData = (_startIndex, _endIndex) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/attendance`);
            dispatch({
                type: GET_ATTENDANCE_DATA_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: GET_ATTENDANCE_DATA_FAILURE,
                payload: error?.message ?? 'Failed to fetch attendance data',
            });
        }
    };
};

export const createAttendanceData = (attendancePayload, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/attendance`, attendancePayload);
            dispatch({
                type: CREATE_ATTENDANCE_DATA_SUCCESS,
                payload: response.data,
            });

            if (typeof navigate === 'function') {
                navigate('/data-attendance');
            }

            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_ATTENDANCE_DATA_FAILURE,
                payload: error?.message ?? 'Failed to create attendance data',
            });
            throw error;
        }
    };
};

export const updateAttendanceData = (id, attendancePayload, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/attendance/${id}`, attendancePayload);
            dispatch({
                type: UPDATE_ATTENDANCE_DATA_SUCCESS,
                payload: response.data,
            });

            if (typeof navigate === 'function') {
                navigate('/data-attendance');
            }

            return response.data;
        } catch (error) {
            dispatch({
                type: UPDATE_ATTENDANCE_DATA_FAILURE,
                payload: error?.message ?? 'Failed to update attendance data',
            });
            throw error;
        }
    };
};

export const deleteAttendanceData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/attendance/${id}`);
            dispatch({
                type: DELETE_ATTENDANCE_DATA_SUCCESS,
                payload: response.data ?? 'Data deleted successfully',
            });
            return response.data;
        } catch (error) {
            dispatch({
                type: DELETE_ATTENDANCE_DATA_FAILURE,
                payload: error?.message ?? 'Failed to delete attendance data',
            });
            throw error;
        }
    };
};
