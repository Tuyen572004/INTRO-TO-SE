import { userReducer } from "./userSlice";
import { postReducer } from "./postSlice";
import { myPostReducer } from "./myPostSlice";
import { commentReducer } from "./commentSlice";
import { commentCounterReducer } from "./commentCounterSlice";
import { reactCounterReducer } from "./reactCounterSlice";
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
	commentCounterSlice: commentCounterReducer,
	reactCounterSlice: reactCounterReducer,
});

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["authSlice"],
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