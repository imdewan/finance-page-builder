import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './projects.css';


function Projects() {
  useEffect(() => {
    
  
  if(Cookies.get('username') === undefined){
    window.location.replace("/login");
  }else{
    console.log(Cookies.get('username'));
  axios.post('http://127.0.0.1:8000/apis/get_htmls/', {
            username: Cookies.get('username'),
            password: Cookies.get('password')
          },{withCredentials: true,'X-CSRFToken':Cookies.get('csrftoken')})
          .then(function (response) {
            console.log(response.data);
            if(response.data=="Not Logged In"){
              window.location.replace("/login");
            }
            var json=response.data;
            for(var i=0;i<json.length;i++){
              document.getElementById("tbl").innerHTML +=
            `<tr class='trr'>
            <td>`+json[i]["name"]+`</td>
            <td>`+json[i]["admin_user"]+`</td>
            <td><a href="/view/?id=`+json[i]["content_id"]+`">View</a></td>
            <td><a href="/editor/?id=`+json[i]["content_id"]+`">Open Project</a></td>
          </tr>`;
            }
            
          })
        }
      }, )
 
var isDark=true;
  return (

  <div>
    <br/><br/>
    <center><table id="tbl">
  <tr className='trr'>
    <th>Name</th>
    <th>Owner</th>
    <th>View</th>
    <th>Edit</th>
  </tr>
  
  
</table></center><br/><center><a href='/add_page' className='btnn'>Add Page</a></center></div>


  )
}

export default Projects
