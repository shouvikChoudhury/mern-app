import { createContext, useReducer } from "react";
import axios from "axios";
import { API_URL_ACC } from "../../../utils/apiURL";
import {
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_CREATION_SUCCESS,
  ACCOUNT_CREATION_FAIL, ACCOUNT_DELETE_FAIL, ACCOUNT_DELETE_SUCCESS
} from "./accountActionTypes";

export const accountContext = createContext();
//Initial State

const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  account: null,
  accounts: [],
  loading: false,
  error: null,
};

//reducer
const accountReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // Details
    case ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case ACCOUNT_DETAILS_FAIL:
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    // Create
    case ACCOUNT_CREATION_SUCCESS:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case ACCOUNT_CREATION_FAIL:
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    // DELETE
    case ACCOUNT_DELETE_SUCCESS:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case ACCOUNT_DELETE_FAIL:
    default:
      return state;
  }
};

//Provider
export const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);

  //Get account Details action
  const getAccountDetailsAction = async id => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userauth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(`${API_URL_ACC}/${id}`, config);

      if (res?.data?.status === "success") {
        //dispatch
        dispatch({
          type: ACCOUNT_DETAILS_SUCCESS,
          payload: res?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ACCOUNT_DETAILS_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };

  //Create account Details action
  const createAccountAction = async formData => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.post(`${API_URL_ACC}`, formData, config);
      if (res?.data?.status === "success") {
        //dispatch
        dispatch({
          type: ACCOUNT_CREATION_SUCCESS,
          payload: res?.data?.data,
        });
      }
      //Redirect
      window.location.href = "/dashboard";
    } catch (error) {

      dispatch({
        type: ACCOUNT_CREATION_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };

  //delete account Details action
  const deleteAccountDetailsAction = async id => {
    try {
      const res = await axios.delete(`${API_URL_ACC}/${id}`);

      if (res?.data?.status === "success") {
        console.log(res?.data?.data)
        //dispatch
        dispatch({
          type: ACCOUNT_DELETE_SUCCESS,
          payload: res?.data?.data,
        });
      }
      //Redirect
      window.location.href = "/dashboard";
    } catch (error) {
      dispatch({
        type: ACCOUNT_DELETE_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };
  return (
    <accountContext.Provider
      value={{
        getAccountDetailsAction,
        account: state?.account,
        createAccountAction,
        error: state?.error, deleteAccountDetailsAction
      }}
    >
      {children}
    </accountContext.Provider>
  );
};
