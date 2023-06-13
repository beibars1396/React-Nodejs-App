let inMemoryToken: null = null;

export class AuthToken {
    static get() {
        return (
            inMemoryToken || localStorage.getItem('jwt') || null
        );
    }

    static set(token: null, rememberMe: any) {
        if(rememberMe) {
            localStorage.setItem('jwt', token || '');
        } else {
            inMemoryToken = token;
            localStorage.setItem('jwt', '');
        }
    }
}