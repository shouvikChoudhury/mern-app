import React, { createContext, useReducer } from "react";
import axios from "axios";
import {
  TRANSACTION_CREATION_SUCCESS,
  TRANSACTION_CREATION_FAIL, TRANSACTION_UPDATE_SUCCESS,
  TRANSACTION_UPDATE_FAIL, TRANSACTION_FETCH_SUCCESS, TRANSACTION_FETCH_FAIL
} from "./transactionsActionTypes";
import { API_URL_TRANSACTION } from "../../../utils/apiURL";

export const transactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth")),
};

const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case TRANSACTION_CREATION_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case TRANSACTION_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);

  //Get Transaction Details action
  const getTransactionAction = async id => {
    try {
      //request
      const res = await axios.get(`${API_URL_TRANSACTION}/${id}`);

      if (res?.data?.status === "success") {
        console.log(res?.data)
        //dispatch
        dispatch({
          type: TRANSACTION_FETCH_SUCCESS,
          payload: res?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TRANSACTION_FETCH_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };

  //create account
  const createTransactionAction = async accountData => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.post(`${API_URL_TRANSACTION}`, accountData, config);

      if (res?.data?.status === "success") {
        //dispatch
        dispatch({
          type: TRANSACTION_CREATION_SUCCESS,
          payload: res?.data
        });
      }
      //Redirect
      window.location.href = `/account-details/${accountData.account}`;
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //update account
  const updateTransactionAction = async ({ transactionID, formData }) => {
    try {
      //request
      const res = await axios.put(`${API_URL_TRANSACTION}/${transactionID}`, formData);

      if (res?.data?.status === "success") {
        //dispatch
        dispatch({
          type: TRANSACTION_UPDATE_SUCCESS,
          payload: res?.data
        });
      }
      //Redirect
      window.location.href = `/dashboard`;
    } catch (error) {
      dispatch({
        type: TRANSACTION_UPDATE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <transactionContext.Provider
      value={{
        transactions: state?.transactions,
        createTransactionAction,
        error: state?.error,
        getTransactionAction, transaction: state?.transaction,
        updateTransactionAction
      }}
    >
      {children}
    </transactionContext.Provider>
  );
};
