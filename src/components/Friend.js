import React from "react";
import Button from "./Button";

export default function Friend({ friend, onSelection, selectedFriends, currentUserId }) {
  const isSelected = selectedFriends.some((f) => f.id === friend.id);
  const isCurrentUser = friend.id === currentUserId;

  let balanceMessage = null;

  if (!isCurrentUser) {
    if (friend.balance < 0) {
      balanceMessage = (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      );
    } else if (friend.balance > 0) {
      balanceMessage = (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      );
    } else {
      balanceMessage = <p>You and {friend.name} are even</p>;
    }
  }

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {!isCurrentUser && balanceMessage}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Deselect" : "Select"}
      </Button>
    </li>
  );
}
