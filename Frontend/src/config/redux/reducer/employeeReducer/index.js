import {
    GET_EMPLOYEE_DATA_SUCCESS,
    GET_EMPLOYEE_DATA_FAILURE,
    EMPLOYEE_IMAGE_SUCCESS,
    EMPLOYEE_IMAGE_FAILURE,
    GET_EMPLOYEE_DATA_BY_ID_SUCCESS,
    GET_EMPLOYEE_DATA_BY_ID_FAILURE,
    GET_EMPLOYEE_DATA_BY_NIK_SUCCESS,
    GET_EMPLOYEE_DATA_BY_NIK_FAILURE,
    GET_EMPLOYEE_DATA_BY_NAME_SUCCESS,
    GET_EMPLOYEE_DATA_BY_NAME_FAILURE,
    CREATE_EMPLOYEE_DATA_REQUEST,
    CREATE_EMPLOYEE_DATA_SUCCESS,
    CREATE_EMPLOYEE_DATA_FAILURE,
    UPDATE_EMPLOYEE_DATA_SUCCESS,
    UPDATE_EMPLOYEE_DATA_FAILURE,
    DELETE_EMPLOYEE_DATA_SUCCESS,
    DELETE_EMPLOYEE_DATA_FAILURE
} from '../../action/employeeAction/employeeActionTypes';

const initialState = {
    dataPegawai: [],
    pegawaiImage: [],
    message: null,
    error: null
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEE_DATA_SUCCESS:
            return {
                ...state,
                dataPegawai: action.payload,
                message: null,
                error: null,
            };
        case GET_EMPLOYEE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case EMPLOYEE_IMAGE_SUCCESS:
            return {
                ...state,
                pegawaiImage: action.payload,
                message: null,
                error: null,
            };
        case EMPLOYEE_IMAGE_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case GET_EMPLOYEE_DATA_BY_ID_SUCCESS:
            return {
                ...state,
                dataPegawai: action.payload,
                message: null,
                error: null,
            };
        case GET_EMPLOYEE_DATA_BY_ID_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case GET_EMPLOYEE_DATA_BY_NIK_SUCCESS:
            return {
                ...state,
                dataPegawai: action.payload,
                message: null,
                error: null,
            };
        case GET_EMPLOYEE_DATA_BY_NIK_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case GET_EMPLOYEE_DATA_BY_NAME_SUCCESS:
            return {
                ...state,
                dataPegawai: action.payload,
                message: null,
                error: null,
            };
        case GET_EMPLOYEE_DATA_BY_NAME_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case CREATE_EMPLOYEE_DATA_REQUEST:
            return {
                ...state,
                error: null,
                message: null,
            };
        case CREATE_EMPLOYEE_DATA_SUCCESS:
            return {
                ...state,
                error: null,
                message: null,
            };
        case CREATE_EMPLOYEE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_EMPLOYEE_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                error: null,
            };
        case UPDATE_EMPLOYEE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case DELETE_EMPLOYEE_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                error: null,
            };
        case DELETE_EMPLOYEE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        default:
            return state;
    }
};

export default employeeReducer;
