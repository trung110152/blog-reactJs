import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {login} from "../services/userService";
import {Field, Form, Formik} from "formik";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async (values) =>{
        await dispatch(login(values)).then((e)=>{
            if(e.payload !== 'Username is not existed' && e.payload !== 'Password is wrong'){
                navigate('/home')
            }else{
                navigate('/')
            }


        })
    }
    const user = useSelector(state=>{
        return state.user.currentUser
    })
    useEffect(() => {
        localStorage.clear()
    }, [])

    return(
        <>
            <div className="row">
                <div className="offset-3 col-6 mt-5">
                    <h1 style={{textAlign:'center' }}>Login</h1>
                    <Formik
                        initialValues={{username:'', password:''}}
                        onSubmit={(values)=>{
                            handleLogin(values).then()
                        }}>
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Username</label>
                                <Field type="text" className="form-control" id="exampleInput" name={'username'}/>
                                {
                                    user === 'Username is not existed' &&
                                    <>
                                    <h6 style={{color: "red"}}>Username is not existed</h6>
                                    </>
                                }
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <Field type="password" className="form-control" id="exampleInputPassword1" name={'password'}/>
                                {
                                    user === 'Password is wrong' &&
                                    <>
                                        <h6 style={{color: "red"}}>Password is wrong</h6>
                                    </>
                                }
                            </div>

                            <button type="submit" className="btn btn-primary" style={{marginRight: 10}}>Login</button>
                            <Link to={'/register'} ><button type="submit" className="btn btn-secondary">register</button></Link>
                        </Form>
                    </Formik>


                </div>
            </div>
        </>
    )
}