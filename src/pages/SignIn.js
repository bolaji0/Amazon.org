import React, { useState } from 'react';
import { darkLogo } from '../assets';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {ColorRing} from "react-loader-spinner"
import {motion} from "framer-motion"
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/amazonSlice';




const SignIn = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [firebaseErr, setFirebaseErr] = useState("");

    //Loading state
    const [Loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrorEmail("");
        setFirebaseErr("")
    };

    const handlePass = (e) => {
        setPass(e.target.value);
        setErrorPassword("");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        let valid = true;

        if (!email) {
            setErrorEmail("Please input a valid email");
            valid = false;
        }

        if (!pass) {
            setErrorPassword("Please enter a password");
            valid = false;
        }

        if (valid) {
            setLoading(true)
            signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch(setUserInfo({
                    _id:user.uid,
                    userName:user.displayName,
                    email:user.email,
                    image:user.photoURL
                }))

                setLoading(false)
                setSuccessMsg("Logged In Successfully")
                console.log("Logged In Successfully")
                setTimeout(() =>{
                    navigate("/")
                },2000)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/invalid-email") {
                    setErrorEmail("Invalid email address.");
                } else if (errorCode === "auth/user-disabled") {
                    setFirebaseErr("User account has been disabled.");
                } else if (errorCode === "auth/user-not-found") {
                    setFirebaseErr("No user found with this email.");
                } else if (errorCode === "auth/too-many-requests") {
                    setFirebaseErr("Access temporarily disabled due to too many failed login attempts. Try again later or reset your password.");
                } else {
                    setFirebaseErr("An error occurred. Please try again.");
                }
                console.log(error)
            });

            // Proceed with login logic
        }
    };

    return (
        <div className='w-full'>
            <div className='w-full bg-gray-100 pb-10'>
                {
                    successMsg ? 
                    <div className='w-full flex justify-center items-center py-32'>
                        <p className='border-[1px] border-green-500 font-titleFont text-lg
                        font-semibold px-6 py-2'>
                            {successMsg}
                        </p>
                    </div> :
                    <form className='w-[350px] mx-auto flex flex-col items-center p-5 gap-5'>
                    <img className='w-32' src={darkLogo} alt='dark Logo' />
                    <div className='w-full border border-zinc-200 p-6'>
                        <h2 className='font-titleFont text-3xl font-medium mb-4'>Sign In</h2>
                        <div className='flex flex-col'>
                            <div className='flex flex-col'>
                                <p className='text-sm font-medium'>Email or mobile phone number</p>
                                <input
                                    value={email}
                                    onChange={handleEmail}
                                    className='w-full lowercase py-1 border border-zinc-400 px-2 rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                                    type='email'
                                />
                                {errorEmail && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span> {errorEmail}
                                    </p>
                                )}
                                {
                                   firebaseErr && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span> {firebaseErr}
                                    </p>
                                )}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Password</p>
                                <input
                                    value={pass}
                                    onChange={handlePass}
                                    className='w-full lowercase py-1 border border-zinc-400 px-2 rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                                    type='password'
                                />
                                {errorPassword && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span> {errorPassword}
                                    </p>
                                )}
                            </div>
                            {
                            Loading && (
                                <div className='flex justify-center'>
                                    <ColorRing
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                    />
                                </div>
                            )
                        }{
                            successMsg && (
                                <motion.p
                                initial={{y:10, opacity:0}}
                                animate={{y:10, opacity:1}}
                                transition={{duration:0.5}}
                                className='text-base font-titleFont font-semibold text-green-500 border-[1px]
                                border-green-500 px-2 text-center mb-6'
                                >
                                    {successMsg}
                                </motion.p>
                            )
                        }
                            <button
                                onClick={handleLogin}
                                className='w-full mt-5 py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'
                            >
                                Continue
                            </button>
                        </div>
                        <p className='text-xs text-black leading-4 mt-4'>
                            By continuing, you agree to Amazon's 
                            <span className='text-blue-600'> Conditions of Use </span>
                            and
                            <span className='text-blue-600'> Privacy Notice</span>
                        </p>
                        <p className='text-blue-600 text-sm mt-4 cursor-pointer group'>
                            <ArrowRightIcon />
                            <span className='text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1'>Need help?</span>
                        </p>
                    </div>
                    <p className='w-full text-xs text-gray-600 mt-4 flex items-center text-center'>
                        <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
                        <span className='w-1/3'>New to Amazon</span>
                        <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
                    </p>
                    <Link className='w-full' to="/registration">
                        <button
                            className='w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'
                        >
                            Create New Amazon Account
                        </button>
                        
                    </Link>
                    
                </form>
                }
            </div>
            <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10'>
                <div className='flex item-center gap-6'>
                    <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                        Conditions of Use
                    </p>
                    <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                        Privacy Notice
                    </p>
                    <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                        Help
                    </p>
                </div>
                <p className='text-xs text-gray-600'>© 1996-2023, ReactBd.com, Inc or its affiliates</p>
            </div>
        </div>
    );
}

export default SignIn;
