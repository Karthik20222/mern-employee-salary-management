import {
    GET_SINGLE_EMPLOYEE_SALARY_DATA_SUCCESS,
    GET_SINGLE_EMPLOYEE_SALARY_DATA_FAILURE,
} from "../../action/salaryEmployeeDataPrintAction/salaryEmployeeDataPrintActionTypes";

const initialState = {
    salaryEmployeeDataPrint: [], 
    error: null,
  };
  

const salaryEmployeeDataPrintReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SINGLE_EMPLOYEE_SALARY_DATA_SUCCESS:
            return {
                ...state,
                salaryEmployeeDataPrint: action.payload,
                error: null,
            };
        case GET_SINGLE_EMPLOYEE_SALARY_DATA_FAILURE:
            return {
                ...state,
                salaryEmployeeDataPrint: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default salaryEmployeeDataPrintReducer;
