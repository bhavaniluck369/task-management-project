import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTaskList, removeTask } from '../../store/task/actions';
import { Link } from 'react-router-dom'

export default function TaskList() {
	const { taskItems = [], isLoading, isTaskDeleted} = useSelector(state => state?.tasks)
	const dispatch = useDispatch();

	useEffect(() => {
		fetchAllTaskList(dispatch)();
	}, [])

	const handleRemove = async (taskId) => {
		try{
			await removeTask(dispatch)(taskId)
			fetchAllTaskList(dispatch)();
		}
		catch(error){
			console.log("::handleRemove::",error)
		}
	}


	return <div>
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Tasks</h2>
			<Link
				to="/add-task"
				className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
			>
				Add Task
			</Link>

			{isLoading && "Tasks are loading..."}
			<ul className="mt-4">
				{(taskItems || []).map(task => (
					<li key={task.id} className="border p-4 mb-2">
						<Link to={`/tasks/edit/${task.id}`} className="text-blue-500">
							{task.title}
						</Link>
						<button
							onClick={() => { handleRemove(task.id) }}
							className="float-right bg-red-500 text-white px-2 py-1 rounded"
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	</div>
} 