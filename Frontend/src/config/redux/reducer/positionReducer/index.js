import {
    GET_POSITION_DATA_SUCCESS,
    GET_POSITION_DATA_FAILURE,
    CREATE_POSITION_DATA_SUCCESS,
    CREATE_POSITION_DATA_FAILURE,
    UPDATE_POSITION_DATA_SUCCESS,
    UPDATE_POSITION_DATA_FAILURE,
    DELETE_POSITION_DATA_SUCCESS,
    DELETE_POSITION_DATA_FAILURE
} from '../../action/positionAction/positionActionTypes';

const initialState = {
    positionData: [],
    message: null,
    error: null
};

const positionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSITION_DATA_SUCCESS:
            return {
                ...state,
                positionData: action.payload,
                message: null,
                error: null,
            };
        case GET_POSITION_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case CREATE_POSITION_DATA_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
            };
        case CREATE_POSITION_DATA_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_POSITION_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case UPDATE_POSITION_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case DELETE_POSITION_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_POSITION_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default positionReducer;
    