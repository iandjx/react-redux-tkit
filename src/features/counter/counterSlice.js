import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    todos: [],
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    loadTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  loadTodos,
  addTodo,
} = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => async (dispatch) => {
  try {
    const todos = await axios.get("http://localhost:3000/todos");
    dispatch(loadTodos(todos.data));
  } catch (err) {
    console.log(err);
  }
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const newTodo = (todo) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:3000/todos", todo);
    dispatch(addTodo(res.data));
  } catch (err) {
    console.log(err);
  }
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
