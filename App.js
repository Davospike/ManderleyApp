import React, { useState, useEffect } from "react";

import * as Font from "expo-font";
import { AppLoading } from "expo";

//nav
import Nav from "./src/nav/Nav";

//redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import meReducer from "./src/store/reducers/me";
import myJourneyReducer from "./src/store/reducers/myJourney";
import mySettingsReducer from "./src/store/reducers/mySettings";
import authReducer from "./src/store/reducers/auth";
import permissionReducer from "./src/store/reducers/globalPermisisons";

//combine reducers and create store
const root = combineReducers({
  me: meReducer,
  myJourney: myJourneyReducer,
  mySettings: mySettingsReducer,
  auth: authReducer,
  permissions: permissionReducer,
});

const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

const store = createStore(
  root,
  applyMiddleware(
    // logger,
    ReduxThunk
  )
);

export default function App() {
  const [loading, setLoading] = useState(true);

  const loadResourcesAsync = async () => {
    await Font.loadAsync({
      "custom-icons": require("./assets/fonts/icomoon.ttf"),
      "avenir-med": require("./assets/fonts/Avenir-Med.ttf"),
      "avenir-reg": require("./assets/fonts/Avenir-Reg.otf"),
      "avenir-demi-bold": require("./assets/fonts/Avenir-Demi-Bold.otf"),
    });
  };

  const handleLoadingError = (error) => {
    console.log(error);
  };

  const handleFinishLoading = () => {
    setLoading(false);
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }

  return (
    //provide redux store to application
    <Provider store={store}>
      <Nav />
    </Provider>
  );
}
