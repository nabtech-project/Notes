import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt } from "react-icons/fa";
import API_URL from "../config";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get(`${API_URL}/notes`, {
                    headers: { authorization: token },
                });
                setNotes(res.data);
            } catch (err) {
                alert(err.response?.data || "Error fetching notes");
            }
        };
        fetchNotes();
    }, [token]);

    const openAddModal = () => {
        setEditingNote(null);
        setTitle("");
        setContent("");
        setModalOpen(true);
    };

    const openEditModal = note => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
        setModalOpen(true);
    };

    const saveNote = async () => {
        try {
            if (editingNote) {
                const res = await axios.put(
                    `${API_URL}/notes/${editingNote._id}`,
                    { title, content },
                    { headers: { authorization: token } }
                );
                setNotes(notes.map(n => (n._id === editingNote._id ? res.data : n)));
            } else {
                const res = await axios.post(
                    `${API_URL}/notes`,
                    { title, content },
                    { headers: { authorization: token } }
                );
                setNotes([...notes, res.data]);
            }
            setModalOpen(false);
        } catch (err) {
            alert(err.response?.data || "Something went wrong");
        }
    };

    const deleteNote = async id => {
        if (!window.confirm("Delete this note?")) return;
        await axios.delete(`${API_URL}/notes/${id}`, {
            headers: { authorization: token },
        });
        setNotes(notes.filter(n => n._id !== id));
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="container">
            <div className="header">
                <h2>My Notes</h2>
                <button className="logout-btn" onClick={logout}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            <div className="notes-grid">
                {notes.map(note => (
                    <div key={note._id} className="note-card">
                        <h4>{note.title}</h4>
                        <p>{note.content}</p>
                        <small>{new Date(note.updatedAt || note.createdAt).toLocaleString()}</small>
                        <div className="note-actions">
                            <button onClick={() => openEditModal(note)} title="Edit">
                                <FaEdit />
                            </button>
                            <button onClick={() => deleteNote(note._id)} title="Delete">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="fab" onClick={openAddModal}>
                <FaPlus />
            </button>

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{editingNote ? "Edit Note" : "Add Note"}</h3>
                        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
                        <div className="modal-buttons">
                            <button onClick={saveNote}>{editingNote ? "Update" : "Add"}</button>
                            <button onClick={() => setModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        body, html { margin: 0; padding: 0; font-family: sans-serif; }
        .container { max-width: 800px; margin: auto; padding: 20px; position: relative; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .logout-btn { background: #ff4d4f; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: bold; }
        .logout-btn:hover { background: #e04344; }
        .notes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .note-card { background: linear-gradient(135deg, #6a11cb, #2575fc); color: white; padding: 15px; border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 6px 12px rgba(0,0,0,0.2); }
        .note-card h4 { margin: 0 0 10px; }
        .note-card p { margin-bottom: 10px; }
        .note-card small { font-size: 12px; opacity: 0.8; }
        .note-actions { display: flex; justify-content: flex-end; gap: 10px; }
        .note-actions button { background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 8px; border-radius: 5px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
        .note-actions button:hover { background: rgba(255,255,255,0.4); }
        .fab { position: fixed; bottom: 30px; right: 30px; background: #2575fc; color: white; border: none; border-radius: 50%; width: 60px; height: 60px; font-size: 25px; cursor: pointer; box-shadow: 0 6px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; }
        .fab:hover { background: #6a11cb; }
        .modal { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; }
        .modal-content { background: white; padding: 25px; border-radius: 12px; width: 90%; max-width: 450px; display: flex; flex-direction: column; gap: 15px; }
        .modal-content input, .modal-content textarea { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ccc; font-size: 16px; }
        .modal-buttons { display: flex; justify-content: flex-end; gap: 10px; }
        .modal-buttons button { padding: 10px 15px; border-radius: 8px; border: none; cursor: pointer; font-weight: bold; }
        .modal-buttons button:first-child { background: #2575fc; color: white; }
        .modal-buttons button:first-child:hover { background: #6a11cb; }
        .modal-buttons button:last-child { background: #ccc; }
        .modal-buttons button:last-child:hover { background: #bbb; }
      `}</style>
        </div>
    );
}
