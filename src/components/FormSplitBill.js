import React, { useState } from "react";
import Button from "./Button";
import "./FormSplitBill.css"; // Ensure you import the CSS file

export default function FormSplitBill({ selectedFriends, onSplitBill }) {
  const [bill, setBill] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || selectedFriends.length === 0) return;
    onSplitBill(Number(bill));
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

        <Button>Split bill</Button>
      </form>
    </>
  );
}
