import React, { useState } from 'react';
import { darkLogo } from '../assets';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {ColorRing} from "react-loader-spinner"
import {motion} from "framer-motion"



const Registration = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    // Error messages state
    const [errorClientName, setErrorClientName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorCPassword, setErrorCPassword] = useState("");
    const [firebaseErr, setFirebaseErr] = useState("");

    //Loading state
    const [Loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const emailVerification = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    };

    const handleName = (e) => {
        setClientName(e.target.value);
        if (e.target.value) {
            setErrorClientName("");
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (e.target.value) {
            setErrorEmail("");
            setFirebaseErr("");
        }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value) {
            setErrorPassword("");
        }
    };

    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        if (e.target.value) {
            setErrorCPassword("");
        }
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        let valid = true;

        if (!clientName) {
            setErrorClientName("Enter your name");
            valid = false;
        }
        if (!email) {
            setErrorEmail("Enter your email");
            valid = false;
        } else if (!emailVerification(email)) {
            setErrorEmail("Enter a valid email");
            valid = false;
        }                                           
        if (!password) {
            setErrorPassword("Enter your password");
            valid = false;
        } else if (password.length < 6) {
            setErrorPassword("Password must be at least 6 characters");
            valid = false;
        }
        if (!cPassword) {
            setErrorCPassword("Confirm your password");
            valid = false;
        } else if (password !== cPassword) {
            setErrorCPassword("Passwords do not match");
            valid = false;
        }

        if (valid) {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: clientName,
                        photoURL: ""
                    }).then(() => {
                        console.log("Profile updated");
                    }).catch((error) => {
                        console.log("Profile update error:", error);
                    });

                    const user = userCredential.user;
                    setClientName("");
                    setEmail("");
                    setPassword("");
                    setCPassword("");
                    setLoading(false)
                    setSuccessMsg("Account created Successfully");
                    setTimeout(()=> {
                        navigate("/signin")
                    },3000)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes("auth/email-already-in-use")) {
                        setFirebaseErr("Email already in use, try another one.");
                    } else if (errorCode.includes("auth/invalid-email")) {
                        setFirebaseErr("Invalid email address.");
                    } else if (errorCode.includes("auth/weak-password")) {
                        setFirebaseErr("Password is too weak.");
                    } else {
                        setFirebaseErr("An error occurred. Please try again.");
                    }
                });
        }
    };

    return (
        <div className='w-full'>
            <div className='w-full bg-gray-100 flex flex-col items-center'>
                <form className='w-[320px] md:w-[370px] mx-auto flex flex-col items-center'>
                    <img className='w-32 my-4' src={darkLogo} alt='darklogo' />
                    <div className='w-full border mb-20 border-zinc-200 p-6'>
                        <h2 className='font-titleFont text-3xl font-medium mb-4'>Create Account</h2>
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Your Name</p>
                                <input 
                                    className='w-full lowercase py-1 border border-zinc-400 px-2 rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                                    type='text'
                                    value={clientName}
                                    onChange={handleName}
                                />
                                {
                                    errorClientName && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span> {errorClientName}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Your Email</p>
                                <input 
                                    className='w-full lowercase py-1 border border-zinc-400 px-2 rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                                    type='text'
                                    value={email}
                                    onChange={handleEmail}
                                />
                                {
                                  errorEmail && (
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
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Password</p>
                                <input 
                                    className='w-full lowercase py-1 border border-zinc-400 px-2 rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                                    type='password'
                                    value={password}
                                    onChange={handlePassword}
                                />
                                {errorPassword && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span> {errorPassword}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Re-Enter Password</p>
                                <input 
                                    className='w-full lowercase py-1 border border-zinc-400 px-2 rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                                    type='password'
                                    value={cPassword}
                                    onChange={handleCPassword}
                                />
                                {errorCPassword && (
                                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                        <span className='italic font-titleFont font-extrabold text-base'>!</span> {errorCPassword}
                                    </p>
                                )}
                                <p className='text-xs text-gray-500'>Password must be greater than 6 characters</p>
                            </div>
                        </div>
                        <button
                            onClick={handleRegistration}
                            className='w-full mt-5 py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t mb-2 from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'
                        >
                            Continue
                        </button>
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
                        <p className='text-xs mb-2'>
                            By creating an account, you agree to Amazon's {" "}
                            <span className='text-blue-600'>Conditions of Use</span> and
                            <span className='text-blue-600'> Privacy Notice</span>
                        </p>
                        <div className='text-xs'>
                            <p>Already have an account? 
                                <Link to="/signin">
                                    <span className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                                        Sign in {" "}
                                        <ArrowRightIcon/>
                                    </span>
                                </Link>
                            </p>
                            <p className='text-xs text-black -mt-2'>Buying for work?
                                <span className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                                    Create a free business account
                                </span>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;
