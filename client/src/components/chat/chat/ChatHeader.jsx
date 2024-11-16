import { useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';

import { AccountContext } from '../../../context/AccountProvider';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Header = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;

const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 22px;
        color: #000;
    }
`;

const Status = styled(Typography)`
    font-size: 12px !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 12px !important;
`;

const ChatHeader = ({ person }) => {

    const url = person.picture;

    const { activeUsers } = useContext(AccountContext);

    const isActiveUser = activeUsers?.find(user => user.sub === person.sub);

    return (
        <Header>
            <Box style={{ display: 'flex', position: 'absolute', width: 45 }}>
                <Box>
                    <Image src={url} alt="display picture" />
                </Box>
                {isActiveUser && (
                    <Box style={{ display: 'flex', position: 'absolute', right: 0, bottom: 5 }} >
                        <FiberManualRecordIcon fontSize='small' style={{ color: 'green' }} />
                    </Box>
                )}
            </Box>
            <Box style={{ marginLeft: 40}}>
                <Name>{person.name}</Name>
                <Status>{isActiveUser ? 'Online' : 'Offline'}</Status>
            </Box>
            <RightContainer>
                <Search />
                <MoreVert />
            </RightContainer>
        </Header>
    )
}

export default ChatHeader;