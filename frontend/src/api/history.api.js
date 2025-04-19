import { makeRequest } from "./makeRequest";

const deleteItemFromHistory = async (id) => {
    return await makeRequest('delete', `/history/${id}`)
}

const fetchHistory = async () => {
    return await makeRequest('get', '/history')
}

export default { deleteItemFromHistory, fetchHistory };