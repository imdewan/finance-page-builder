import React, { useState, useEffect } from 'react';
import { FaUser,FaLock, FaTextHeight } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';



function ViewPage() {
    const queryParameters = new URLSearchParams(window.location.search);
    const html_id = queryParameters.get("id");
 
    useEffect(() => {
    
        axios.post('http://127.0.0.1:8000/apis/view_html/', {
            username: Cookies.get('username'),
            password: Cookies.get('password'),
            id:html_id,
          },{withCredentials: true,'X-CSRFToken':Cookies.get('csrftoken')})
          .then(function (response) {
            console.log(response.data);
            if(response.data=="No access"){
              alert("Permission denied");
            }
            if(response.data=="Not Logged In"){
                alert("Not Logged In");
              }

            document.getElementById("styl").innerHTML=response.data["content_css"];
            document.getElementById("main-divd").innerHTML=response.data["content_html"];
          })
        }, )
    

  return (

      <div className='App'>
        <style id='styl'></style>
       <div id="main-divd"></div>
      </div>

  )
}

export default ViewPage
