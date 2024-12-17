import { userReducer } from "./userSlice";
import { postReducer } from "./postSlice";
import { myPostReducer } from "./myPostSlice";
import { commentReducer } from "./commentSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
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

const rootReducer = combineReducers({
	userSlice: userReducer,
	postSlice: postReducer,
	myPostSlice: myPostReducer,
	commentSlice: commentReducer,
});

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["userSlice"],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const persistor = persistStore(store);

export { store, persistor };