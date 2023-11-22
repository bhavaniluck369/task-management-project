import { createNewTask, deleteTask, getTasksList } from "../../services"

export const ACTIONS = {
    FETCH_TASK_LIST: 'FETCH_TASK_LIST',
    FETCH_TASK_LIST_SUCCESS: 'FETCH_TASK_LIST_SUCCESS',
    FETCH_TASK_LIST_FAILURE: 'FETCH_TASK_LIST_FAILURE',

    ADD_TASK: 'ADD_TASK',
    ADD_TASK_SUCCESS: 'ADD_TASK_SUCCESS',
    ADD_TASK_FAILURE: 'ADD_TASK_FAILURE',
    CLEAR_ADD_TASK: 'CLEAR_ADD_TASK',
    DELETE_TASK : 'DELETE_TASK'
}

export const clearAddTask = () => ({ type: ACTIONS.CLEAR_ADD_TASK });
export const addingTask = () => ({ type: ACTIONS.ADD_TASK });
export const addingTaskSuccess = () => ({ type: ACTIONS.ADD_TASK_SUCCESS });
export const addingTaskFailure = (error = "SOMETHING WENT WRONG") => ({ type: ACTIONS.ADD_TASK_FAILURE, payload: error });
export const deletingTask = () => ({type: ACTIONS.DELETE_TASK });


export const getAllTaskList = () => {
    return {
        type: ACTIONS.FETCH_TASK_LIST
    }
}


export const getAllTaskListSuccess = (lists = []) => {
    return {
        type: ACTIONS.FETCH_TASK_LIST_SUCCESS,
        payload: lists
    }
}

export const getAllTaskListFailure = (error) => {
    return {
        type: ACTIONS.FETCH_TASK_LIST_FAILURE,
        payload: error
    }
}


export const fetchAllTaskList = (dispatch) => {
    return async () => {
        try {
            // Dispatching action for loading 
            dispatch(getAllTaskList());

            // API CALL
            const { data } = await getTasksList();
            console.log(":: fetchAllTaskList ::", data);

            // Dispatching action for uploading task list
            dispatch(getAllTaskListSuccess(data));
        } catch (error) {
            const errorMessage = error?.response?.data?.error
            dispatch(getAllTaskListFailure(errorMessage))
        }
    }
}

export const addTask = (dispatch) => {
    return async (newTaskPayload) => {
        try {
            dispatch(addingTask());
            // API CALL
            const { data } = await createNewTask(newTaskPayload);
            dispatch(addingTaskSuccess());
            setTimeout(() => {
                dispatch(clearAddTask());
            }, 3000)
        } catch (error) {
            const errorMessage = error?.response?.data?.error
            console.log(":: addTask ERROR ::", { error, errorMessage })
            dispatch(addingTaskFailure(errorMessage));
        }
    }
}

export const removeTask = (dispatch) => {
        return async (taskId) => {
            try{
                dispatch(deletingTask());
                await deleteTask(taskId)
            }
            catch(error){
                const errorMessage = error?.response?.data?.error
                console.log(":: removeTask ERROR ::", { error, errorMessage })
            }
        }
}