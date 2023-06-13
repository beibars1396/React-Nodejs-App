import SequelizeRepository from "../database/repositories/sequelizeRepository";
import TodolistRepository from "../database/repositories/todolistRepository";
import { IServiceOptions } from "./IServiceOptions";

export default class ConsignmentService {
    options: IServiceOptions;

    constructor(options) {
        this.options = options
    }

    async create(data) {
        const transaction = await SequelizeRepository.createTransaction(
            this.options.database
        );

        try {
            const record = await TodolistRepository.create(data, {
                ...this.options,
                transaction
            });
            
            await SequelizeRepository.commitTransaction(
                transaction
            );

            return record;
        } catch(error) {
            await SequelizeRepository.rollbackTransaction(
                transaction
            )
                
            SequelizeRepository.handleUniqueFieldError(
                error,
                this.options.language,
                'todolists'
            )
            throw error;
        }
    }

    async findById(id) {
        return TodolistRepository.findById(id, this.options.database);
    }

    async update(id, data) {
        const transaction = await SequelizeRepository.createTransaction(
            this.options.database
        );
        
        try {
            const record = await TodolistRepository.update(
                id,
                data,
                {
                    ...this.options,
                    transaction
                }
            );

            await SequelizeRepository.commitTransaction(
                transaction
            );

            return record;
        } catch(error) {
            await SequelizeRepository.rollbackTransaction(
                transaction
            );

            SequelizeRepository.handleUniqueFieldError(
                error,
                this.options.language,
                'todolists'
            );

            throw error;
        }
    }

    async findAndCountAll(args) {
        
        return TodolistRepository.findAndCountAll(
            args,
            this.options
        );
    }

    async destroyAll(ids) {
        const transaction = await SequelizeRepository.createTransaction(
            this.options.database
        );

        try {
            for(const id of ids) {
                await TodolistRepository.destroy(id, {
                    ...this.options,
                    transaction
                });
            }

            await SequelizeRepository.commitTransaction(
                transaction
            );
        }catch(error){
            await SequelizeRepository.rollbackTransaction(
                transaction
            );
            throw error;
        }
    }
}