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
      console.log(action.payload, "action");
      const findData =  state.Data.findIndex((item) => 
       item.id === action.payload.id 
        
        
      );
if(findData === -1)return

      state.Data[findData] = {...state.Data[findData], ...action.payload }
    },
  },
});

export const { addForm, removeData, updateData } = submitForm.actions;

export default submitForm.reducer;
