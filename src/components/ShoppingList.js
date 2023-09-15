import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  const fetchItems = ()=>{
    fetch("http://localhost:4000/items")
    .then(resp=>resp.json())
    .then(items=> {
      setItems(items)
    })
  }

  //Adding a useEffect hook to initiate our fetch request.
  // Update state by passing the array of items to setItems 


  //mind map of events:
  //-When X event occurs, the useEffect hook is used to trigger a SIDE EFFECT in the ShoppingList component. 
  //-This is after the component first renders.
  //-then make Y ie fetch request to retrieve items list.
  //-then we need to update a Z state so as to replace our original list with our new list.


  useEffect(
    ()=>fetchItems(),
    []
  )

  function handleAddItem(newItem){
    setItems([...items,newItem])
  }

  function handleUpdateItem(updatedItem) {

    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems)
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;