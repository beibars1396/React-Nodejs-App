export default class Roles {
    static get values() {
        return{
            admin: 'admin',
        }
    }

    static labelOf(roleId){
        if(!this.values[roleId]){
            return roleId
        }
        return this.values[roleId];
    }
}