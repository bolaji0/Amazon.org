import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
// import {CheckCircleIcon} from "@mui/icons-material/CheckCircleIcon"
import { decrementQuantity, deleteItem, incrementQuantity, resetCart } from '../redux/amazonSlice';
import {emptyCart} from "../assets/index"
import {motion} from "framer-motion"
import { Link } from "react-router-dom";
import { sendEmail } from '../api/emails/route';


const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.amazon.products);
    const [totalPrice,setTotalPrice] = useState("")
    const [giftOrdder, setGiftOrder] = useState(false)

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const [receiversName, setReceiversName] = useState("");
    const [errReceiversName, setErrReceiversName] = useState("");


    const emailVerification = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    };


    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrorEmail("");
    };

    const handleToggle = () => {
        setGiftOrder(prevState => !prevState);
        console.log('Toggling', !giftOrdder); // Shows the expected new state
    };

    const handleReceivers = (e) => {
        setReceiversName(e.target.value);
        setErrReceiversName("");
    }

    
    // Validation
    // let valid = true;

    // if (!email) {
    //     setErrorEmail("Enter receivers email");
    //     valid = false;
    // } else if (!emailVerification(email)) {
    //     setErrorEmail("Enter a valid email");
    //     valid = false;
    // }       

    const handlePayment = (e) => {
        e.preventDefault();
        let valid = true;

        if(receiversName === ""){
            setErrReceiversName("Enter Receivers Name")
            valid = false
        }
        if (!email) {
            setErrorEmail("Enter your email");
            valid = false;
        } else if (!emailVerification(email)) {
            setErrorEmail("Enter a valid email");
            valid = false;
        } 
        if(valid)
        {
            
        }
    }


    useEffect(()=>{
        let Total = 0;
        products.map((item)=>{
            Total += item.price * item.quantity
            return setTotalPrice(Total.toFixed(2))
        })
    },[products])



    
    const handleClick = async () => {
        try {
          const result = await sendEmail(email);
          alert(result);
        } catch (error) {
          alert(error.message);
        }
    };





    return (
        <div className='w-full bg-gray-100 p-4'>
            { products.length > 0 ? (
                <div className='w-full mx-auto md:grid h-full md:grid-cols-5 gap-8'>
                    <div className='w-full bg-white px-4 col-span-4'>
                        <div className='font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3'>
                            <h2 className='text-3xl font-medium'>Shopping Cart</h2>
                            <h4 className='sm:hidden md:inline-flex text-xl font-normal'>Subtitle</h4>
                        </div>
                        {/* Product start here */}
                        <div className='sm:flex sm:flex-col'>
                            {products.map((item) => (
                                <div key={item.id} className='w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6'>
                                    <div className='w-2/5 md:w-1/5 md:h-1/5'>
                                        <img
                                            className='md:w-full md:h-44 w-full h-[15vh]'
                                            src={item.image}
                                            alt='ProductImg'
                                        />
                                    </div>
                                    <div className='w-2/5 md:w-3/5'>
                                        <h2 className=' md:text-lg font-semibold'>{item.title}</h2>
                                        <p className='hidden md:inline-flex pr-10 text-sm'>{item.description.substring(0, 250)}</p>
                                        <p className='text-base'>
                                            Unit Price
                                            <span className='font-semibold'>${item.price}</span>
                                        </p>
                                        <div className='bg-[#F0F2F2] flex items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md'>
                                            <p>Qty:</p>
                                            <p
                                                onClick={() => dispatch(decrementQuantity(item.id))}
                                                className='cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300'
                                            >-</p>
                                            <p>{item.quantity}</p>
                                            <p
                                                onClick={() => dispatch(incrementQuantity(item.id))}
                                                className='cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300'
                                            >+</p>
                                        </div>
                                        <button
                                            onClick={() => dispatch(deleteItem(item.id))}
                                            className='bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300'
                                        >Delete Item</button>
                                    </div>
                                    <div className='w-1/5 md:w-1/5 text-end'>
                                        <p className='text-lg font-titleFont font-semibold'>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='w-full py-2 sm:m- flex justify-center items-center md:m-0 md:py-0'>
                            <button
                                className='px-10 my-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide'
                                onClick={() => dispatch(resetCart())}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                    {/* w-full h-52  bg-white md:col-span-1 flex flex-col justify-center items-center p-4 */}
                    {/* second part */}
                    <div className='w-full h-[65vh] bg-gray-400 md:col-span-1 flex flex-col items-center p-4'>
                        <div className='w-full'>
                            <p className='flex gap-2 items-start text-sm'>
                                <span>
                                    {/* <CheckCircleIcon className="bg-white text-green-500 rounded-full" /> */}
                                </span>{" "}
                                Your order has been qualified for Free shipping. Choose the option of checkout. See details.....
                            </p>
                        </div>
                        <div>
                            <p className='font-semibold px-10 py-1 flex items-center justify-between'>
                                Total: <span className='text-lg font-bold'>${totalPrice}</span>
                            </p>
                        </div>
                        <h1 className='text-sm text-center text-bold'>To gift the order, toggle the button below</h1>
                        <label className='relative inline-flex items-center cursor-pointer'>
                            <input onClick={handleToggle} type='checkbox' id='check' className='sr-only peer' />
                            <span className='w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-rose-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-rose-300 transition-all duration-500'></span>
                            <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-500 transform peer-checked:translate-x-5'></span>
                        </label>
                        {
                            giftOrdder && (
                                <div>
                                    <form> 
                                        <div className='flex flex-col'>
                                            <div className='flex flex-col'>
                                            <p className='text-sm font-medium'>Sender Name</p>
                                            <input
                                                // onChange={}
                                                className='w-full lowercase py-1 border border-zinc-400 px-2 rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                                                type='email'
                                            />
                                            {errorEmail && (
                                            <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                                <span className='italic font-titleFont font-extrabold text-base'>!</span> {errorEmail}
                                            </p>
                                            )}
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-col'>
                                            <p className='text-sm font-medium'>Receivers Name</p>
                                            <input
                                                // value={receiversName}
                                                onChange={handleReceivers}
                                                className='w-full lowercase py-1 border border-zinc-400 px-2 rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'
                                                type='text'
                                            />
                                            {errReceiversName && (
                                            <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                                <span className='italic font-titleFont font-extrabold text-base'>!</span> {errReceiversName}
                                            </p>
                                            )}
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-col'>
                                            <p className='text-sm font-medium'>Receivers Email</p>
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
                                            </div>
                                        </div>
                                        {/* <div className='flex flex-col'>
                                            <div className='flex flex-col'>
                                            <p className='text-sm font-medium'>Receivers Address</p>
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
                                            </div>
                                        </div> */}
                                       
                                    </form>
                                </div>
                            )
                           
                        }
                        <button
                         onClick={handleClick}
                         className='sm:w-1/2 md:w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3'>
                            Proceed to Payment
                        </button>   
                    </div>
                </div>
            ) : (
               <motion.div
               initial={{y:70, opacity:0}}
               animate={{y:0, opacity:1}}
               transition={{delay:0.6, duration:0.8}}
               className='flex justify-center items-center gap-4 py-10'>
                 <div>
                    <img 
                    src={emptyCart} 
                    alt='Empty Cart' 
                    />
                 </div>
                 <div className='w-96 p-4 bg-white flex flex-col items-center rounded-md 
                                 shadow-lg'>
                    <h1 className='font-titleFont text-xl font-bold'>
                        Your Cart feels lonely.
                    </h1>
                    <p className='text-sm text-center'>your Shopping cart feels lonely my friend</p>
                    <Link to="/">
                    <button
                        className='mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 
                                px-8 py-2 font-titleFont font-semibold text-lg'
                        >
                            Continue Shopping
                        </button>
                    </Link>
                 </div>
               </motion.div>


            // <div className='flex justify-center items-center gap-4 py-10 duration-700 absolute top-[300px]'>
            //   <div>
            //      <img 
            //      src={emptyCart} 
            //      alt='Empty Cart' 
            //      />
            //   </div>
            //   <div className='w-96 p-4 bg-white flex flex-col items-center rounded-md 
            //                   shadow-lg'>
            //      <h1 className='font-titleFont text-xl font-bold'>
            //          Your Cart feels lonely.
            //      </h1>
            //      <p className='text-sm text-center'>your Shopping cart feels lonely my friend</p>
            //      <Link to="/">
            //      <button
            //          className='mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 
            //                  px-8 py-2 font-titleFont font-semibold text-lg'
            //          >
            //              Continue Shopping
            //          </button>
            //      </Link>
            //   </div>
            // </div>

            )}
        </div>
    );
}

export default Cart;
