import { useEffect, useState } from "react"
import { task } from "../types/task"
import TaskItem from "./TaskItem"
const TaskManager = ()=>{
    const [tasks, setTasks] = useState<task[]>([])
    const [newTaskDescription, setNewTaskDescription] = useState<string>('')

    useEffect(()=>{
        const savedTasks = localStorage.getItem('tasks');
        if(savedTasks){
            setTasks(JSON.parse(savedTasks))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = ()=>{
        if(newTaskDescription.trim()){
            const newTask: task = {
                id: Date.now(),
                description: newTaskDescription,
                completed: false
            }
            setTasks([...tasks, newTask])
            setNewTaskDescription('')
        }
    }

    const toggleTaskCompletion = (id: number)=>{
        setTasks(tasks.map(task=>task.id === id ? {...task, completed: !task.completed}:task))
    }

    const deleteTask = (id:number)=>{
        setTasks(tasks.filter(task => task.id !== id));
    }

    return(
        <>
<div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo"
                value={newTaskDescription}  onChange={(e) => setNewTaskDescription(e.target.value)}/>
                <button onClick={addTask} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal  hover:bg-teal">Add</button>
            </div>
        </div>
        <div>
        <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleCompletion={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        ))}
      </ul>
        </div>
    </div>
</div>
        </>
    )
}

export default TaskManager;