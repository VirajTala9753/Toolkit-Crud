import { createSlice } from "@reduxjs/toolkit";

export const submitForm = createSlice({
  name: "form",
  initialState: {
    Data: [],
  },
  reducers: {
    addForm: function (state, action) {
      state.Data.push(action.payload);
    },
    removeData: function (state, action) {
      state.Data = state.Data.filter((item) => item.id != action.payload.id);
    },
    updateData: function (state, action) {
       state.Data.map((item) => {
        if (item.id === action.payload.id) {
          item.List = action.payload.List;
        }
      });
    },
  },
});

export const { addForm, removeData, updateData } = submitForm.actions;

export default submitForm.reducer;
