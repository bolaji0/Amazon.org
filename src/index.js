import React from 'react';
import ReactDOM from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import firebaseConfig from './firebase.config';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
{/* comment the "<React.StrictMode>" when redux nuget has been installed */}
<React.StrictMode>
   <PersistGate loading={"loading"} persistor={persistor}>
   <App />
   </PersistGate>
  </React.StrictMode>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

