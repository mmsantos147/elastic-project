import { makeRequest } from "./makeRequest";

const initSession = async () => {
    return await makeRequest('post', 'user/init')
}

const register = async (content) => {
    return await makeRequest('post', 'register', content)
}

const login = async (content) => {
    return await makeRequest('post', 'login', content)
}

export default { initSession, register, login }