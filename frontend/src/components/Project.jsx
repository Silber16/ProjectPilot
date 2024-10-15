
import { Link } from "react-router-dom";
import EditProjectModal from "./EditProjectModal";
import { useState } from "react";

export default function Project({project, DeleteProject}) {

    const [showModal, setShowModal] = useState(false)

    const onClose = () => setShowModal(false);
    const onShow = () => setShowModal(true);


  return (
    <>
      {project 
      ?(
          <div className="projectContainer">
            <div className="projectContainer__info">
              <h3 className="projectContainer__info--title">{project.title}</h3>
              <p className="projectContainer__info--desc">{project.desc}</p>
              <Link to={`/Project/Detail/${project.id}`} className="projectContainer__info--detail">ACCES</Link>
            </div>
            <div className="projectContainer__options">
              <button onClick={onShow} className="projectContainer__options--edit"><span className="material-symbols-outlined">edit_note</span></button>
              <button onClick={() => DeleteProject(project.id)} className="projectContainer__options--delete"><span className="material-symbols-outlined">delete</span></button>
            </div>
          </div>
       )
      : (console.log("project is null"))
      }
      <EditProjectModal 
        show={showModal}
        onClose={onClose}
        id={project.id}
      ></EditProjectModal>
     
    </>
  )
}
