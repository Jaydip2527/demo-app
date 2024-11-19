import { ADD_ITEM, GET_ITEMS, DELETE_ITEM, UPDATE_ITEM } from '../types/types';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_ITEMS':
      return { ...state, loading: true, error: null };
    case ADD_ITEM:
      // Check if item already exists
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        // Replace the existing item with the new one
        return {
          ...state,
          items: state.items.map((item, index) =>
            index === existingItemIndex ? action.payload : item
          ),
          loading: false,
        };
      } else {
        // Add the new item if it does not exist
        return {
          ...state,
          items: [...state.items, action.payload],
          loading: false,
        };
      }
    case GET_ITEMS:
      return { ...state, items: action.payload, loading: false };

    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
        loading: false,
      };
    case 'ERROR_ITEMS':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default reducer;
