import React from 'react'
import { useState } from 'react'
import "./../../global.css"
import "./Signup.css"
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import {Link} from "react-router-dom"
import "./../../global.css"



function Signup() {

     const [user,setUser] = useState({
          "fullname":"",
          "password":"",
           "email":"",
            "dob":""
     })


  const signup =  async ()=>{

   const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`,{
      "fullname":user.fullname,
      "password":user.password,
      "email":user.email,
      "dob": user.dob
   })

   
   console.log(response.data.data)

   if(response.data.success){
      toast.success("signup successfully")
   }

   else{
      toast.error("failed to signup")
   }


   
   
  }
  


  return (
    <div>
      <h1 className='auth-heading'>User Registration</h1>

      <form className='auth-form'>
        <input
          type="text"
          placeholder="Fullname"
          className='user-input'
          value={user.fullname}
          onChange={(e) => setUser({ ...user, fullname: e.target.value})}
          />

        <input
          type="email"
          placeholder="Email"
          className='user-input'
          value={user.email}
          onChange={(e)=>setUser({...user, email: e.target.value})}
          />

        <input
          type="password"
          placeholder="Password"
          className='user-input'
          value={user.password}
          onChange={(e)=>setUser({...user, password: e.target.value})}
          />

        <input
          type="date"
          placeholder="Date of Birth"
          className='user-input'
          value={user.dob}
          onChange={(e)=>setUser({...user, dob: e.target.value})}
          />

        <button
          type='button'
          className='btn-auth'
          onClick={signup}
          >
          Register
        </button>
      </form>

      <Link to='/login' className='auth-link'>Already have an account? Login</Link>

      <Toaster />
    </div>
  )
}

export default Signup