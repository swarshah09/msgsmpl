import Conversation from "../model/Conversation.js";

export const newConversation = async (request, response) => {
    let senderId = request.body.senderId;
    let receiverId = request.body.receiverId;

    const exist = await Conversation.findOne({ members: { $all: [receiverId, senderId]  }})
    
    if(exist) {
        return response.status(200).json('conversation already exists');
    }
    const newConversation = new Conversation({
        members: [senderId, receiverId]
    });

    try {
        const savedConversation = await newConversation.save();
        response.status(200).json("conversation saved successfully", savedConversation);
    } catch (error) {
        response.status(500).json(error.message);
    }

}

export const getConversation = async (request, response) => {
    let senderId = request.body.senderId;
    let receiverId = request.body.receiverId;
    try {
        const conversation = await Conversation.findOne({ members: { $all: [receiverId, senderId] }});
        response.status(200).json(conversation);
    } catch (error) {
        response.status(500).json(error.message);
    }

}