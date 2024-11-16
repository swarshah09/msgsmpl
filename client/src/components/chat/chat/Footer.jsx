import React, { useState, useEffect } from 'react'; //change
import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import { uploadFile } from '../../../services/api';

import CircularProgress from '@mui/material/CircularProgress'; //ch
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; //ch


const Container = styled(Box)`
    height: 63px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg)
`;

const Footer = ({ sendText, setValue, value, file, setFile, setImage }) => {

    const [uploading, setUploading] = useState(false); // State for tracking file upload status
    const [showTick, setShowTick] = useState(false); // State for showing the tick sign
    const [showMic, setShowMic] = useState(true); // State for showing the Mic icon

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                setUploading(true); // Set uploading state to true when file upload starts
                setShowMic(false); 
                    const data = new FormData();
                    data.append("name", file.name);
                    data.append("file", file);

                    const response = await uploadFile(data);
                    console.log(response);
                    setImage(response.data);

                    setUploading(false);
                    // Show tick sign for 2 seconds
                    setShowTick(true);
                    setTimeout(() => {
                        setShowTick(false);
                    }, 2000);
                    // Show Mic icon again after upload is complete
                    setShowMic(true);
            }
        };
        getImage(); //usne bola ki yaha pe setImage hona chahiye tha prr thike 
    }, [file, setImage]);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setValue(e.target.files[0].name);
    };

    return (
        <Container>
            <EmojiEmotions/>
            <label htmlFor="fileInput">
                <ClipIcon />
            </label>
            <input
                type='file'
                id="fileInput"
                style={{ display: 'none' }}
                onChange={(e) => onFileChange(e)}
            />


            <Search>
                <InputField
                    placeholder="Type a message"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => sendText(e)}
                    value={value}
                />
            </Search>
            {uploading ? (
                <CircularProgress color="inherit"/> // Display loader while uploading
            ) : (
                showTick ? <CheckCircleIcon /> : null // Display tick sign when upload is complete
            )}
            {showMic && <Mic />} {/* Show Mic icon */}
        </Container>
    );
};

export default Footer;
