export function goalReducer(state, action) {
  switch (action.type) {
    case "ADD_GOAL":
      return {
        ...state,
        goals: [...state.goals, action.payload],
        isLoading: false,
      };
    case "GET_GOALS":
      return {
        ...state,
        goals: action.payload,
        isLoading: false,
      };
    case "DELETE_GOAL":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
        goals: state.goals.filter((goal) => goal._id !== action.payload),
        isLoading: false,
      };
    case "GOAL_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "SET_MODAL":
      return {
        ...state,
        isLoading: false,
        isModalOpen: !state.isModalOpen,
      };
    default:
      return state;
  }
}
