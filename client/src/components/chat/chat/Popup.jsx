import React from 'react';
import './popup.css';
import { styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import emptyChatImg from '../../../assets/download.png'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

const Image = styled('img')({
    marginTop: 30,
    width: 300
})

class Popup extends React.Component {
    render() {
        return (
            <div className="popup">
                <div className="popup-content">
                    <span className="close-btn" onClick={this.props.closePopup}><CloseIcon/></span>
                    <Image src={emptyChatImg} alt="empty" />
                    <h2>Your chats and calls are private</h2>
                    <p>End-to-end encryption keeps your personal messages and calls between you and the people you choose. Not even WhatsApp can read or listen to them. This includes your:</p>
                    <p><QuestionAnswerOutlinedIcon className='icons' fontSize='small'/>Text and voice messages</p>
                    <p><AttachFileOutlinedIcon className='icons' fontSize='small'/>Photos, videos and documents</p>
                    <p><DonutLargeIcon className='icons' fontSize='small'/>Status updates</p>
                </div>
            </div>
        );
    }
}

export default Popup;
