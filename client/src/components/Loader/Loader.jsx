import React from 'react'
import '../Loader/Loader.css';

function Loader() {
  return (
    <div class="wrapper-loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <span>Loading</span>
    </div>
  
  )
}

export default Loader