import React from "react";
import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'

const SignUp = () => { 
   const [name, setName] = useState("")
   const [password, setPassword] = useState("")
   const [email, setEmail] = useState("")
   const navigate = useNavigate()


useEffect(()=>{
   const auth = localStorage.getItem("user")
   if(auth){
    navigate("/")
   }
})

   const collectData = async () => {
      console.warn(name, email, password)
      let result = await fetch("http://localhost:5000/register", {
         method: "post",
         body: JSON.stringify({ name, email, password }),
         headers: {
            'Content-Type': 'application/json'
         },
      })
      
      result = await result.json()
      console.warn(result)
      localStorage.setItem("user",JSON.stringify(result))
      if(result){
         navigate("/")
      }
   }

   return (
      <div className="register">
         <h1> Register</h1>

         <input className="inputBox" type="text" placeholder="Enter Name" value={name}
            onChange={(e) => setName(e.target.value)} />

         <input className="inputBox" type="text" placeholder="Enter Email" value={email}
            onChange={(e) => setEmail(e.target.value)} />

         <input className="inputBox" type="password" placeholder="Enter Password" value={password}
            onChange={(e) => setPassword(e.target.value)} />

         <button onClick={collectData} className="appbutton" type="submit">Sign Up</button>
      </div>
   )
}
export default SignUp