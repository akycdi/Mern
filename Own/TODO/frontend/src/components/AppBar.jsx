import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Routes, Route, useNavigate } from 'react-router-dom';

function AppBarRender() {
    const navigate = useNavigate();
    const navigateToSignup = () => {
        navigate('/signup');
    };
    const navigateToLogin = () => {
        navigate('/login');
    };
    const navigateToTodo= () => {
        navigate('/todo');
    };
    return (
        <AppBar position="static" >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TODO
                </Typography>
                <Button color="inherit" onClick={navigateToSignup}>Signup</Button>
                <Button color="inherit" onClick={navigateToLogin}>Login</Button>
            </Toolbar>
        </AppBar>
    )
}
export default AppBarRender;