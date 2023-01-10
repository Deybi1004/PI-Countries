import React from 'react';
import {Link} from 'react-router-dom';
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className='home'>
        <div className='container_title'>
            <h1 className='text_countries'>Countries</h1>
        </div>
        <div className='container-button'>
            <Link to='/countries'>
                <button className='custom-btn btn-16'>Start</button>
            </Link>
        </div>
    </div>
  )
}

export default LandingPage