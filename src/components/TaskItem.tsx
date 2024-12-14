import { task } from "../types/task"


interface TaskItemProps{
    task: task,
    onToggleCompletion: (id: number)=> void,
    onDelete: (id:number)=> void
}


const TaskItem: React.FC<TaskItemProps> = ({task, onToggleCompletion, onDelete})=>{
    return(
        <li>
             <div className="flex mb-4 items-center">
                <p className={`w-full text-grey-darkest${task.completed?'overline': ''}`}>{task.description}</p>
                <button onClick={()=>{onToggleCompletion(task.id)}} 
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded
                  text-green border-green hover:bg-green">Done</button>
                <button  onClick={ ()=>{ onDelete(task.id)}}
                 className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red
                  hover:text-red hover:bg-red">Remove</button>
            </div>
        </li>
    )
}

export default TaskItem
