const dataListReducer = (state, action) => {
  switch (action.type) {
    case "added":
    case "modified":
      return { ...state, [action.data.uid]: action.data };
    case "removed":
      const newState = { ...state };
      delete newState[action.data.uid];
      return newState;
    default:
      console.info("unknown action", action);
      return state;
  }
};

export default dataListReducer;
