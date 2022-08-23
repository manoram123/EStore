import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validate } from '../../utils/validate';
import './style.css';
import { toast } from 'react-toastify';

const Register = () => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        const invalid = validate({ email, username, password });
        if (invalid) {
            document.getElementById(`err${invalid.field}`).innerHTML = invalid.message;
        } else {
            if (!invalid) {
                const res = await axios.post("/register", { email, username, password })
                console.log(res.data)
                if (res.data.success) {
                    toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                } else {
                    toast.error(res.data.message, { position: toast.POSITION.TOP_RIGHT })
                }
            }
        }
    }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <div className="form rounded col-md-4 p-5 mx-auto">
                <div className='logo'>
                    <img className='d-block mx-auto' style={{ height: "5ch", width: "5ch" }} src="/assets/logo.png" alt="" />
                </div>
                <h6 className='mt-4 fw-bold text-center'>Create an account to login in EStore.</h6>
                <form action="">
                    <div className='form-group my-3'>
                        <input onChange={(e) => setEmail(e.target.value, document.getElementById(`erremail`).innerHTML = "")} className='form-control py-3 px-3' type="text" placeholder='Email' />
                        <small id={`erremail`} className='text-danger mx-2'></small>
                    </div>
                    <div className='form-group my-3'>
                        <input onChange={(e) => setUsername(e.target.value, document.getElementById(`errusername`).innerHTML = "")} className='form-control py-3 px-3' type="text" placeholder='Username' />
                        <small id={`errusername`} className='text-danger mx-2'></small>
                    </div>
                    <div className='form-group my-3'>
                        <input onChange={(e) => setPassword(e.target.value, document.getElementById(`errpassword`).innerHTML = "")} className='form-control py-3 px-3' type="password" placeholder='Password' />
                        <small id={`errpassword`} className='text-danger mx-2'></small>

                    </div>
                    <div className='my-4'>
                        <button type='button' onClick={handleSubmit} className='btn btn-primary py-3 w-100'>CREATE ACCOUNT</button>
                    </div>
                </form>
                <p className='text-sm'>Already have an account? <Link to={'/login'}>Login</Link></p>
            </div>
        </div>
    )
}

export default Register