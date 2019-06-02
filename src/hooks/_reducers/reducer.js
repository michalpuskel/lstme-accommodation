const reducer = (state, action) => {
  switch (action.type) {
    case "added":
    case "modified":
      return { ...state, [action.id]: action.data };
    case "removed":
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case "reset":
      return {};
    default:
      console.info("unknown action", action);
      return state;
  }
};

export default reducer;
