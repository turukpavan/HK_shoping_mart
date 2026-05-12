import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";
import { userReducer } from "./reducers/UserReducer";
import { cartReducer } from "./reducers/CartReducer";
import { categoriesReducer } from "./reducers/CategoriesReducer";

const rootReducer = combineReducers({
  Users: userReducer,
  Cart: cartReducer,
  Categories: categoriesReducer,
});

// persist config
const persistConfig = {
  key: "root",
  storage,
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools());

// persist store
export const persistor = persistStore(store);
