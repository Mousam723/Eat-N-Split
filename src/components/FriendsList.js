import React from "react";
import Friend from "./Friend";

export default function FriendsList({ friends, onSelection, selectedFriends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriends={selectedFriends}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}
