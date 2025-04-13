import React, { useEffect, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  StarButton,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import bot from "../images/bot.png"
import userimg from "../images/avtaar.png";
import { useNavigate } from "react-router-dom";

const Chat = ({ userName }) => {
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const name = userName;
  const navigate = useNavigate()

  const handlemessage = (message) => {
    setChat(message);
    const chatobj = { message: message, sender: userName };
    setChats((prev) => [...prev, chatobj]);
    // Bot();
  };

  useEffect(() => {
    Bot();
  }, [chat]);

  const Bot = async () => {
    const botId = 165;
    const applicationId =  660654498894016600;
    const userMessage = chat;
    const xml = `<chat application='${applicationId}' instance='${botId}'><message>${userMessage}</message></chat>`;

    try {
      const response = await axios.post(
        "https://www.botlibre.com/rest/api/chat",
        xml,
        {
          headers: {
            "Content-Type": "application/xml",
          },
        }
      );
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "application/xml");
      const botmessage = xmlDoc.getElementsByTagName("message")[0].textContent;
      const botobj = { message: botmessage, sender: "Bot" };
      setChats((prev) => [...prev, botobj]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ position: "relative", width: "80vw", marginTop:"-100px", height: "600px" }}>
       <ConversationHeader>
          <ConversationHeader.Back onClick={()=>{navigate('/')}} />
          <Avatar
            name="Priyanshu"
            src={bot}
          />
          <ConversationHeader.Content
            info="Active Now"
            userName="Priyanshu"
          />
          <ConversationHeader.Actions>
            <StarButton title="Add to favourites" />
            <VoiceCallButton title="Start voice call" />
            <VideoCallButton title="Start video call" />
            <InfoButton title="Show info" />
          </ConversationHeader.Actions>
        </ConversationHeader>
      <MainContainer>
       
        <ChatContainer>
          <MessageList>
            {chats.map((msg, index) => (
              <Message
                key={index}
                model={{
                  message: msg.message,
                  sentTime: "just now",
                  sender: msg.sender,
                  direction: msg.sender === "Bot" ? "incoming" : "outgoing",
                }}
              >
                <Avatar src={msg.sender === "Bot" ? bot : userimg} />
              </Message>
            ))}
          </MessageList>
          <MessageInput
            onSend={handlemessage}
            placeholder="Type message here"
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
