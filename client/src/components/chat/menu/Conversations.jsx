import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { getUsers } from '../../../services/api';
import { AccountContext } from '../../../context/AccountProvider';

import { Box, styled, Divider } from '@mui/material';

import Conversation from './Conversation';

const Component = styled(Box)`
    overflow: overlay;
    height: 83.5vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Conversations = ({ text }) => {

    const [users, setUsers] = useState([]);
    const { account, socket, setActiveUsers } = useContext(AccountContext);

    useEffect(() => {
        const fetchData = async () => {
            let response = await getUsers();
            let fiteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(fiteredData);
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit("addUsers", account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        })
    }, [account, setActiveUsers, socket])

    return (
        <Component>
        {
            users && users.map((user) => (
                user.sub !== account.sub &&
                <>
                <Conversation user={user} />
                <StyledDivider />
                </>
            ))
        }
    </Component>
    )
}

export default Conversations
