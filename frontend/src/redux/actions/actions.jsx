import axios from 'axios';
import { ADD_ITEM, GET_ITEMS, DELETE_ITEM, UPDATE_ITEM } from '../types/types';
import { GET_USERS } from '../types/userTypes';
import { ADD_DATA, DELETE_DATA, GET_DATA, UPDATE_DATA, USER_LOGIN, USER_REGISTRATION, GET_USER_DATA } from '../../utils/actionURLs';
import { toast } from '../../utils/constant';
import { LIST, SIGNIN } from '../../routes';

export const getData = (token, navigate) => async (dispatch) => {
  if (token) {
    try {
      // Configure the headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      };
      const response = await axios.get(GET_DATA, config);
      if (response.data.success) {
        dispatch({ type: GET_ITEMS, payload: response.data.data });
      } else {
        toast(response.data.message, "error");
        dispatch({ type: GET_ITEMS, payload: [] });
      }
    } catch (error) {
      console.error('Error fetching data', error);
      toast(error.response.data, "error");
      if (error?.response?.data === "jwt expired") {
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        navigate(SIGNIN);
      }
    }
  } else {
    toast("Please pass the Token for Authorization", "error");
  }
};

export const getUserData = (token, email, navigate) => async (dispatch) => {
  if (token) {
    try {
      // Configure the headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      };
      const response = await axios.get(`${GET_USER_DATA}?email=${email}`, config);
      if (response.data.success) {
        dispatch({ type: GET_USERS, payload: response.data.data });
      } else {
        toast(response.data.message, "error");
        dispatch({ type: GET_USERS, payload: [] });
      }
    } catch (error) {
      console.error('Error fetching user data', error);
      toast(error.response.data, "error");
      if (error?.response?.data === "jwt expired") {
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        navigate(SIGNIN);
      }
    }
  } else {
    toast("Please pass the Token for Authorization", "error");
  }
};

export const addData = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(ADD_DATA, data);
    if (response.data.success) {
      dispatch({ type: ADD_ITEM, payload: response.data.data });
      toast(response.data.message, "success");
      navigate(LIST);
    } else {
      toast(response.data.message, "error");
    }
  } catch (error) {
    if (error.response.data.message) {
      toast(error.response.data.message, "error");
    } else {
      toast(error.message, "error");
    }
  }
};

export const updateData = (Id, formData, navigate) => async (dispatch) => {
  try {
    const response = await axios.put(`${UPDATE_DATA}/${Id}`, formData);
    if (response.data.success) {
      dispatch({ type: UPDATE_ITEM, payload: response.data.data });
      toast(response.data.message, "success");
      navigate(LIST);
    } else {
      toast(response.data.message, "error");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      toast(error.response.data.message, "error");
    } else {
      toast(error.message, "error");
    }
  }
};

export const deleteData = (Id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${DELETE_DATA}/${Id}`);
    if (response.data.success) {
      dispatch({ type: DELETE_ITEM, payload: Id });
      toast(response.data.message, "success");
    } else {
      toast(response.data.message, "error");
    }
  } catch (error) {
    if (error.response.data.message) {
      toast(error.response.data.message, "error");
    } else {
      toast(error.message, "error");
    }
  }
};


export const registerUser = (user, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(USER_REGISTRATION, user);
    if (response?.data?.success) {
      toast(response?.data?.message, "success");
      navigate(SIGNIN);
    } else {
      toast(response?.data?.message, "error");
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      toast(error?.response?.data?.message, "error");
    } else {
      toast(error?.message, "error");
    }
  }
};

export const loginUser = (credentials, navigate, rememberMe, reset) => async (dispatch) => {
  try {
    const response = await axios.post(USER_LOGIN, credentials);
    if (response.data.success) {
      const responseData = response?.data?.data;
      const user = JSON.stringify({ email: responseData?.email, username: responseData?.username });
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userDetails", user);
      localStorage.setItem("rememberMe", JSON.stringify({ rememberMe: rememberMe, data: credentials }));
      toast(response.data.message, "success");
      navigate(LIST);
      reset();
    } else {
      toast(response.data.message, "error");
    }
  } catch (error) {
    if (error.response.data.message) {
      toast(error.response.data.message, "error");
    } else {
      toast(error.message, "error");
    }
  }
};

