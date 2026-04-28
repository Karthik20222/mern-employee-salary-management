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

export const getDataKehadiran = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5000/data_kehadiran');
            const dataKehadiran = response.data;
            dispatch({
                type: GET_ATTENDANCE_DATA_SUCCESS,
                payload: dataKehadiran
            });
        } catch (error) {
            dispatch({
                type: GET_ATTENDANCE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDataKehadiran = (dataPegawai, dataKehadiran, navigate) => async (dispatch) => {
    try {
        for (let i = 0; i < dataPegawai.length; i++) {
            const isNamaAda = dataKehadiran.some(
                (kehadiran) => kehadiran.nama_pegawai === dataPegawai[i].nama_pegawai
            );

            if (!isNamaAda) {
                const response = await axios.post("http://localhost:5000/data_kehadiran", {
                    nik: dataPegawai[i].nik,
                    nama_pegawai: dataPegawai[i].nama_pegawai,
                    nama_jabatan: dataPegawai[i].jabatan,
                    jenis_kelamin: dataPegawai[i].jenis_kelamin,
                    hadir: hadir[i] || 0,
                    sakit: sakit[i] || 0,
                    alpha: alpha[i] || 0,
                });

                dispatch({
                    type: CREATE_ATTENDANCE_DATA_SUCCESS,
                    payload: response.data,
                });

                navigate("/data-kehadiran");
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

export const updateDataKehadiran = (id, dataKehadiran) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:5000/data_kehadiran/${id}`, dataKehadiran);
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_ATTENDANCE_DATA_SUCCESS,
                    payload: 'Data kehadiran berhasil diupdate'
                });
                dispatch(getDataKehadiran());
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

export const deleteDataKehadiran = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:5000/data_kehadiran/${id}`);
            if (response.status === 200) {
                dispatch({
                    type: DELETE_ATTENDANCE_DATA_SUCCESS,
                    payload: 'Delete data berhasil'
                });
                dispatch(getDataKehadiran());
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
