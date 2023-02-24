import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteBlog, getBlogs} from "../../services/blogsService";

import {Link, useNavigate} from "react-router-dom";
import swal from 'sweetalert';

export default function MyBlogs() {


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const blogs = useSelector(state => {
        return state.blogs.blogs
    });

    const user = useSelector(state => {
        return state.user.currentUser
    })


    useEffect(() => {
        dispatch(getBlogs())
    }, []);


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Content</th>
                            <th scope="col">Status</th>
                            <th scope="col">Category</th>
                            <th scope="col">Date</th>
                            <th scope="col">Image</th>
                            <th scope="col">Username</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {blogs.map((item, ind) => {
                                if (item.username === user.username) {
                                    return (
                                        <tr>
                                            <th scope="col">{ind + 1}</th>
                                            <th scope="col">{item.content}</th>
                                            <th scope="col">{item.status}</th>
                                            <th scope={'col'}>{item.nameCategory}</th>
                                            <th scope="col">{item.date}</th>
                                            <th scope="col"><img src={item.image} alt="" style={{width: 50}}/></th>
                                            <th scope="col">{item.username}</th>
                                            <th>
                                                <Link to={`/home/edit-blog/${item.id}`}>
                                                    <button className="btn btn-outline-success"
                                                            style={{marginRight: 10}}>Edit
                                                    </button>
                                                </Link>
                                                <button className ="btn btn-outline-danger" onClick={() => {
                                                    swal({
                                                        title: "Are you sure?",
                                                        text: "Once deleted, you will not be able to recover this imaginary file!",
                                                        icon: "warning",
                                                        buttons: true,
                                                        dangerMode: true,
                                                    })
                                                        .then((willDelete) => {
                                                            if (willDelete) {
                                                                dispatch(deleteBlog(item.id)).then(() => {
                                                                    dispatch(getBlogs()).then(() => {
                                                                        navigate('/home')
                                                                    })

                                                                })
                                                                swal("Poof! Your imaginary file has been deleted!", {
                                                                    icon: "success",
                                                                });
                                                            } else {
                                                                swal("Your imaginary file is safe!");
                                                            }
                                                        });
                                                }}>Delete
                                                </button>
                                            </th>
                                        </tr>
                                    )
                                }
                            }
                        )}

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}