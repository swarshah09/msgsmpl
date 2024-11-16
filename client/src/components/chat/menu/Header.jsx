import React from 'react'
import { useContext, useState } from 'react';

import { Box, styled } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';
import { Chat as MessageIcon } from '@mui/icons-material';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import InfoDrawer from '../../drawer/InfoDrawer';

import Popup1 from './Popup1';

//components
import HeaderMenu from './HeaderMenu';

const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;
const Image = styled('img') ({
    height: 40,
    width: 40,
    borderRadius: '50%'
})

const Wrapper = styled(Box) `
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };
    & :second-child {
        font-size: 22px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;

const Header = () => {

    const { account } = useContext(AccountContext);

    const [openDrawer, setOpenDrawer] = useState(false);

    const [showPopup, setShowPopup] = useState(false); //ch
    
    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    return (
        <>
            <Component>
                <Image src={account.picture} alt="PP" onClick={() => toggleDrawer()} />
                <Wrapper>
                    <span onClick={togglePopup}><VideoCallRoundedIcon fontSize='large' style={{ paddingBottom: 4, marginRight: 6 }}/></span>
                    {showPopup && <Popup1 closePopup={togglePopup} />}
                    <MessageIcon />
                    <HeaderMenu setOpenDrawer={setOpenDrawer}/>
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
        </>
    )
}

export default Header
