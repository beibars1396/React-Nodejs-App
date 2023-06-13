import Roles from './roles';

const roles = Roles.values;

class Permissions {
    static get values() {
        return {
            adminPermissions: {
                id: 'adminPermissions',
                allowedRoles: [
                    roles.admin
                ]
            },
        };
    }

    static get asArray() {
        return Object.keys(this.values).map((value) => {
        return this.values[value];
        });
    }
}

export default Permissions;
