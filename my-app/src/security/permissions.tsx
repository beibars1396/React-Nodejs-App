import Roles from "./roles"

const roles = Roles.values;

export default class Permissions {
    static get values() {
        return {
            adminPermissions: {
                id: 'analystPermissions',
                allowedRoles: [
                    roles.admin,
                ]
            },
        }
    }
}