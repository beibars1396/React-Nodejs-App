import { DataTypes } from 'sequelize';

export default function (sequelize) {
    const todolist = sequelize.define(
        'todolist',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                unique: true
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            
            importHash: {
                type: DataTypes.STRING(255),
                allowNull: true,    
                validate: {
                    len: [0, 255],
                },    
            },
        },
        {
            indexes: [
            {
                unique: true,
                fields: ['importHash', 'tenantId'],
                where: {
                    deletedAt: null,
                },
            },

            ],
            timestamps: true,
            paranoid: true,
        },
    );

    todolist.associate = (models) => {
        models.todolist.belongsTo(models.tenant, {
            as: 'tenant',
            foreignKey: {
                allowNull: false,
            },
        });

        models.todolist.belongsTo(models.legalEntity, {
            as: 'origLegalEntity',
            foreignKey: {
                allowNull: false,
            },
        });

        models.todolist.belongsTo(models.status, {
            as: 'status',
            foreignKey: {
                allowNull: false
            }
        });

        models.todolist.belongsTo(models.user, {
            as: 'createdBy',
        });

        models.todolist.belongsTo(models.user, {
            as: 'updatedBy',
        });
    };

    return todolist;
}