import React from 'react';
import { useContext, useState, useEffect, useRef } from 'react';
import { Box, styled, Typography, CircularProgress } from '@mui/material'; //ch ty ci
import LockIcon from '@mui/icons-material/Lock'; //ch
import Footer from './Footer';
import { AccountContext } from '../../../context/AccountProvider';
import { newMessages } from '../../../services/api';
import { getMessages } from '../../../services/api';
import Message from './Message';
import { formatDatee } from '../../../utils/common.utils'; // Import formatDate and formatDatee functions
import axios from 'axios';

import Popup from './Popup';

const Wrapper = styled(Box)`
    background-color: #F7F9F9;
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 82vh;
    overflow-y: scroll;
    position: relative;
`;

const EncrpBox = styled(Box)`
    position: relative;
    width: 100%;
    height: 85px;
    top: 0;
    z-index: 1;
    ${'' /* background-color: #000;  */}
    margin-bottom: 7px;
`;

const EncrpContainer = styled(Box)`
    position: absolute;
    top: 0;
    left: 20%;
    background-color: #ededed;
    margin-top: 5px;
    width: 60%;
    border-radius: 10px;
    text-align: center;
    z-index: 2;
`;

const EncrpText = styled(Typography)`
    margin: 0;
    padding: 10px;
`;

const Container = styled(Box)`
    padding: 0 65px 1px;
`;

const LoaderContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const DateBox = styled(Box)`
    position: absolute;
    left: 50%; /* Center the DateBox horizontally */
    transform: translateX(-50%); /* Adjust the position to the middle */
    background-color: #ededed;
    margin-top: 5px;
    width: fit-content;
    border-radius: 10px;
    text-align: center;
    z-index: 2;
    padding: 3px 7px;
`;

const DateBoxMain = styled(Box)`
    position: relative;
    width: 100%;
    height: 35px;
    ${'' /* background-color: #000; */}
    z-index: 1;
    margin-top: 7px;
    margin-bottom: 7px;
`;

// const StyledFooter = styled(Box)`
//     height: 55px;
//     background: #ededed;
//     // position: absolute;
//     width: 100%;
//     // bottom: 0
// `;

const Messages = ({ person, conversation }) => {

    const [value, setValue] = useState();
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState();
    const [image, setImage] = useState('');
    const scrollRef = useRef();
    const [incomingMessage, setIncomingMessage] = useState(null);

    const [uploading, setUploading] = useState(false); //ch
    const [showPopup, setShowPopup] = useState(false); //ch

    const { account, newMessageFlag, setNewMessageFlag, socket } = useContext(AccountContext);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, [socket])

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation?._id); //dont change this, it is perfect 
            setMessages(data);
        };
        getMessageDetails();
    }, [conversation?._id, person._id, newMessageFlag]); //dont change this, it is perfect 

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: 'smooth' })
    }, [messages]);

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
            setMessages((prev) => [...prev, incomingMessage]);

    }, [incomingMessage, conversation]);


    const sendText = async (e) => {
        const code = e.keyCode || e.which;

        if (code === 13) {
            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                };
            } else {
                message = {
                    senderId: account.sub,
                    conversationId: conversation._id,
                    receiverId: person.sub,
                    type: 'file',
                    text: image
                };
            }

            socket.current.emit('sendMessage', message);

            await newMessages(message);
            setValue('');
            setFile('');
            setImage('');
            setNewMessageFlag(prev => !prev);
        }
    };
    // -------------------------------------------------------------------------------------------------------
    const handleFileUpload = async () => {
        // Set uploading state to true when file upload starts
        setUploading(true);

        try {
            const formData = new FormData(); // Create FormData object to append file
            formData.append('file', file); // Append the file to the FormData object

            // Make a POST request to upload the file
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set Content-Type header to multipart/form-data
                }
            });

            // Once upload is complete, handle the response
            if (response.status === 200) {
                // If upload is successful, get the image URL from the response
                const imageUrl = response.data;
                console.log('File uploaded successfully:', imageUrl);

                // Here you can do something with the imageUrl if needed, such as displaying it in your UI
                setImage(imageUrl);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }

        // Once upload is complete or failed, set uploading state back to false
        setUploading(false);
    };
    // -------------------------------------------------------------------------------------------------------



    return (
        <Wrapper>
            <Component>
                <EncrpBox>
                    <EncrpContainer>
                        <EncrpText><LockIcon fontSize='small' />Messages are end-to-end encrypted. No one outside of this chat, not even SwiftChat, can read or listen to them.
                        <span onClick={togglePopup}><b> Click to learn more.</b> </span>
                        </EncrpText>
                    </EncrpContainer>
                </EncrpBox>
                {showPopup && <Popup closePopup={togglePopup} />}
                {
                    uploading ? (
                        <LoaderContainer>
                            <CircularProgress />
                        </LoaderContainer>
                    )
                        :
                        (
                            <>
                                {
                                    messages && messages.slice(1).map((message, index) => (
                                        <Container ref={scrollRef} key={message._id}>
                                            {(index === 0 || formatDatee(message.createdAt) !== formatDatee(messages[index].createdAt)) && (
                                                <DateBoxMain>
                                                    <DateBox>
                                                        <Typography>
                                                            {formatDatee(message.createdAt) === formatDatee(new Date()) ? 'Today' :
                                                                formatDatee(message.createdAt) === formatDatee(new Date(new Date().setDate(new Date().getDate() - 1))) ? 'Yesterday' :
                                                                    formatDatee(message.createdAt)}
                                                        </Typography>
                                                    </DateBox>
                                                </DateBoxMain>
                                            )}
                                            <Message message={message} />
                                        </Container>
                                    ))
                                }
                            </>
                        )
                }
            </Component>
            <Footer
                sendText={sendText}
                value={value}
                setValue={setValue}
                file={file}
                setFile={setFile}
                setImage={setImage}
                handleFileUpload={handleFileUpload}
            />
        </Wrapper>
    );
};

export default Messages;
