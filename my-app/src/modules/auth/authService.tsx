import authAxios from "../shared/axios/authAxios";
import { AuthToken } from "./authToken";
// import { tenantSubdomain } from "modules/tenant/tenantSubdomain";
// import AuthCurrentTenant from "./authCurrentTenant";
// import Errors from '../shared/error/errors';
// import config from '../../config';

export default class AuthService {
    static async fetchMe() {
        const response = await authAxios.get('/auth/me');
        return response.data;       
    }

    static async changePassword(oldPassword: any, newPassword: any) {
        const body = {
            oldPassword,
            newPassword
        };

        const response = await authAxios.put(
            '/auth/change-password',
            body
        );

        return response.data;
    }

    static async updateProfile(data: any) {
        const body = {
            data
        }

        const response = await authAxios.put(
            'auth/profile',
            body
        )

        return response.data
    }

    static signout(){
        AuthToken.set(null, true);
    }

    static async registerWithEmailAndPassword(
        email: any,
        password: any,
    ) {
        // const invitationToken = AuthInvitationToken.get();
        
        const response = await authAxios.post('/auth/sign-up', {
            email,
            password,
        //   invitationToken,
            // tenantId: tenantSubdomain.isSubdomain
                // ? AuthCurrentTenant.get()
                // : undefined,
        //    tenantId: undefined 
        });
    
        // AuthInvitationToken.clear();
    
        return response.data;
    }

    static async signinWithEmailAndPassword(
        email: any, password: any
    ) {
        
        const response = await authAxios.post('/auth/sign-in', {
            email,
            password,
        });

        return response.data;
    }
}