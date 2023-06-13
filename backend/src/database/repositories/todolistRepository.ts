import { IRepositoryOptions } from "./IRepositoryOptions";
import SequelizeRepository from "./sequelizeRepository";
import lodash from 'lodash';
import Error404 from "../../errors/Error404";
import Sequelize, { where } from "sequelize";
import SequelizeFilterUtils from "../utils/sequelizeFilterUtils";

const Op = Sequelize.Op;

class TodoListRepository {
    static async create(data, options: IRepositoryOptions) {
        const currentUser = SequelizeRepository.getCurrentUser(
            options
        );

        const transaction = SequelizeRepository.getTransaction(
            options
        );

        const record = await options.database.todolist.create(
            {
                ...lodash.pick(data, [
                    'id',
                    'date',
                    'number',
                    'statusId',
                    'importHash',
                ]),

                tenantId: tenant.id,
                createdById: currentUser.id,
                updatedById: currentUser.id
            }, {
                transaction
            }
        );

        return this.findById(record.id, options)
    }

    static async destroy(id, options: IRepositoryOptions) {
        const transaction = SequelizeRepository.getTransaction(
            options
        );


        let record = await options.database.todolist.findOne(
            {
                where: {
                    id,
                },
                transaction
            }
        );

        if(!record) {
            throw new Error404();
        }

        await record.update(
            {
                status: 'deleted'
            },
            {
                transaction
            }
        );

        await record.destroy({
            transaction
        });
    }

    static async update(id, data, options: IRepositoryOptions) {
        const currentUser = SequelizeRepository.getCurrentUser(
            options
        );

        const transaction = SequelizeRepository.getTransaction(
            options
        );

        let record = await options.database.todolist.findOne(
            {
                where: {
                    id
                },
                transaction
            }
        );

        if(!record) {
            throw new Error404();
        }

        record = await record.update(
            {
                ...lodash.pick(data, [
                    'id',
                    'date',
                    'number',
                    'statusId',
                    'importHash',
                ]),

                updateById: currentUser.id
            },
            {
                transaction
            }
        );

        return this.findById(record.id, options);
    }

    static async count(filter, options: IRepositoryOptions) {
        const transaction = SequelizeRepository.getTransaction(
            options,
        );

        return options.database.todolist.count({
            where: filter,
            transaction,
        });
    }

    static async findAndCountAll(
        { filter, limit = 0, offset = 0, orderBy = '' },
        options: IRepositoryOptions,
    ) {
        const tenant = SequelizeRepository.getCurrentTenant(
            options
        );

        let whereAnd: Array<any> = [];
        let include = [

        ];

        whereAnd.push({
            tenantId: tenant.id
        });

        if (filter) {
            if (filter.id) {
                whereAnd.push({
                    ['id']: SequelizeFilterUtils.uuid(filter.id)
                });
            }

            if (filter.number) {
                whereAnd.push(
                    SequelizeFilterUtils.ilikeIncludes(
                        'todolist',
                        'number',
                        filter.number,
                    ),
                );
            }

        }

        const where = { [Op.and]: whereAnd };

        let {
            rows,
            count
        } = await options.database.todolist.findAndCountAll({
            where,
            include,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order: orderBy ? [orderBy.split('_')] : undefined,
            transaction: SequelizeRepository.getTransaction(options),
        });

        rows = await this._fillWithRelationsAndFilesForRows(
            rows, options
        );
        
        return { rows, count };
    }

    static async findById(id, options: IRepositoryOptions){
        const transaction = SequelizeRepository.getTransaction(
            options
        );

        const include = [

        ];

        const currentTenant = SequelizeRepository.getCurrentTenant(
            options
        );

        const record = await options.database.todolist.findOne(
            {
                where: {
                    id, 
                    tenantId: currentTenant.id
                },
                include,
                transaction
            }
        );

        if(!record) {
            throw new Error404();
        }

        return this._fillWithRelationsAndFiles(record, options);
    }

    static async _fillWithRelationsAndFiles(record, options: IRepositoryOptions) {
        if(!record) {
            return record;
        }

        const output = record.get({ plain: true });
        const transaction = SequelizeRepository.getTransaction(
            options
        )

        return output;
    }

    static async _fillWithRelationsAndFilesForRows(
        rows, options: IRepositoryOptions
    ) {
        if (!rows) {
            return rows
        }

        return Promise.all(
            rows.map((record) => 
                this._fillWithRelationsAndFiles(record, options))
        );
    }

    static async _createAuditLog(
        action,
        record,
        data,
        options: IRepositoryOptions
    ) {
        let values = {};

        if(data){
            values = {
                ...record.get({
                    plain: true
                }),
                photos: data.photos
            }
        }
    }

}

export default TodoListRepository;