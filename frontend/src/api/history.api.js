import { makeRequest } from "./makeRequest";

const deleteHistoryItem = async (id) => {
    return await makeRequest('delete', `/history/${id}`)
}

export default deleteHistoryItem;