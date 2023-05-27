import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    categories: [],
    comments: []
  },
  reducers: {
    setComment(state, action) {
      state.comments = action.payload;
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter(c => c._id !== action.payload);
    }
  }
});

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export {
  commentReducer,
  commentActions
}