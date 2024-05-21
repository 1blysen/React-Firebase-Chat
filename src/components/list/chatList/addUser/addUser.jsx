import React, { useState } from "react";
import "./addUser.css";
import { db } from "../../../../lib/firebase";
import { collection, query, where, getDocs, updateDoc, serverTimestamp, doc, setDoc } from "firebase/firestore"; 
import { arrayUnion } from "firebase/firestore/lite";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    if (!user) return; // Ensure user exists before proceeding
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, { 
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: new Date(), 
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: new Date(), 
        }),
      });

      console.log(newChatRef.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user" key={user.id}>
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button> 
        </div>
      )}
    </div>
  );
};

export default AddUser;
