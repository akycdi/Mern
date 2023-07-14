import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

function AppBarRender() {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToSignup = () => {
        navigate('/signup');
    };

    const navigateToLogin = () => {
        navigate('/login');
    };
    
    const isLoginPage = location.pathname === '/login';
    const isTodoPage = location.pathname === '/todo';
    const isSignUpPage = location.pathname === '/signup';

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TODO
                </Typography>
                {!isLoginPage && !isTodoPage && !isSignUpPage && <Button color="inherit" onClick={navigateToSignup}>Signup</Button>}
                {!isLoginPage && !isTodoPage && <Button color="inherit" onClick={navigateToLogin}>Login</Button>}
            </Toolbar>
        </AppBar>
    );
}

export default AppBarRender;
