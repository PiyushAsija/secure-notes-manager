import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Notes from "./components/Notes"

export default function App(){
  const [view,setView] = useState("login");

  return(
    <div style={{padding:20}}>
      <button onClick={()=>setView("login")}>Login</button>
      <button onClick={()=>setView("register")}>Register</button>
      <button onClick={()=>setView("notes")}>Notes</button>

      {view==="login" && <Login/>}
      {view==="register" && <Register/>}
      {view==="notes" && <Notes/>}

    </div>
  );
}