import React, { useContext, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskContext from '../Context/TaskContext';
import { dateFormat } from '../Helper';
import Popup from '../components/Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';


function reducer(state, action){
    switch(action.type){
        case "view": return {type: "view", data: action.payload};
        case "edit": return {type: "edit", data: action.payload};
        case "delete": return {type: "delete", data: action.payload};
       
        default: return state;
    }
}

function TaskList(props) {
    const{taskList}=useContext(TaskContext);
    const [state, dispatch]=useReducer(reducer, 0);
    const[searchText, setSearchText]=useState("")
    const handleSearch =(e)=>{
        let text =e.target.value;
        setSearchText(text);

    }
    let filteredTask = taskList?.filter(task =>task.title.toLowerCase().includes(searchText.toLowerCase()));
    return (
        <div className='container bg-primary p-5'>
            <div className="d-flex">
                <h4>Task List</h4>
                <Link className='ms-auto' to="/create-task">Create Task</Link>
            </div>
            <input type="text" className='form-control my-3' placeholder='search' onChange={handleSearch}/>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Duedate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        taskList?
                        filteredTask.map((item)=>{
                            return(
                                
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{dateFormat(item.duedate)}</td>
                                    <td>
                                        <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type: "view", payload: item})}}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </span>

                                        <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type: "edit", payload: item})}}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </span>

                                        <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type: "delete", payload: item})}}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </span>
                                       

                                    </td>
                                </tr>

                            )
                        }):<tr><td>"No Data"</td></tr> 
                    }
                </tbody>

            </table>
            <Popup option={state}/>
     </div>
    );
}

export default TaskList;