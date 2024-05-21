import React, { useState, useRef } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [open, setOpen] = useState(false); // Estado para controlar a abertura do seletor de emojis
  const [text, setText] = useState(""); // Estado para armazenar o texto da mensagem
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
  const inputFileRef = useRef(null); // Referência para o input file

  // Manipulador de eventos para selecionar um emoji
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  // Função para enviar uma mensagem de texto
  const sendMessage = () => {
    if (text.trim() !== "") {
      const newMessage = {
        text: text,
        sender: "Me", // Defina o remetente como "Me" por enquanto
        timestamp: new Date().toISOString(), // Adiciona um timestamp à mensagem
      };
      setMessages([...messages, newMessage]); // Adiciona a nova mensagem à lista de mensagens
      setText(""); // Limpa o campo de entrada após o envio da mensagem
    }
  };

  // Função para lidar com o envio de uma imagem
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Obtém o arquivo de imagem do input file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMessage = {
          image: reader.result, // Define a imagem como base64
          sender: "Me", // Defina o remetente como "Me" por enquanto
          timestamp: new Date().toISOString(), // Adiciona um timestamp à mensagem
        };
        setMessages([...messages, newMessage]); // Adiciona a nova mensagem à lista de mensagens
      };
      reader.readAsDataURL(file); // Lê o arquivo como base64
    }
  };

  // Função para abrir o seletor de arquivo ao clicar na imagem
  const openFileSelector = () => {
    inputFileRef.current.click(); // Aciona o clique no input file
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Broken</span>
            <p>Lorem Ipsum is simply dummy</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {/* Mapeia e exibe todas as mensagens */}
        {messages.map((message, index) => (
          <div className={"message " + (message.sender === "Me" ? "own" : "")} key={index}>
            {message.sender !== "Me" && <img src="avatar.png" alt="" />}
            <div className="texts">
              {message.text && <p>{message.text}</p>}
              {message.image && <img src={message.image} alt="" />} {/* Exibe a imagem se existir */}
              <span>{message.timestamp}</span>
            </div>
            {message.sender === "Me" && <img src="avatar.png" alt="" />}
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="img.png" alt="" onClick={openFileSelector} /> {/* Adiciona o manipulador de eventos ao clicar na imagem */}
          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <img src="camera.png" alt="" />
          <img src="mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {if (e.key === 'Enter') sendMessage()}}
        />
        <div className="emoji">
          <img
            src="emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendbutton" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
