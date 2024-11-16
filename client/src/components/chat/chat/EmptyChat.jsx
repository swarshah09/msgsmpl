import React from 'react'

import { Box, styled, Typography, Divider } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import emptyChatImg from '../../../assets/download.png'

const Component = styled(Box)`
    background: #f8f9fa;
    padding: 30px 0;
    text-align: center;
    height: 100vh;
`;

const Container = styled(Box)`
    padding: 0 200px;
`;
    
const Image = styled('img')({
    marginTop: 100,
    width: 400
})
   
const Title = styled(Typography)`
    font-size: 32px;
    font-family: inherit;
    font-weight: 300;
    color: #41525d;
    margin-top: 25px 0 10px 0;
`;

const SubTitle = styled(Typography)`
    font-size: 14px;
    color: #667781;
    font-weight: 400;
    font-family: inherit;
`;

const StyledDivider = styled(Divider)`
    margin: 40px 0;
    opacity: 0.4;
`;

const EmptyChat = () => {
    
    return (
        <Component>
            <Container>
                <Image src={emptyChatImg} alt="empty" />
                <Title>SwiftChat</Title>
                <SubTitle>Now send and receive messages without keeping your phone online.</SubTitle>
                <SubTitle>Enjoy the convenience of real-time communication with the ability to chat and make video calls. Connect with friends, family, and colleagues around the world, and experience the thrill of face-to-face conversations no matter where you are. </SubTitle>
                <StyledDivider />
                <SubTitle><LockIcon fontSize='small'/> Your personal messages are end-to-end encrypted</SubTitle>

            </Container>
        </Component>
    )
}

export default EmptyChat;
