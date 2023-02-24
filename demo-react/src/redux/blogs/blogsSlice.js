import {createSlice} from "@reduxjs/toolkit";
import {addBlog, deleteBlog, editBlog, findByIdBlog, getBlogs} from "../../services/blogsService";


const initialState = {
    blogs: [],
    loading: true,
    blog:{},
    totalPage: 1
}
const blogsSlice = createSlice({
        name: 'blogs',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getBlogs.fulfilled, (state, action) => {
                state.blogs = action.payload
                state.loading = false
                // console.log(state.blogs)
            });

            builder.addCase(findByIdBlog.fulfilled, (state, action) => {
                state.blog = action.payload
            });

            builder.addCase(addBlog.fulfilled, (state, action) => {
                state.blogs.push(action.payload)

            });

            builder.addCase(deleteBlog.fulfilled, (state, action) => {
                state.blogs.splice(action.payload)

            });
            builder.addCase(editBlog.fulfilled, (state, action) => {
                for (let i = 0; i < state.blogs.length; i++) {
                    if(action.payload.id == state.blogs[i].id){
                        state.blogs[i] = action.payload;
                    }
                }
            })
        }
    }
)

export default blogsSlice.reducer;