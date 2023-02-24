import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {login} from "../../services/userService";
import {Field, Form, Formik} from "formik";
import {addBlog, editBlog, findByIdBlog, getBlogs} from "../../services/blogsService";
import {useEffect, useState} from "react";
import {storage} from "../../services/firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";


export default function EditBlog() {
    const {id} = useParams();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(state => {
        return state.user.currentUser
    })

    useEffect(() => {
        dispatch(findByIdBlog(id)).then((value) => {
            setUrls([value.payload.image])
        });
    }, [])

    const blog = useSelector(state => {
        return state.blogs.blog
    })

    const handleEdit = async (values) => {
        let newBlog = {...values};
        await dispatch(editBlog(newBlog));
        await navigate('/home')
    }


    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };
    const handleUpload = () => {
        const promises = [];
        if (images.length > 0) {
            images.map((image) => {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                promises.push(uploadTask);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls([])
                            setUrls(prevState => [...prevState, downloadURLs])
                        });
                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => alert("All images uploaded"))
            .catch((err) => console.log(err));

    }


    return (
        <>
            <div className="row">
                <div className="offset-3 col-6 mt-5">
                    <h1 style={{textAlign: 'center'}}>Edit blog</h1>
                    <Formik
                        initialValues={{
                            id: id,
                            content: blog.content,
                            status: blog.status,
                            date: blog.date,
                            image: urls[0],
                        }}
                        onSubmit={(values) => {
                            handleEdit(values)
                        }}
                        enableReinitialize={true}
                    >


                        <Form>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Content</label>
                                <Field type="text" className="form-control" id="exampleInput" name={'content'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Status</label>
                                <Field type="text" className="form-control" id="exampleInput" name={'status'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Date</label>
                                <Field type="text" className="form-control" id="exampleInput" name={'date'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Image</label>
                                <br/>

                                <input type='file' onChange={handleChange}>
                                </input>
                                <button className="btn btn-outline-success" style={{marginRight: 10}} type='button'
                                        onClick={handleUpload}>Up
                                </button>
                                {urls &&
                                    <>
                                        <img src={urls[0]} alt="" style={{width: 50}}/></>
                                }
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}