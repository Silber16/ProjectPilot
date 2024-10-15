import { useEffect, useState } from "react";
import CreateModal from "./CreateModal";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Tasks({projectTasks, projectId}) {

    const {register, handleSubmit, setValue} = useForm();

    const [tasks, setTasks] = useState(projectTasks);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTask, setEditingTask] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [seeAll, setSeeAll] = useState(false)
    const [taskToMap, setTaskToMap] = useState(tasks.slice(0,3))

    const firstThreeTask = tasks.slice(0,3);

    useEffect(() => {
        if (seeAll) {
            setTaskToMap(tasks); 
        } else {
            setTaskToMap(firstThreeTask); 
        }
    }, [seeAll]); 
    
    const seeAllTask = () => {
        setSeeAll(!seeAll);
    };

    async function edit(bool ,task)
        { 
            setIsEditing(bool)

            if (bool == false) {
                return
            }

            setEditingTask(task)

            setValue("Title", task.title);
            setValue("Desc", task.desc);
            setValue("PriorityLevel", Number(task.priorityLevel));
            setValue("DateLimit", task.dateLimit)
        }

    async function handleCreateTask(task) {
        console.log(task)
        task = {
            ...task,
            projectId: projectId
        };
        
        axios.post(`${import.meta.env.VITE_BACK_URI}/Tasks/Create`, task)
            .then(res => {
                if (res.status == 200 || res.status == 201) {
                    setTasks([...tasks, task])
                    window.location.reload();
                }
            })
            .catch(e => console.error(e))
    }

    async function send(data) {
        await axios.patch(`${import.meta.env.VITE_BACK_URI}/Tasks/Edit/${editingTask.id}`, data) 
        .then(response => {
            if (response.status == 200) {
                setIsEditing(false)
                window.location.reload()
            }
        })
        .catch(e => console.error(e))
    }

    async function deleteTask(taskId) {
        if (taskId != undefined) {
            axios.delete(`${import.meta.env.VITE_BACK_URI}/Tasks/Delete/${taskId}`)
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
    
    const priorityLevelPrint = (priority) => {
        switch (priority) {
            case 1:
                return "Low";
            case 2:
                return "Medium";
            case 3:
                return "High";
        
            default:
                "Value is not on the range";
        }
    }


  return (
    <section className="tasks-sec">
        <header className="task-sec__header">
            <label className="header--title">Tasks</label>
            <button onClick={() => setShowCreateModal(true)} className="header--createTask">Create Task</button>
        </header>
        {isEditing ? (
            <div className="edit-t-p">
                <label>Edit Task</label>
                <form className="edit-t-p__form" onSubmit={handleSubmit(send)}>
                    <div className="edit-t-p__form--inputs">
                        <div>
                            <label>
                                Title:
                            </label>
                            <input
                                type="text"
                                {...register("Title")}
                                maxLength={25}
                            />
                        </div>
                        <div>
                            <label>
                                Description:
                            </label>
                            <input
                                type="text"
                                {...register("Desc")}
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label>
                                Priority:
                            </label>
                            <select {...register("PriorityLevel")}>
                                <option value={1}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                            </select>
                        </div>
                        <div>
                            <label>
                                Date limit:
                            </label>
                            <input
                                type="date"
                                {...register("DateLimit")}
                            />
                        </div>
                    </div>
                    <div className="edit-t-p__form--btns">
                        <button className="edit-t-p__form--submitBtn" type="submit" >
                            <span className="material-symbols-outlined">check</span>
                        </button>
                        <button className="edit-t-p__form--cancelBtn" onClick={() => { edit(false, null)}}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </form>
            </div>
            ) : (
            <ul className="tasks-sec__tasks-container">
                {tasks.length > 0 
                    ? (taskToMap.map(task => (
                            <li className="task-container" key={task.id}>
                            <div className="task-container__info"
                                 style={
                                    task.priorityLevel == 3
                                    ?  {borderLeft: '2px solid red'}
                                    : task.priorityLevel == 2
                                    ? {borderLeft: '2px solid orange'}
                                    : {borderLeft: '2px solid green'}
                                 }
                            >
                                <h5 className="task-container__info--title">{task.title}</h5>
                                <p className="task-container__info--desc"> <b>Description:</b> {task.desc}</p>
                                <p className="task-container__info--priority"><b>Priority:</b> {priorityLevelPrint(task.priorityLevel)}</p>
                                <p className="task-container__info--date"><b>Date Limit:</b> {task.dateLimit && task.dateLimit.slice(0,10)}</p>
                            </div>
                            <div className="task-container__options">
                                <button className="task-container__options--edit" onClick={() => edit(true, task)}><span className="material-symbols-outlined">edit_note</span></button>
                                <button className="task-container__options--delete" onClick={() => deleteTask(Number(task.id))}><span className="material-symbols-outlined">delete</span></button>
                            </div>
                            </li>
                )))
                    : (<p >You dont have tasks already</p>)
                }
                {
                    tasks.length > 3 
                    && (<a className="tasks-sec__tasks-container--seAll" onClick={() => seeAllTask()}>{seeAll ? "SEE OLDEST" : "SEE ALL"}</a>)
                }
            </ul>
            )}
        
        <CreateModal
            show={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSave={handleCreateTask}
            modalType={"task"}
        />
    </section>
  )
}
