//initial state
const initialState = {
  isPermissionsLoaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "Change_Loaded": {
      const newState = {
        ...state,
        isPermissionsLoaded: action.isLoading,
      };
      return newState;
    }

    case "Reset": {
      return initialState;
    }

    default:
      return state;
  }
};
