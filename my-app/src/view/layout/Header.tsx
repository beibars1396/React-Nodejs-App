import { AppBar, makeStyles, Toolbar } from "@mui/material";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grow: {
        flex: '1 1 auto'
    },
    logo: {
        paddingLeft: theme.spacing(1),
        fontWeight: 500,
        fontSize: '1.5 em',
        color: theme.palette.getContrastText(
            theme.palette.primary.main
        ),
        textDecoration: 'none'
    }
}));

export default function Header(props) {
    // const classes = useStyles();

    return(
        <AppBar position="fixed">
            <Toolbar>
                {/* <Link className={classes.logo} to="/"> */}
                <Link to="/">
                    App
                </Link>
                {/* <div className={classes.grow} /> */}
            </Toolbar>
        </AppBar>
    )
}