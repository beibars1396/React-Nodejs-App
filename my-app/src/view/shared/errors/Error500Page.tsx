import { Link } from 'react-router-dom';
import ErrorWrapper from './styles/ErrorWrapper';
import { Button } from '@mui/material';

const Error500Page = () => {
    return (
        <ErrorWrapper>
            <div className="exception">
                <div className="content">
                    <h1>500</h1>
                    <div className="desc">Внутренняя проблема сервера</div>
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
            </div>
        </ErrorWrapper>
    );
};

export default Error500Page;