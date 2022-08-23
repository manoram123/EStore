import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from '../../utils/validate';
import './style.css';
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const invalid = validate({ email, password });
        if (invalid) {
            document.getElementById(`err${invalid.field}`).innerHTML = invalid.message;
        } else {
            if (!invalid) {
                const res = await axios.post("/login", { email, password })
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token)
                    navigate('/')
                } else {
                    toast.error(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                }
            }
        }
    }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <div className="login-form rounded col-md-4 p-5 mx-auto">
                <div className='logo'>
                    <img className='d-block mx-auto' style={{ height: "5ch", width: "5ch" }} src="/assets/logo.png" alt="" />
                </div>
                <h6 className='mt-4 text-center fw-bold'>Login with your EStore account</h6>
                <form action="">
                    <div className='form-group my-3'>
                        <input onChange={(e) => setEmail(e.target.value, document.getElementById(`erremail`).innerHTML = "")} className='form-control py-3 px-3' type="email" placeholder='Email' />
                        <small id={`erremail`} className='text-danger mx-2'></small>
                    </div>
                    <div className='form-group my-3'>
                        <input onChange={(e) => setPassword(e.target.value, document.getElementById(`errpassword`).innerHTML = "")} className='form-control py-3 px-3' type="password" placeholder='Password' />
                        <small id={`errpassword`} className='text-danger mx-2'></small>
                    </div>
                    <div className='d-flex'>
                        <div className='form-check'>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label text-sm" htmlFor="flexCheckDefault">
                                Remember Me
                            </label>
                        </div>
                        <div className='ms-auto text-sm'>
                            <Link to={""}>Forgot Password?</Link>
                        </div>
                    </div>
                    <div className='my-4'>
                        <button type='button' onClick={handleSubmit} className='btn btn-primary py-3 w-100'>LOGIN</button>
                    </div>
                </form>
                <p className='text-sm'>Don't have an account? <Link to={'/register'}>Create Account</Link></p>
            </div>
        </div>
    )
}

export default Login