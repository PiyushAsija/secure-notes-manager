import { useState } from "react";
import axios from "axios";

export default function Register(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const register = async ()=>{
        try{
            await axios.post("http://localhost:5000/api/auth/register",{email,password});
        alert("Registerd");
        }
        catch(err){
            alert(err.response?.data?.error || "Error")
        }
    }

    return(
        <>
            <h3>Register</h3>
            <input placeholder="Email" onChange={e=>setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            <button onClick={register}>Register</button>
        </>
    );
}