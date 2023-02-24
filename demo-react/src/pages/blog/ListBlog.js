import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addBlog, deleteBlog, getBlogs} from "../../services/blogsService";
import {login} from "../../services/userService";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import swal from 'sweetalert';

export default function ListBlog(){


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [page, setPage] = useSearchParams()

    const page1 = page.get('page') || 1;

    const blogs = useSelector(state => {
        return state.blogs.blogs
    });


    const load = useSelector(state=>{
        return state.blogs.loading
    })

    const user = useSelector(state=>{
        return state.user.currentUser
    })

    const totalPages = useSelector(state => {
        if (state.blogs.blogs !== undefined) {
            return state.blogs.blogs.totalPage;
        }
    })

    useEffect(()=>{
        dispatch(getBlogs(page1)).then(()=>{
        })
    },[]);



    return(<>
        { (load === true) ?
            <>
                <div className="loader offset-5 col-2" style={{textAlign: 'center'}}></div>
            </>:
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
                            {user.role === 'admin' &&
                            <th colSpan={2}>Action</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {blogs.map((item,ind)=>(
                            <tr>
                                <th scope="col">{ind + 1}</th>
                                <th scope="col">{item.content}</th>
                                <th scope="col">{item.status}</th>
                                <th scope={'col'}>{item.nameCategory}</th>
                                <th scope="col">{item.date}</th>
                                <th scope="col"><img src={item.image} alt="" style={{width:50}}/></th>
                                <th scope="col">{item.username}</th>
                                {user.role === 'admin' &&
                                <th>
                                    <Link to={`edit-blog/${item.id}`}><button className="btn btn-outline-success" style={{marginRight: 10}}>Edit</button></Link>
                                    <button className="btn btn-outline-danger" onClick={() => {
                                        swal({
                                            title: "Are you sure?",
                                            text: "Once deleted, you will not be able to recover this imaginary file!",
                                            icon: "warning",
                                            buttons: true,
                                            dangerMode: true,
                                        })
                                            .then((willDelete) => {
                                                if (willDelete) {
                                                    dispatch(deleteBlog(item.id)).then(()=>{
                                                        dispatch(getBlogs()).then(()=>{
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
                                    }}>Delete</button>
                                </th> }
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        {(page1 == 1) ?
                            <>
                                <div className="page-link"><span aria-hidden="true" style={{color:'black'}}>&laquo;</span></div>
                            </>
                            :
                            <>
                                <div  className="page-link" onClick={() => {
                                    dispatch(getBlogs(page1 - 1));
                                    navigate('/home?page='+(page1-1))
                                }
                                }> <span aria-hidden="true">&laquo;</span>
                                </div>
                            </>
                        }
                    </li>
                    <li className="page-item"><a className="page-link">{page1}{totalPages}</a></li>
                    <li className="page-item">
                        {(page1 == totalPages) ?
                            <>
                                <div className="page-link"><span aria-hidden="true" style={{color:'black'}}>&raquo;</span></div>
                            </>
                            :
                            <>
                                <div  className="page-link" onClick={() => {
                                    dispatch(getBlogs(Number(page1) + 3));
                                    navigate('/home?page='+(Number(page1)+1))
                                }
                                }> <span aria-hidden="true">&raquo;</span>
                                </div>
                            </>
                        }
                    </li>
                </ul>
            </nav>


    </>}
</> )
}