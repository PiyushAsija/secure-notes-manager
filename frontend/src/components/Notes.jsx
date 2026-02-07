import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes(){
    const [notes, setNotes]=useState([]);
    const [title, setTitle]=useState("");
    const [content, setContent]=useState("");
    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem("token");
    
    const fetchNotes = async ()=>{
        const res=await axios.get("http://localhost:5000/api/notes",{
            headers:{Authorization:token}
        });
        setNotes(res.data);
    };

    useEffect(()=>{
        fetchNotes();
    },[])

    const addNote= async ()=>{
        await axios.post("http://localhost:5000/api/notes",
            {title,content},
            {headers:{Authorization:token}}
        );
        setTitle("");
        setContent("");
        fetchNotes();
    };

    const deleteNote = async (id)=>{
        await axios.delete(
            `http://localhost:5000/api/notes/${id}`,
            {headers:{Authorization:token}}
        );
        fetchNotes();
    };

    const updateNote = async ()=>{
        await axios.put(
            `http://localhost:5000/api/notes/${editingId}`,
            {title,content},
            {headers:{Authorization:token}}
        );
        setEditingId(null);
        setTitle("");
        setContent("");
        fetchNotes();
    };
 

    return(
        <>
        <h3>Notes</h3>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        {editingId? (
            <button onClick={updateNote}>Update Note</button>
        ) :(<button onClick={addNote}>Add Note</button>
        )}

        <hr />

        {notes.map((n)=>{
            return (<div key={n._id} style={{border:"1px solid #ccc", padding:10, marginBottom:8}}>
                <h4>{n.title}</h4>
                <p>{n.content}</p>

                <button
                    onClick={()=>{
                        setEditingId(n._id);
                        setTitle(n.title);
                        setContent(n.content);
                    }}
                    >
                        Edit
                    </button>

                    <button onClick={()=> deleteNote(n._id)}>Delete</button>
            </div>
            );
        })}
        </>
    );
}