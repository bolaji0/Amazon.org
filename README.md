# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




is it safe saving login info in react redux toolkit?
how do we logout?




 /*<form className='w-[350px] mx-auto flex flex-col items-center p-5 gap-5'>
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
                            */