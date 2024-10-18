import axios from "axios";
import { useForm } from "react-hook-form";

export default function EditProjectModal({show, onClose, id}) {

    const {register, handleSubmit} = useForm();

    function Send(data) {
        axios.patch(`${import.meta.env.VITE_BACK_URI}/Project/Edit/${id}`, data, {withCredentials:true}) 
            .then(response => {
                if (response.status == 200) {
                    window.location.reload();
                }
            })
            .catch(e => console.error(e))
         return
   }

   if (!show) {
      return null
   }
 
   return (
         <div className="edit-t-p"
              style={{
                position: 'fixed',
                
              }}    
        >
             <label>Edit Project</label>
             <form className="edit-t-p__form" onSubmit={handleSubmit(Send)}>
                 <div style={{textAlign: 'center', padding: '1rem 1rem 1.6rem 1rem'}} className="edit-t-p__form--inputs">
                    <div>
                        <label htmlFor="">Title</label>
                        <input type="text" name="Title" {...register("Title")}/>
                    </div>
                    <div >
                        <label htmlFor="">Edit description</label>
                        <input type="text" name="Desc" {...register("Desc")}/>
                    </div>
                 </div>
                 <div className="edit-t-p__form--btns">
                    <button className="edit-t-p__form--submitBtn" type="submit">
                        <span className="material-symbols-outlined">check</span>
                    </button>
                    <button className="edit-t-p__form--cancelBtn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                 </div>
             </form>
         </div>    
   )
}
