import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import auth from '../Layout/firebase.init';

const SignUp = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const photo = event.target.photo.value;
        const terms = event.target.terms.checked;

        console.log(email, password, name, photo)

        //check the password length
        if (password.length < 6) {
            setErrorMessage('Password should be at least 6 characters or longer');
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one uppercase, one lowercase, one number, one special character');
            return;
        }
        //terms
        if(!terms){
            setErrorMessage("Please accept our terms and condtions");
            return
        }
        //clear the error and status
        setErrorMessage('');
        setSuccess(false);

        //crate signup from
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setSuccess(true);

                //send Email Verification
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    alert('Verification email sent');
                })

                //update profile name and photo url 
                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                updateProfile(auth.currentUser, profile)
                .then(() =>{
                    console.log('user profile updated');
                })
                .catch(()=>{
                    console.log('User profile updated error');
                })
            })
            .catch((error) => {
                console.log('Error', error);
                setErrorMessage(error.message);
                setSuccess(false);
            })
    }
    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100  max-w-lg shrink-0 shadow-2xl">
                        <form onSubmit={handleSignUp} className="card-body">
                            <h1 className='text-3xl text-center font-bold'>SignUp Pages</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    placeholder="password"
                                    className="input input-bordered" required />
                                <button type='button' onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute top-12 right-4'>
                                    {
                                        showPassword ? <FaEye /> : <FaEyeSlash />
                                    }
                                </button>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-2">
                                <input type="checkbox" name='terms' className="checkbox" />
                                    <span className="label-text">Accept Our Terms and Condition</span>
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
                            success && <p className='text-green-600 text-center mb-5'>Sign Up is Successful</p>
                        }
                        <p className='m-2'>Already have an Account? Please <Link to="/login">LogIn</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;