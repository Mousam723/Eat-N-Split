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
    balance: 0,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 0,
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
  const [showRemoveFriendForm, setShowRemoveFriendForm] = useState(false);

  const currentUser = {
    id: "self", // Unique identifier for yourself
    name: "You", // Your name
  };

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

  function handleSplitBill({ shares, totalBill, whoPaid }) {
    const totalShares = Object.values(shares).reduce((sum, share) => sum + Number(share), 0);
    const totalAmount = Number(totalBill);

    if (totalShares === 0 || totalAmount === 0) return;

    const updatedFriends = friends.map((friend) => {
        const share = shares[friend.id] || 0;
        const amountOwed = Number(share);
        if (friend.id === whoPaid) {
            // If the current user is paying the bill
            return { ...friend, balance: (friend.balance || 0) + (totalAmount - amountOwed) };
        } else if (selectedFriends.some((f) => f.id === friend.id)) {
            // If the friend is in the selected list
            return { ...friend, balance: (friend.balance || 0) + amountOwed };
        } else {
            return friend;
        }
    });

    

    setFriends(updatedFriends);
    setSelectedFriends([]);
    setShowSplitBillForm(false);
  }


  function resetForm() {
    setSelectedFriends([]);
    setShowSplitBillForm(false);
  }

  function resetBalances() {
    setFriends((friends) =>
      friends.map((friend) => ({
        ...friend,
        balance: 0,
      }))
    );
  }
  
  function toggleSplitBillForm() {
    setShowSplitBillForm((prev) => !prev);
  }

  function handleShowRemoveFriend() {
    setShowRemoveFriendForm((show) => !show);
  }

  function handleRemoveFriend(friend) {
    setFriends((friends) => friends.filter((f) => f.id !== friend.id));
    setShowRemoveFriendForm(false);
  }

  // const filteredFriends = friends.filter(friend => friend.id !== currentUserId || !showSplitBillForm || friends.some(f => f.id === currentUserId && f.balance !== 0));

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
            currentUserId={currentUser.id}
          />

          {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
          {showRemoveFriendForm && (
            <div className="remove-friend-form">
              <h2>Select a friend to remove:</h2>
              {friends.map((friend) => (
                <Button key={friend.id} onClick={() => handleRemoveFriend(friend)}>
                  Remove {friend.name}
                </Button>
              ))}
              <Button onClick={handleShowRemoveFriend}>Cancel</Button>
            </div>
          )}

          <div className="button-container">
            <Button onClick={handleShowAddFriend}>
              {showAddFriend ? "Close" : "Add friend"}
            </Button>
            <Button onClick={toggleSplitBillForm}>
              {showSplitBillForm ? "Close Split Bill" : "Split Bill"}
            </Button>
            <Button onClick={resetBalances} className="reset-balances-button">
              Reset All Balances
            </Button>
            <Button onClick={handleShowRemoveFriend}>
              {showRemoveFriendForm ? "Close Remove Friend" : "Remove Friend"}
            </Button>
          </div>
        </div>

        {showSplitBillForm && (
          <FormSplitBill
            selectedFriends={selectedFriends}
            onSplitBill={handleSplitBill}
            resetForm={resetForm}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
}
