import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: []
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    addCategories(state, action) {
      state.categories.push(action.payload);
    },
    deleteCategories(state, action) {
      state.categories = state.categories.filter(c => c._id !== action.payload);
    }
  }
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export {
  categoryReducer,
  categoryActions
}