import styled from 'styled-components';

const FormWrapper = styled('div')({
    paddingTop: 0,
    paddingBottom: 0,

    '.ant-form-item-with-help': {
        marginBottom: '24px'
    },

    '.form-buttons': {
        '.ant-btn': {
            marginRight: '8px'
        }
    }
});

export const FormButtons = styled('div')({
    paddingTop: '16px',
    display: 'flex',

    '& > *': {
        marginRight: '8px',
        marginBottom: '8px',
    },
});

export const formItemLayout = {
    labelCol: {
        md: { span: 6 },
        lg: { span: 4 }
    },
    wrapperCol: {
        md: { span: 18 },
        lg: { span: 12 }
    }
}

export default FormWrapper;
