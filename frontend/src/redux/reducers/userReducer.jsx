import { GET_USERS } from '../types/userTypes';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_USERS':
      return { ...state, loading: true, error: null };

    case GET_USERS:
      return { ...state, users: action.payload, loading: false };

    // case UPDATE_USER:
    //   return {
    //     ...state,
    //     users: state.users.map((item) =>
    //       item._id === action.payload._id ? action.payload : item
    //     ),
    //     loading: false,
    //   };
    case 'ERROR_USERS':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default userReducer;
