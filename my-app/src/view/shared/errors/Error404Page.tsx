import ErrorWrapper from "./styles/ErrorWrapper";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

const Error404Page = () => {
    return (
        <ErrorWrapper>
            <div className="exception">
                <div className="content">
                    <h1>404</h1>
                    <div className="desc">Странница не найдена</div>
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
    )
}

export default Error404Page;