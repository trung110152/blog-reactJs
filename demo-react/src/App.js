import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import {Route, Routes} from "react-router";
import Register from "./pages/Register";
import Home from "./pages/home/Home";
import ListBlog from "./pages/blog/ListBlog";
import AddBlog from "./pages/blog/AddBlog";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getBlogs} from "./services/blogsService";
import EditBlog from "./pages/blog/EditBlog";
import MyBlogs from "./pages/blog/MyBlogs";

function App() {
    // service -> slice -> store -> selector -> useEffect
    const user = useSelector(state=>{
        return state.user.currentUser
    })

    return (
        <>
            <div className="container-fluid">
                <Routes>
                    <Route path={''} element={<Login/>}/>
                    <Route path={'register'} element={<Register/>}/>
                    {
                     user !== 'Username is not existed' && user !== 'Password is wrong'?
                         <Route path={'home'} element={<Home/>}>
                             <Route path={''} element={<ListBlog/>}/>
                             <Route path={'add-blog'} element={<AddBlog/>}/>
                             <Route path={'edit-blog/:id'} element={<EditBlog/>}/>
                             <Route path={'my-blogs'} element={<MyBlogs/>}/>
                         </Route>:
                             <Route path={''} element={<Login/>}/>
                    }

                </Routes>
            </div>
        </>
    );
}

export default App;
