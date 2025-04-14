import { makeRequest } from "./makeRequest"

const search = async (content) => {
    return await makeRequest('get', `search?query=${content}`);
}

const fetchHistory = async (content) => {
    return await makeRequest('post', 'history', content);
}

export default { search, fetchHistory };