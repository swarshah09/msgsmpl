import React from 'react'
import { useContext, useState } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { Box, styled, Typography } from '@mui/material';
import { formatDate, downloadMedia } from '../../../utils/common.utils';
// import GetAppIcon from '@mui/icons-material/GetApp';
import { iconPDF } from '../../../constants/data';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Own = styled(Box)(({ isImage }) => ({
    background: isImage ? '#BFBBBBFF' : '#050505FF',
    padding: 5,
    maxWidth: '60%',
    width: 'fit-content',
    marginLeft: 'auto',
    display: 'flex',
    borderRadius: 15,
    wordBreak: 'break-word',
    color: '#F7F9F9',
}));

const Wrapper = styled(Box)(({ isImage }) => ({
    background: isImage ? '#ededed' : '#ededed',
    padding: 5,
    maxWidth: '60%',
    width: 'fit-content',
    display: 'flex',
    borderRadius: 10,
    wordBreak: 'break-word',
    color: '#000',
}));

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
    color: #F7F9F9;
`;
const Time2 = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
    color: #000;
`;
const Time3 = styled(Typography)`
    background-color: #000000FF; /* remove single quotes */
    color: white; /* change color to white */
    width: 100%;
    height: 40px;
    word-break: keep-all;
    margin-top: auto;
    border-bottom-left-radius: 10px; /* Border radius from left bottom */
    border-bottom-right-radius: 10px; /* Border radius from right bottom */
`;

const Pdf = styled(Box)`
    display: flex;
    width: 300px;
    height: 90px;
    max-width: 80%; 
    word-break: break-word; /* changed from wordBreak to word-break */
`;
const Message = ({ message }) => {

    console.log(message.text);

    const { account } = useContext(AccountContext);
    return (
        <>
            {
                account.sub === message.senderId ?
                    <Own isImage={message.type === 'file'}>
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }
                    </Own>
                    :
                    <Wrapper isImage={message.type === 'file'}>
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }
                    </Wrapper>
            }
        </>
    )
}

const ImageMessage = ({ message }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Box style={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Box
                style={{ position: 'absolute', top: 1, right: 1, display: isHovered ? 'block' : 'none' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <KeyboardArrowDownOutlinedIcon
                    onClick={(e) => downloadMedia(e, message.text)}
                    fontSize='small'
                    style={{ marginRight: 3, color: 'white' }}
                /></Box>
            {
                message?.text?.includes('.pdf') ?
                    <Pdf>
                        <img src={iconPDF} alt="pdf" style={{ width: 50, height: 50 }} />
                        <Typography style={{ fontSize: '14', marginTop: 3 }} >{message.text.split("/").pop().split("-").slice(2).join(" ")}</Typography>
                        <Time3 style={{ position: 'absolute', bottom: 0, right: 0, color: '#919191' }}>
                            <Typography style={{ position: 'absolute', bottom: 2, right: 5, fontSize: 10 }}>{formatDate(message.createdAt)}</Typography>
                        </Time3>
                    </Pdf>
                    :
                    <>
                        <img style={{ width: 400, height: '100%', objectFit: 'cover', borderRadius: '10px' }} src={message.text} alt={message.text} />
                        <Time2 style={{ position: 'absolute', bottom: 0, right: 3, color: '#919191' }}>
                            {formatDate(message.createdAt)}
                        </Time2>
                    </>
            }
        </Box>
    )
}
const TextMessage = ({ message }) => {
    return (
        <>
            <Text>{message.text}</Text>
            <Time style={{ color: '#919191' }}>{formatDate(message.createdAt)}</Time>
        </>
    )
}
export default Message
