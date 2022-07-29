export function goalReducer(state, action) {
  switch (action.type) {
    case "ADD_GOAL":
      return {
        ...state,
        goals: [...state.goals, action.payload],
        loading: false,
      };
    case "GET_GOALS":
      return {
        ...state,
        goals: action.payload,
        loading: false,
      };
    case "DELETE_GOAL":
      return {
        ...state,
        goals: state.goals.filter((goal) => goal._id !== action.payload),
        loading: false,
      };
    case "GOAL_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
