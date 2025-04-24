import { makeRequest } from "./makeRequest";


const weather = async () => {
    return await makeRequest(`get`, `weatherReport`);
}

export default { weather };