import {configureStore} from "@reduxjs/toolkit";
import blogsReducer from "./blogs/blogsSlice";
import userReducer from "./user/userSlice";
import categoriesReducer from "./category/categorySlice";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        user:userReducer,
        categories:categoriesReducer
    }
})