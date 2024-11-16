import React from 'react'
import { useContext } from 'react';
import LoginDialog from './account/LoginDialog'
import { AppBar, Toolbar, Box } from '@mui/material';
import ChatDialog from './chat/ChatDialog';
import { AccountContext } from '../context/AccountProvider';
import './Messenger.scss';

const Messenger = () => {

    const { account } = useContext(AccountContext);
    return (
        <Box className='box'>
            {
                account ?
                    <>
                        <AppBar className='appbarchat'>
                            <Toolbar>

                            </Toolbar>
                        </AppBar>
                        <ChatDialog />
                    </>
                    :
                    <>
                        <AppBar className='appbar'>
                            <Toolbar>

                            </Toolbar>
                        </AppBar>
                        <LoginDialog />
                    </>
            }
        </Box>
    )
}

export default Messenger
