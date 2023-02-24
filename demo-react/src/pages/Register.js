import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {register} from "../services/userService";
import {useState} from "react";
import swal from 'sweetalert';
import * as Yup from "yup";


export default function Register() {

    const validateSchema = Yup.object().shape({
        username: Yup.string()
            .min(6, "Too Short! Username must be longer than 6 characters")
            .max(50, "Too Long!")
            .required("Required"),
        password: Yup.string()
            .min(6, "Too Short! Password must be longer than 6 characters")
            .max(50, "Too Long!")
            .required("Required"),
    })


    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [check,setCheck] = useState([])

    const handleRegister = (values)=>{
        dispatch(register(values)).then((e)=>{
            if(e.payload !== 'Username registered'){
                swal("Register Success!", {
                    icon: "success",
                });;
                navigate('/')
            }else {
                setCheck(1)
            }

        })
    }
    return(
        <>
            <div className="row">
                <div className="offset-3 col-6 mt-5">
                    <h1 style={{textAlign:'center' }}>Register</h1>
                    <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}

                    validationSchema={validateSchema}

                    onSubmit={handleRegister}>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="exampleInput" className="form-label">Username</label>
                            <Field type="text" className="form-control" id="exampleInput" name={'username'}/>
                           <h6 style={{color: "red"}}><ErrorMessage name={'username'} ></ErrorMessage></h6>
                            { check === 1 &&
                            <>
                            <h6 style={{color: "red"}}>Username registered!!!!</h6></>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <Field type="password" className="form-control" id="exampleInputPassword1" name={'password'}/>
                            <h6 style={{color:"red"}}><ErrorMessage name={'password'}></ErrorMessage></h6>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{marginRight: 10}}>Register</button>
                        <Link to={'/'} ><button type="submit" className="btn btn-secondary">Login</button></Link>
                    </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}