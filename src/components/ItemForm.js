import React, { useState } from "react";


//Our next goal will be to add a new item to our database on the server when a user submits the form.
//Mind map of this goal is:
//When a user submits the form= event X
//Make Y fetch request (POST /items with the new item data)
//Update Z state (add a new item to state)


function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
  
  
  //Adding a function to handle our submissions.
  function handleSubmit(e){
    e.preventDefault();

    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };
    
    const postItem = ()=>{
      fetch("http://localhost:4000/items",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(itemData),
      })
      .then(resp => resp.json())
      .then(item => onAddItem(item))
    }

    postItem()
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;