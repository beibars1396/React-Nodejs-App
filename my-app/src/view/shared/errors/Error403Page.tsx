import { Link } from 'react-router-dom';
import ErrorWrapper from './styles/ErrorWrapper';
import { Button } from '@mui/material';

const Error403Page = () => {
    return (
        <ErrorWrapper>
            <div className="content">
                <h1>403</h1>
                <div className="desc">Ошибка Авторизации</div>
                <div className="actions">
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="primary"
                        type="button"
                    >
                        На Главную
                    </Button>
                </div>
            </div>
        </ErrorWrapper>
    );
};

export default Error403Page;