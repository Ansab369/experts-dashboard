import React from 'react';
import './Experts.css';
import { Navbar,Header,Social,Session,Videos,Connect,Footer } from './containers';

const Experts = () => {
  return (
    <div className='Experts' >
          <div className='curve_background'>
                <Navbar/>
                <Header/>
          </div>
            <Social/>
            <Session/>
            <Videos/>
            <Connect/>
            <Footer/>
    </div>
  )
}


export default Experts



//!  [1]  create header  