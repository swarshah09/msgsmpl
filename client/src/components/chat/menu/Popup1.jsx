import React from 'react';
import './popup1.css';
import { styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import emptyChatImg from '../../../assets/download.png'


const Image = styled('img')({
    marginTop: 30,
    width: 300
})

class Popup1 extends React.Component {
    render() {
        return (
            <div className="popup">
                <div className="popup-content">
                    <span className="close-btn" onClick={this.props.closePopup}><CloseIcon /></span>
                    <Image src={emptyChatImg} alt="empty" />
                    <h1>Important Instructions<br /> For Video Calling</h1>
                    <p>1. Click the button below to join a video call.</p>
                    <p>2. You will be provided Your ID "xyz-abc-123".</p>
                    <p>3. Tell the person with whom you want to connect<br /> to do the same and share his/her ID with you.</p>
                    <p>4. Enter the person's ID and call them.</p>
                    <a href="https://morning-escarpment-67980.onrender.com" target="_blank" rel="noopener noreferrer">
                        <button className="btn">
                            VideoCall
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}

export default Popup1;
