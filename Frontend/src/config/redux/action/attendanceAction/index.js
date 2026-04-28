import axios from 'axios';
import {
    GET_ATTENDANCE_DATA_SUCCESS,
    GET_ATTENDANCE_DATA_FAILURE,
    CREATE_ATTENDANCE_DATA_SUCCESS,
    CREATE_ATTENDANCE_DATA_FAILURE,
    UPDATE_ATTENDANCE_DATA_SUCCESS,
    UPDATE_ATTENDANCE_DATA_FAILURE,
    DELETE_ATTENDANCE_DATA_SUCCESS,
    DELETE_ATTENDANCE_DATA_FAILURE
} from './attendanceActionTypes';

export const getAttendanceData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5000/attendance');
            const dataAttendance = response.data;
            dispatch({
                type: GET_ATTENDANCE_DATA_SUCCESS,
                payload: dataAttendance
            });
        } catch (error) {
            dispatch({
                type: GET_ATTENDANCE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createAttendanceData = (employeeData, dataAttendance, navigate) => async (dispatch) => {
    try {
        for (let i = 0; i < employeeData.length; i++) {
            const isNamaAda = dataAttendance.some(
                (attendance) => attendance.employee_name === employeeData[i].employee_name
            );

            if (!isNamaAda) {
                const response = await axios.post("http://localhost:5000/attendance", {
                    nik: employeeData[i].nik,
                    employee_name: employeeData[i].employee_name,
                    nama_position: employeeData[i].position,
                    gender: employeeData[i].gender,
                    present_days: present_days[i] || 0,
                    sick_days: sick_days[i] || 0,
                    absent_days: absent_days[i] || 0,
                });

                dispatch({
                    type: CREATE_ATTENDANCE_DATA_SUCCESS,
                    payload: response.data,
                });

                navigate("/data-attendance");
                return response.data;
            }
        }
    } catch (error) {
        dispatch({
            type: CREATE_ATTENDANCE_DATA_FAILURE,
            payload: error.message,
        });
        throw error;
    }
};

export const updateAttendanceData = (id, dataAttendance) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:5000/attendance/${id}`, dataAttendance);
            if (response.status === 200) {
                payload: 'Attendance data updated successfully'
                });
                navigate('/attendance-data');
            } catch (error) {
                dispatch({
                    type: UPDATE_ATTENDANCE_DATA_FAILURE,
                    payload: error.message
                });
            }
        };
    };

    export const deleteAttendanceData = (id) => {
        return async (dispatch) => {
            try {
                await axios.delete(`${API_URL}/attendance-data/${id}`);
                dispatch({
                    type: DELETE_ATTENDANCE_DATA_SUCCESS,
                    payload: 'Data deleted successfully'
                });
            } catch (error) {
                dispatch({
                    type: DELETE_ATTENDANCE_DATA_FAILURE,
                    payload: error.message
                });
            }
        };
    };
            } else {
                dispatch({
                    type: UPDATE_ATTENDANCE_DATA_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_ATTENDANCE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteAttendanceData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:5000/attendance/${id}`);
            if (response.status === 200) {
                dispatch({
                    type: DELETE_ATTENDANCE_DATA_SUCCESS,
                    payload: 'Delete data berhasil'
                });
                dispatch(getAttendanceData());
            } else {
                dispatch({
                    type: DELETE_ATTENDANCE_DATA_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: DELETE_ATTENDANCE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};
