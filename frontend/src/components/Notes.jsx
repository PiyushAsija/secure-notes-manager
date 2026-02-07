import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes(){
    const [notes, setNotes]=useState([]);
    const [title, setTitle]=useState("");
    const [content, setContent]=useState("");
    const token = localStorage.getItem("token");
    
    const fetchNotes = async ()=>{
        const res=await axios.get("http://localhost:5000/api/notes",{
            headers:{Authorization:token}
        });
        setNotes(res.data);
    };

    const addNote= async ()=>{
        await axios.post("http://localhost:5000/api/notes",
            {title,content},
            {headers:{Authorization:token}}
        );
        fetchNotes();
    };
    useEffect(()=>{
        fetchNotes();
    },[])

    return(
        <>
        <h3>Notes</h3>
        <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <input placeholder="Content" onChange={e => setContent(e.target.value)} />
        <button onClick={addNote}>Add</button>

        {notes.map((n)=>{
            <div key={n.id}>
                <h4>{n.title}</h4>
                <p>{n.content}</p>
            </div>
        })}
        </>
    );
}