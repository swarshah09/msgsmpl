import React from 'react'
import { useContext } from 'react';
import { Dialog } from '@mui/material';
// import logo from '../../assets/trnpt.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { AccountContext } from '../../context/AccountProvider';
import "./LoginDialog.scss"
// api
import { addUser } from '../../services/api';

// const dialogStyle = {
//     marginTop: '15%',
//     height: '95%',
//     width: '60%',
//     maxWidth: '100%',
//     maxHeight: '100%',
//     borderRadius: 0,
//     boxShadow: 'none',
//     overflow: 'hidden'
// }

const LoginDialog = () => {

    const { setAccount } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        const decoded = jwtDecode(res.credential);
        console.log(decoded);
        setAccount(decoded);
        await addUser(decoded);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    return (
        <Dialog
            className='dialog'
            open={true}
            PaperProps={{
                sx: {
                    // marginTop: '3%',
                    height: '95%',
                    width: '400px',
                    maxWidth: '90%',
                    maxHeight: '400px',
                    borderRadius: 10,
                    boxShadow: 'none',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                    '@media (max-width: 768px)': {
                        marginTop: '20%',
                        height: '100%',
                        width: '100%',
                        borderRadius: 0,
                    },
                },
            }}
            hideBackdrop={true}
        >
            <div className="login-dialog">
                <div className="login-logo">
                    {/* <img src={logo} alt="" /> */}
                    <h1>Realtime ChatRoom</h1>
                </div>

            </div>
            <p>To continue to the app please SignIn</p>
            <div className="google">
                <button class="button">
                    <GoogleLogin
                    buttonText=""
                    onSuccess={onLoginSuccess}
                    onError={onLoginFailure}
                />
                </button>
            </div>
        </Dialog>
    )
}

export default LoginDialog;
