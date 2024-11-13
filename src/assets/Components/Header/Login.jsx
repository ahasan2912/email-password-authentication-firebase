import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import auth from '../Layout/firebase.init';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        setErrorMessage('');
        setSuccess(false);
        
        //LogIn form
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            console.log(result.user);

            if(!result.user.emailVerified){
                setErrorMessage('Please verify Your email address.')
            }
            else{
                setSuccess(true);
            }
        })
        .catch((error) => {
            console.log(error.message)
            setErrorMessage(error.message);
        })
    }

    const handleForgetPassword = () => {
        console.log('Get me email Address', emailRef.current.value);
        const email = emailRef.current.value;
        if(!email){
            console.log('Please Provide a valid a email address');
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password Reset email sent, please check your email');
            })
        }
    }

    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={ handleLogin} className="card-body">
                            <h1 className='text-3xl text-center font-bold'>LogIn Pages</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    placeholder="password"
                                    className="input input-bordered" required />
                                <button type='button' onClick={()=> setShowPassword(!showPassword)} className='btn btn-xs absolute top-12 right-4'>
                                    {
                                        showPassword ? <FaEye /> : <FaEyeSlash />
                                    }
                                </button>
                                <label className="label" onClick={handleForgetPassword}>
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>
                        }
                        {
                            success && <p className='text-green-600 text-center mb-5'>LogIn is Successful</p>
                        }
                        <p>New to this website please <Link to='/signUp'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;