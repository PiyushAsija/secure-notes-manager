import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://secure-notes-manager.onrender.com";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    const res = await axios.get(`${API}/api/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    await axios.post(
      `${API}/api/notes`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  const updateNote = async () => {
    await axios.put(
      `${API}/api/notes/${editingId}`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditingId(null);
    setTitle("");
    setContent("");
    fetchNotes();
  };

  return (
    <>
      <h2>Your Notes</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {editingId ? (
        <button onClick={updateNote}>Update Note</button>
      ) : (
        <button onClick={addNote}>Add Note</button>
      )}

      <hr />

      {notes.length === 0 && <p>No notes yet.</p>}

      {notes.map((n) => (
        <div key={n._id} className="note-card">
          <h4>{n.title}</h4>
          <p>{n.content}</p>

          <button
            className="secondary"
            onClick={() => {
              setEditingId(n._id);
              setTitle(n.title);
              setContent(n.content);
            }}
          >
            ✏️ Edit
          </button>

          <button
            style={{ background: "#ef4444" }}
            onClick={() => deleteNote(n._id)}
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </>
  );
}
