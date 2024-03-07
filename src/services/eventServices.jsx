import API from "../config/axiosConfig";


export const get = (id) => {
    id = id || '';
    return API.get(`events/${id}`)
}

export const add = (body) => {
    return API.post(`events`,body)
}

export const update = (body, id) => {
    return API.put(`events/${id}`, body);
}

export const deleteEvent = (id) => {
    return API.delete(`events/${id}`)
}