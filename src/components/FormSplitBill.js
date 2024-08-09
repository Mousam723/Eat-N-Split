import React, { useState, useEffect} from "react";
import Button from "./Button";
import "./FormSplitBill.css"; // Ensure you import the CSS file

export default function FormSplitBill({ selectedFriends, onSplitBill,resetForm, currentUser}) {
  const [bill, setBill] = useState("");
  const [shares, setShares] = useState(() =>
    selectedFriends.reduce((acc, friend) => {
      acc[friend.id] = 0; // Initialize each friend's share to 0
      return acc;
    }, {})
  );

  const [whoPaid, setWhoPaid] =useState(currentUser.id);

  useEffect(() => {
    // Update shares state when selectedFriends changes
    setShares((prevShares) =>
      selectedFriends.reduce((acc, friend) => {
        if (!prevShares[friend.id]) {
          acc[friend.id] = 0;
        }
        return acc;
      }, { ...prevShares })
    );
  }, [selectedFriends]);


  const totalShares = Object.values(shares).reduce((sum, share) => sum + Number(share), 0);

  function handleChange(e, friendId) {
    setShares((prevShares) => ({
      ...prevShares,
      [friendId]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || totalShares === 0 ) return;
    onSplitBill({ shares, totalBill: Number(bill), whoPaid });
  }

  function handleReset() {
    setBill("");
    setShares(
      selectedFriends.reduce((acc, friend) => {
        acc[friend.id] = 0;
        return acc;
      }, {})
    );
    setWhoPaid(currentUser.id);
    resetForm();
  }

  return (
    <>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a bill with {selectedFriends.length} friends</h2>

        <label htmlFor="bill">💰 Bill value</label>
        <input
          id="bill"
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />

        {selectedFriends.map((friend) => (
          <div key={friend.id} className="share-input">
            <label htmlFor={`share-${friend.id}`}>
              {friend.name}'s share
            </label>
            <input
              id={`share-${friend.id}`}
              type="number"
              value={shares[friend.id]}
              onChange={(e) => handleChange(e, friend.id)}
            />
          </div>
        ))}
        
        <label htmlFor="who-paid">🧾 Who paid the bill</label>
        <select
          id="who-paid"
          value={whoPaid}
          onChange={(e) => setWhoPaid(e.target.value)}
        >
          {selectedFriends.map((friend) => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
          <option value={currentUser.id}>{currentUser.name}</option>
        </select>

        <Button>Split bill</Button>
        <Button type="button" onClick={handleReset} className="reset-button">Reset</Button>
      </form>
    </>
  );
}
