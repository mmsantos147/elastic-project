import { makeRequest } from "./makeRequest"

const search = async (content) => {
    return await makeRequest('post', `search`, content);
}

const searchAsYouType = async (content) => {
    return await makeRequest('post', `search/suggestions`, content)
}

const fetchHistory = async (content) => {
    return await makeRequest('post', 'history', content);
}

export default { search, fetchHistory, searchAsYouType };