import axios from "axios";
import { useState } from "react";
import CreateModal from "./CreateModal";
import { useForm } from "react-hook-form";
import Hamburger from 'hamburger-react'

export default function Notes({projectNotes, projectId}) {
  
  const {register, handleSubmit, setValue} = useForm();

  const [notes, setNotes] = useState(projectNotes);
  const [showNotes, setShowNotes] = useState()
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setOpen] = useState(false)
  const [editingNote, setEditingNote] = useState();
  const [isEditing, setIsEditing] = useState(false);

  async function handleCreateNote(note) {
    note = {
        ...note,
        projectId: projectId,
        link: [note.link]
    };
    console.log(note.resources)
    axios.post(`${import.meta.env.VITE_BACK_URI}/Note/Create`, note)
        .then(res => {
            if (res.status == 200 || res.status == 201) {
                setNotes([...notes, note])
                window.location.reload();
            }
        }
            
        )
        .catch(e => console.error(e))
  }   

  async function edit(bool ,task)
  { 
      setIsEditing(bool)

      if (bool == false) {
          return
      }

      setEditingNote(task)

      setValue("Title", task.title);
      setValue("Desc", task.desc);
      setValue("Link", task.PriorityLevel);
  }
  async function send(data) {
    await axios.patch(`${import.meta.env.VITE_BACK_URI}/Note/Edit/${editingNote.id}`, data) 
    .then(response => {
        if (response.status == 200) {
           setIsEditing(false)
           window.location.reload();
        }
    })
    .catch(e => console.error("send error: ", e))
}

  async function DeleteNote(noteId) {
    if (noteId != undefined) {
        axios.delete(`${import.meta.env.VITE_BACK_URI}/Note/Delete/${noteId}`)
          .then(response => {

            console.log(response.status)
            if (response.status == 200) {
              window.location.reload();
            } 
            
          })
          .catch(
            e => console.error(e)
          )
      }
}
  return (
     <section className="notes-sec">
        <div className="notes-sec__header">
            <label>Notes</label>
            <Hamburger className="notes-sec__hamburguer" toggled={isOpen} toggle={setOpen}  onToggle={() => setShowNotes(!showNotes)}/>
        </div>
        {isEditing ? (
                     <>
                        <label className="edit-note-label">Edit Task</label>
                        <div className="edit-note">
                            <form className="edit-noet__form" onSubmit={handleSubmit(send)}>
                                <div className="edit-note__form--inps">
                                    <div>
                                        <label>
                                            Title:
                                        </label>
                                        <input
                                            type="text"
                                            {...register("Title")}
                                        />
                                    </div>
                                    <div>
                                        <label>
                                            Description:
                                        </label>
                                        <input
                                            type="text"
                                            {...register("Desc")}
                                        />
                                    </div>
                                    <div>
                                        <label>
                                            Resources:
                                        </label>
                                        <input
                                            type="url"
                                            {...register("Link")}
                                        />
                                    </div>
                                </div>
                                <div className="edit-note__form--btns">
                                    <button type="submit" >
                                        <span className="material-symbols-outlined">check</span>
                                    </button>
                                    <button onClick={() => { edit(false, null)}}>
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                     </>
                     ) 
                   : (
                    <ul className={showNotes ? "notes-sec__notes-container" : "hidden"}>
                      {notes.length > 0
                          ? (notes.map(
                            note => (
                                <li className="note-container" key={note.id}>
                                    <h5 className="note-container__title">{note.title}</h5>
                                    <p className="note-container__desc"><b>Description:</b>{note.desc}</p>
                                    {note.link && <p className="note-container__links"><b>Resources:</b>{note.link}</p>}
                                    <div className="note-container__options">
                                        <button className="note-container__options--edit" onClick={() => edit(true, note)}><span className="material-symbols-outlined">edit_note</span></button>
                                        <button className="note-container__options--delete" onClick={() => DeleteNote(Number(note.id))}><span className="material-symbols-outlined">delete</span></button>
                                    </div>
                                </li>
                        )))
                          : (<p>You dont have notes already</p>)
                      }
                    </ul>
                    )}        
        <button className="notes-sec__createNote" onClick={() => setShowModal(true)}>Create Note</button>
        <CreateModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleCreateNote}
            modalType={"note"}
        />
    </section>
  )
}
