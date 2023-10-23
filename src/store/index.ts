import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "../slices/Cart";
import productApi, { productReducer } from "../api/product";
import authApi, { authReducer } from "../api/auth";
import categoryApi, { categoryReducer } from "../api/category";
import sizeApi, { sizeReducer } from "../api/sizes";
import orderApi, { orderReducer } from "../api/order";

const persistconfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

// const authPersistConfig = {
//   key: "auth",
//   storage: storage,
//   blacklist: ["somethingTemporary"],
// };

// const authPersistReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  categories: categoryReducer,
  sizes: sizeReducer,
  auth: authReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistconfig, rootReducer);

const middleware = [
  productApi.middleware,
  categoryApi.middleware,
  sizeApi.middleware,
  authApi.middleware,
  orderApi.middleware,
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default persistStore(store);
