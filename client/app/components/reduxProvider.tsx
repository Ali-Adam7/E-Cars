"use client";
import store from "../../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Provider } from "react-redux";
let persistor = persistStore(store);

export default function ReduxProvider({ children }: any) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
