let notistackEnqueueSnackbar: (arg0: any, arg1: { variant: string; } | undefined) => void;

export default class Message {
    static registerNotistackEnqueueSnackbar(instance: any) {
        notistackEnqueueSnackbar = instance;
    }

    static success(arg: any) {
        notistackEnqueueSnackbar(arg, { variant: 'success' });
    }

    static error(arg: any) {
        notistackEnqueueSnackbar(arg, { variant: 'error' })
    }
}