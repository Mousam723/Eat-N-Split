import React, { useState, useEffect } from "react";
import Button from "./Button";
import FriendsList from "./FriendsList";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";
import logo from "../assets/Eat-N-Split.png";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(() => {
    const savedFriends = localStorage.getItem("friends");
    return savedFriends ? JSON.parse(savedFriends) : initialFriends;
  });

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [showSplitBillForm, setShowSplitBillForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriends((prevSelected) =>
      prevSelected.some((f) => f.id === friend.id)
        ? prevSelected.filter((f) => f.id !== friend.id)
        : [...prevSelected, friend]
    );
  }

  function handleSplitBill(value) {
    const totalFriends = selectedFriends.length;
    if (totalFriends === 0) return;

    const amountPerFriend = value / totalFriends;
    setFriends((friends) =>
      friends.map((friend) =>
        selectedFriends.some((f) => f.id === friend.id)
          ? { ...friend, balance: friend.balance + amountPerFriend }
          : friend
      )
    );
    setSelectedFriends([]);
    setShowSplitBillForm(false);
  }
  
  function toggleSplitBillForm() {
    setShowSplitBillForm((prev) => !prev);
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1>Eat and Split</h1>
      </header>
      <div className="content">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            selectedFriends={selectedFriends}
            onSelection={handleSelection}
          />

          {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

          <Button onClick={handleShowAddFriend}>
            {showAddFriend ? "Close" : "Add friend"}
          </Button>
          <Button onClick={toggleSplitBillForm}>
           {showSplitBillForm ? "Close Split Bill" : "Split Bill"}
          </Button>
        </div>

        {showSplitBillForm && (
          <FormSplitBill
            selectedFriends={selectedFriends}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
}
