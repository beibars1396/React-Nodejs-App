export default class PermissionChecker {
    currentUser;

    constructor(currentUser) {
        this.currentUser = currentUser;
    }

    get currentUserRolesIds() {
        if (!this.currentUser) {
            return [];
        }

        
        return this.currentUser.roles;
    }

    match(permission) {
        if (!permission) {
            return true;
        }
        
        return this.rolesMatchOneOf(permission.allowedRoles);
    }

    rolesMatchOneOf(arg) {
        if (!this.currentUserRolesIds) {
            return false;
        }

        if (!arg) {
            return false;
        }

        if (Array.isArray(arg)) {
            if (!arg.length) {
                return false;
            }

            return arg.some((role) =>
                this.currentUserRolesIds.includes(role),
            );
        }

        return this.currentUserRolesIds.includes(arg);
    }

    get isAuthenticated() {
        return (
            Boolean(this.currentUser) &&
            Boolean(this.currentUser.id)
        );
    }
}