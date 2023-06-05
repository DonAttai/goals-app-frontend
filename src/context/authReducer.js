export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        error: null,
      };

    case "REGISTER_SUCCESS":
      return {
        user: null,
        error: null,
      };
    case "REGISTER_ERROR":
      return {
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
