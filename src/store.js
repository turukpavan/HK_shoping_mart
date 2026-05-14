import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore, combineReducers } from "redux";
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";
import { categoriesReducer } from "./redux/reducers/CategoriesReducer";
import { userReducer } from "./redux/reducers/UserReducer";
import { cartReducer } from "./redux/reducers/CartReducer";

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
