const ru = {
    app: {
        title: 'Приложение'
    },

    auth: {
        userNotFound: `Извините, пользователь не найден`,
        wrongPassword: `Извините, недействительный пароль`,
        weakPassword: 'Слишком слабый пароль',
        emailAlreadyInUse: 'Этот e-mail уже используется',
        invalidEmail: 'Недействительный e-mail',
        passwordReset: {
            invalidToken:
                'Недействительная ссылка сброса пароля.',
            error: `E-mail не найден`,
        },
        emailAddressVerificationEmail: {
            invalidToken:
                'Недействительная ссылка подтверждения e-mail.',
            error: `E-mail не найден`,
            signedInAsWrongUser: `Авторизация с другого пользователя`,
        },
        passwordChange: {
            invalidPassword: 'Недействительный старый пароль',
        },
    },
    
    user: {
        errors: {
            userAlreadyExists:
                'Пользователь с этим e-mail уже используется.',
            userNotFound: 'Пользователь не найден',
            destroyingHimself: `Вы не можете удалить свою учетную запись`, // <--- ?
            revokingOwnPermission: `Вы не можете убрать свои админ права`,
            revokingPlanUser: `Вы не можете убрать план`,
            destroyingPlanUser: `Вы не можете удалить план`, 
        },
    },

    tenant: {
        exists:
            'Уже создано рабочее место',
        url: {
            exists: 'URL рабочего места уже используется',
        },
        invitation: {
            notSameEmail: `Недействительный e-mail пользователя`,
        },
        planActive: 
            `Уже используется план для этого рабочего места, удалите пожалуйста предыдущий.`,
        stripeNotConfigured: 'Stripe не установлен',
    },

    importer: {
        errors: {
            invalidFileEmpty: 'Пустой файл',
            invalidFileExcel:
                'Только excel (.xlsx) файлы',
            invalidFileUpload:
                'Недействительный файл, Пожалуйста убедитесь что вы используете template последней версии.',
            importHashRequired: 'Требуется Import hash',
            importHashExistent: 'Данные уже были импортированны',
        },
    },

    errors: {
        notFound: {
            message: 'Не найден',
        },
        forbidden: {
            message: 'Запрещено',
        },
        validation: {
            message: 'Произошла Ошибка',
        },
    },

    email: {
        error: `Email provider не установлен`,
    },

    preview: {
        error:
            'Извините, эта операция не разрешена, в режиме просмотра.',
    },

    entities: {
        customer: {
            errors: {
                unique: {

                }
            }
        },
        product: {
            errors: {
                unique: {

                }
            }
        },
        order: {
            errors: {
                unique: {

                }
            }
        },
    }
}

export default ru;