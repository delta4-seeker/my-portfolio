import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './body.js';
import HeroSection from './heroSection.js'
 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>

    <HeroSection width={window.innerWidth} height={window.innerHeight} />
  
    </>

    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
