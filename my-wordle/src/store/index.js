import { configureStore } from "@reduxjs/toolkit";

import { boardSliceReducer } from "./boardStore";

const store = configureStore({
  reducer: { board: boardSliceReducer},
});

export default store;