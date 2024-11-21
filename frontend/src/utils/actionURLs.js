const USER_REGISTRATION = `${process.env.REACT_APP_API_URL}/user/register`;
const USER_LOGIN = `${process.env.REACT_APP_API_URL}/user/login`;
const GET_DATA = `${process.env.REACT_APP_API_URL}/items/get`;
const GET_USER_DATA = `${process.env.REACT_APP_API_URL}/user/getUserData`;
const ADD_DATA = `${process.env.REACT_APP_API_URL}/items/add`;
const UPDATE_DATA = `${process.env.REACT_APP_API_URL}/items/update`;
const DELETE_DATA = `${process.env.REACT_APP_API_URL}/items/delete`;

module.exports = {
    USER_REGISTRATION, USER_LOGIN, GET_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA, GET_USER_DATA
}