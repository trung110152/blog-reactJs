import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import customAxios from "./api";

export const getBlogs = createAsyncThunk(
    'blogs/getBlogs',
    async (page)=>{
        const res = await customAxios.get('blogs?page=' + page);
        return res.data;
    }
    )

export const findByIdBlog = createAsyncThunk(
    'blogs/findByIdBlog',
    async (data)=>{
        const res = await customAxios.get('blogs/findById/'+data);
        return res.data;
    }
)



export const addBlog = createAsyncThunk(
    'blogs/addBlog',
    async (data)=>{
        const res = await customAxios.post('blogs',data);
        return data;
    }
    )

export const deleteBlog = createAsyncThunk(
    'blogs/removeBlog',
    async (data)=>{
        const res = await customAxios.delete('blogs/'+data);
        return data
    }
)

export const editBlog = createAsyncThunk(
    'blogs/editBlog',
    async (data)=>{
        const res = await customAxios.put('blogs/' + data.id,data);
        return data
    }
)