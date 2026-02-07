import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Notes from "./components/Notes"

export default function App(){
  const [token, setToken]=useState(localStorage.getItem("token"));
  const [view,setView] = useState(
    token?"notes":"login"
  );

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken(null);
    setView("login");
  };

  return(
    <div style={{padding:20}}>

        {token && (
          <button onClick={logout}>Logout</button>
        )}

      {!token &&(
        <>
        <button onClick={()=>setView("login")}>Login</button>
        <button onClick={()=>setView("register")}>Register</button>
        </>
      )}
      

      {view==="login" && (
        <Login onSuccess={()=>{
          setToken(localStorage.getItem("token"));
          setView("notes");
        }}
        />)}
      {view==="register" && <Register/>}
      {view==="notes" && <Notes/>}

    </div>
  );
}