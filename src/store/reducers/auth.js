//initial state
const initialState = {
  isLoggedIn: false,
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //case for deleting a tracker and associated data
    case "Change_Logged_In": {
      const newState = {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
      return newState;
    }

    case "Change_Loading": {
      const newState = {
        ...state,
        isLoading: action.isLoading,
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
