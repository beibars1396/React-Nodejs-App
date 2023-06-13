import { CircularProgress } from '@mui/material';

function Spinner() {
    return (
        <div
            style={{
                width: '100%',
                marginTop: '24px',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress color="secondary" />
        </div>
    );
}

export default Spinner;