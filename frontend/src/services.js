import axios from "axios";
import { getAuthDetails } from "./utils/auth";

const BASE_API_URL = `https://solid-space-fortnight-wwjv49w499g299jr-5000.app.github.dev`;

const getAuthHeaders = () => {
    const userAuthDetails = getAuthDetails();
    if (!userAuthDetails.token) return {};
    return {
        'Authorization': `Basic ${userAuthDetails.token}`,
    }
}

const API_ENDPOINTS = {
    LOGIN: `${BASE_API_URL}/login`,
    REGISTER: `${BASE_API_URL}/register`,

    GET_TASKS_LIST: `${BASE_API_URL}/tasks`,
    CREATE_TASK: `${BASE_API_URL}/tasks`,

    ADD_CATEGORY: `${BASE_API_URL}/addNewCategory`,
    GET_CATEGORIES: `${BASE_API_URL}/categories`,
}

export const userLogin = (payload) => {
    return axios.post(API_ENDPOINTS.LOGIN, payload)
}

export const userRegister = (payload) => {
    return axios.post(API_ENDPOINTS.REGISTER, payload)
}


export const createNewCategory = (payload) => {
    return axios.post(API_ENDPOINTS.ADD_CATEGORY, payload)
}

export const fetchCategories = () => {
    return axios.get(API_ENDPOINTS.GET_CATEGORIES)
}

export const getTasksList = () => {
    return axios.get(API_ENDPOINTS.GET_TASKS_LIST, {
        headers: {
            ...getAuthHeaders(),
        }
    });
}

export const createNewTask = (payload) => {
    return axios.post(API_ENDPOINTS.CREATE_TASK, payload, {
        headers: {
            ...getAuthHeaders()
        }
    })
}

/*
payload = {
    "id": 1,
    "title": "UI Login",
    "description": "Design UI Login Page",
    "dueDate": "2023-11-17T00:00:00.000Z",
    "priority": "medium",
    "isComplete": false,
    "categoryId": 1,
    "userId": 1
}
*/

export const updateTask = ({ id, userId, ...rest }) => {
    return axios.patch(`${API_ENDPOINTS.CREATE_TASK}/${payload.id}`, rest, {
        headers: {
            ...getAuthHeaders()
        }
    })
}

export const deleteTask = (id) => {
    return axios.delete(`${API_ENDPOINTS.CREATE_TASK}/${id}`, {
        headers: {
            ...getAuthHeaders()
        }
    })
}


/*
Actions    
1. Update Task ({id, ...updatedFields}) -> updateTask();
2. Delete task (id) -> deleteTask();
*/