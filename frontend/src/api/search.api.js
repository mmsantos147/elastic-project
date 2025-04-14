import { makeRequest } from "./makeRequest"

const search = async (content) => {
    await makeRequest('post', `search?query=${content}`);
}

const fetchHistory = async (content) => {
    await makeRequest('post', 'history', content);
}

export default { search, fetchHistory };