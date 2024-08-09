import React from "react";
import Friend from "./Friend";

export default function FriendsList({ friends, selectedFriends, onSelection, currentUserId }) {
  return (
    <ul className="friends-list">
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriends={selectedFriends}
          onSelection={onSelection}
          currentUserId={currentUserId}
        />
      ))}
    </ul>
  );
}
