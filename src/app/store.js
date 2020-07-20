import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
