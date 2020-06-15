import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import rootReducer from "./rootReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["usersReducer"], // TODO: determine where to get my appSlice's reducer name from
  blacklist: [],
};
// const enhancedReducer = persistReducer(persistConfig, rootReducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function reduxFunction() {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
}
