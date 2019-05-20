const idListReducer = (state, action) => {
  switch (action.type) {
    case "added":
    case "modified":
      return { ...state, [action.id]: action.id };
    case "removed":
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      console.info("unknown action", action);
      return state;
  }
};

export default idListReducer;
