export const changeLoggedInState = (isLoggedIn) => {
  return {
    type: "Change_Logged_In",
    isLoggedIn,
  };
};

export const changeLoadingState = (isLoading) => {
  return {
    type: "Change_Loading",
    isLoading,
  };
};
