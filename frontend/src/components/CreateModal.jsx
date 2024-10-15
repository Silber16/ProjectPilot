import { useState } from 'react';

export default function CreateModal({ show, onClose, onSave, modalType }) {
    
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priorityLevel, setPriority] = useState(1)
    const [dateLimit, setDate] = useState()
    const [link, setLink] = useState('')

    const handleSave = () => {
        onSave({ title, desc, priorityLevel, dateLimit, link });
        onClose(); 
    };

    if (!show) {
        return null;
    }

    return (
        <div className='createModal'>
            <h3 className='createModal__label'>Create new {modalType}</h3>
            <div className='createModal__sub-container'>
                <input
                    placeholder='Title'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='createModal__sub-container'>
                <input
                    placeholder='Description'
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc (e.target.value)}
                />
            </div>
            {modalType == "task" ? 
            (
                <>
                    <div className='createModal__sub-container taskSubContainer'>
                        <label ><b>Priority:</b></label>
                        <select value={priorityLevel} onChange={e => setPriority(e.target.value)}>
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                        </select>
                    </div>
                    <div className='createModal__sub-container taskSubContainer'> 
                        <label ><b>Date Limit:</b></label>
                        <input type="date" value={dateLimit} onChange={e => setDate(e.target.value)}/>
                    </div>
                </>
            ) : modalType == "note"
            ?
            (
               <div  className='createModal__sub-container'>
                  <input placeholder='Link' type="url" value={link} onChange={e => setLink(e.target.value)} />
               </div>
            )
            : (<></>)}
            <div className='createModal__options'>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose} >Close</button>
            </div>
        </div>
    );
}
