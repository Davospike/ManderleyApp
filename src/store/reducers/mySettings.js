//initial state
const initialState = {
  consentOptions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "Update_Consent_Options": {
      return {
        ...state,
        consentOptions: action.consentOptions,
      };
    }
    case "Reset": {
      return initialState;
    }
    default:
      return state;
  }
};
