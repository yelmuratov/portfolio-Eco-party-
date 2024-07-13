import axios from "axios";

export const getCategories = async ()=>{
    try {
        const response = axios.get('https://ecoapi.araltech.tech/portfolio/categories/');

        return (await response).data;
    } catch (error) {
        return error;
    }
}

export const fetchProjectWithId = async(id:number) => {
    try {
        const response = axios.get(`https://ecoapi.araltech.tech/portfolio/${id}/`);

        return (await response).data;
    } catch (error) {
        return error;
    }
}

export const fetchProjects = async () => {
    try {
        const response = await axios.get(`https://ecoapi.araltech.tech/portfolio/`);
        return response.data;
    } catch (error) {
        throw new Error('Erro while getting data from backend');
    }
};
