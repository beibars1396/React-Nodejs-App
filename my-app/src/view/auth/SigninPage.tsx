import Content from "./styles/Content";
import Wrapper from "./styles/Wrapper";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import yupFormSchemas from "../../modules/shared/yup/yupFormSchemas";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from '../../modules/auth/authActions';
import InputFormItem from "../shared/form/items/InputFormItem";
import selectors from '../../modules/auth/authSelectors'
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { Link } from 'react-router-dom';
import Logo from "./styles/Logo";

const useStyles = makeStyles((theme) => ({
    grow: {
        flex: '1 1 auto'
    },
    logo: {
        // paddingLeft: theme.spacing(1),
        fontWeight: 500,
        fontSize: '1.5 em',
        // color: theme.palette.getContrastText(
        //     theme.palette.primary.main
        // ),
        color: 'black',
        textDecoration: 'none'
    }
}));

const schema = yup.object().shape({
    email: yupFormSchemas.string('E-mail')
        .required('Обязательное поле'),
    password: yupFormSchemas.string('Пароль')
        .required('Обязательное поле'),
    rememberMe: yupFormSchemas.boolean(
        'Запомнить меня'
    )
})

export default function SigninPage() {
    const externalErrorMessage = useSelector(
        selectors.selectErrorMessage
    )
    const dispatch = useDispatch();
    const classes = useStyles();
    const loading = useSelector(selectors.selectLoading)

    const [initialValues] = useState({
        email: '',
        password: '',
        rememberMe: true
    })

    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        defaultValues: initialValues
    })

    const onSubmit = (values) => {
        // dispatch(
        //     actions.doSigninWithEmailAndPassword(
        //         values.email,
        //         values.password,
        //         values.rememberMe
        //     )
        // )
    }

    return(
        <Wrapper
            style={{
                // backgroundImage: 'url(' + require("./styles/signin.png") + ')'
                backgroundImage: "url('https://www.pixelstalk.net/wp-content/uploads/2016/03/Dark-Blue-Background-download.png')"
            }}
        >
            <Content>
                <Logo>
                    <Link className={classes.logo} to="/">
                        <h1>App</h1>
                    </Link>
                    <h2>Логин</h2>
                </Logo>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <InputFormItem
                            name="email"
                            label="Email"
                            autoComplete="email"
                            autoFocus
                            externalErrorMessage={externalErrorMessage}
                        />
                        <InputFormItem
                            name="password"
                            label="Пароль"
                            autoComplete="password"
                            type="password"
                        />
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={'rememberMe'}
                                        name={'rememberMe'}
                                        defaultChecked={true}
                                        // inputRef={form.register}
                                        color="primary"
                                        size="small"
                                    />
                                }
                                label='Запомнить'
                            />

                            {/* "forgot password" */}
                        </Box>

                        <Button
                            style={{marginTop: '8px'}}
                            variant='contained'
                            color='primary'
                            type='submit'
                            fullWidth
                            disabled={loading}
                        >
                            Логин
                        </Button>

                    </form>

                </FormProvider>
            </Content>
        </Wrapper>
    )
}