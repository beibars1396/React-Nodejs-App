import authAxios from "modules/shared/axios/authAxios";

export default class TodolistService {
    static async update(id, data) {
        const body = {
            id, 
            data
        }
        const response = await authAxios.put(
            `/todolist/${id}`,
            body
        );
        
        return response.data;
    }

    static async list(filter, orderBy, limit, offset) {
        const params = {
            filter,
            orderBy,
            limit,
            offset
        }

        const response = await authAxios.get(
            `todolist`, 
            {
                params
            }
        )

        return response.data;
    }

    static async destroy(ids) {
        const params = {
            ids,
        };
    
    
        const response = await authAxios.delete(
            `/todolist`,
            {
                params,
            },
        );
    
        return response.data;
    }

    static async edit(id, data) {
        const body = {
            id, 
            data
        }
        
        const response = await authAxios.put(
            `/todolist/${id}`,
            body
        )
        return response.data;
    }

    static async create(data) {
        const body = {
            data
        }
        
        const response = await authAxios.post(
            `/todolist`,
            body
        )
        
        return response.data;
    }

    static async find(id){
        const response = await authAxios.get(
            `/todolist/${id}`
        );
        return response.data
    }

    static async fetchTodolist(filter?, orderBy?, limit?, offset?) {
        const params = {
            filter,
            orderBy,
            limit,
            offset,
        };
    
        const response = await authAxios.get(
            `/todolist`,
            {
                params,
            },
        );
    
        return response.data;
    }
}