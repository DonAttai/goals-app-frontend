export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: true,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };

    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "REGISTER_ERROR":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
