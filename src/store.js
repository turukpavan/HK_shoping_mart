import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";
import { userReducer } from "./reducers/UserReducer";
import { cartReducer } from "./reducers/CartReducer";


const rootReducer = combineReducers({
   Users : userReducer,
   Cart : cartReducer
});

// persist config
const persistConfig = {
  key: "root",
  storage,
};

// persisted reducer
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);


const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// persist store
export const persistor = persistStore(store);