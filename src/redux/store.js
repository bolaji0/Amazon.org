import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // default storage is localStorage for web
import amazonReducer from "../redux/amazonSlice"; // Correct path to your amazonReducer

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage, // Make sure to use 'storage' here, which is imported from redux-persist
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, amazonReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: { amazon: persistedReducer }, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export let persistor = persistStore(store);
  