import {
    GET_DEDUCTION_DATA_SUCCESS,
    GET_DEDUCTION_DATA_FAILURE,
    CREATE_DEDUCTION_DATA_SUCCESS,
    CREATE_DEDUCTION_DATA_FAILURE,
    UPDATE_DEDUCTION_DATA_SUCCESS,
    UPDATE_DEDUCTION_DATA_FAILURE,
    DELETE_DEDUCTION_DATA_SUCCESS,
    DELETE_DEDUCTION_DATA_FAILURE
} from '../../action/deductionAction/deductionActionTypes';

const initialState = {
    deductionData: [],
    message: null,
    error: null
};

const deductionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEDUCTION_DATA_SUCCESS:
            return {
                ...state,
                deductionData: action.payload,
                message: null,
                error: null,
            };
        case GET_DEDUCTION_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case CREATE_DEDUCTION_DATA_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
            };
        case CREATE_DEDUCTION_DATA_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_DEDUCTION_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case UPDATE_DEDUCTION_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case DELETE_DEDUCTION_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_DEDUCTION_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default deductionReducer;
