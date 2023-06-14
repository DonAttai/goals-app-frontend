export function goalReducer(state, action) {
  switch (action.type) {
    case "ADD_GOAL":
      return {
        ...state,
        goals: [...state.goals, action.payload],
      };
    case "GET_GOALS":
      return {
        ...state,
        isLoading: false,
        goals: action.payload,
      };
    case "DELETE_GOAL":
      return {
        ...state,

        isModalOpen: !state.isModalOpen,
        goals: state.goals.filter((goal) => goal._id !== action.payload),
      };

    case "SET_MODAL":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
}
