import {createSlice} from "@reduxjs/toolkit";

import { getCategory} from "../../services/categoruService";



const initialState = {
   category:[]
}
const categorySlice = createSlice({
        name:'category',
        initialState,
        extraReducers: builder => {
            builder.addCase(getCategory.fulfilled, (state, action) => {
                state.category = action.payload

            });
        }

    }

)

export default categorySlice.reducer;