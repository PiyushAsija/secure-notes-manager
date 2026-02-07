import { useState } from "react";
import axios from "axios";


export default function Login({onSuccess}){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const login = async()=>{
        try{
            const res=await axios.post("http://localhost:5000/api/auth/login",{email,password});
            localStorage.setItem("token",res.data.token);
            onSuccess()
        }
        catch(err){
            alert(err.response?.data?.error || "Error")
        }
    }

    return(
        <>
            <h3>Login</h3>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
        </>
    );
}