import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import customAxios from "./api";

export const login = createAsyncThunk(
    'user/login',
    async (data)=>{
        const res = await customAxios.post('users/login',data);
        return res.data;
    }
    )

export const register = createAsyncThunk(
    'user/register',
    async (data)=>{
        const res = await customAxios.post('users/signup',data);
        return res.data;
    }
)