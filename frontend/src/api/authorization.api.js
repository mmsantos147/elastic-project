import { makeRequest } from "./makeRequest";

const register = async (content) => {
    return await makeRequest('post', '/register', content)
}

const login = async (content) => {
    return await makeRequest('post', '/login', content)
}