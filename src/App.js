import "./styles.css";

// Question:
// https://frontendeval.com/questions/shopping-list?tab=question
// Create a shopping list application that allows a user to search
// for an item, add items, check them off, and delete them
// As the user starts typing, it should hit the endpoint
// and show a list of partial matches.  Clicking an item should add it to the list.
// Author: Leanne Zhang
// My Approach:
// Create two UI components
// - search
//    - search bar & search result
//    - fetch that gets the data for me
//    - state: searchTerm, result list, loading
//    - handler: handleOnChange, debounce, handleSearchOnClick
// - shopping list todo
//    - shoppinglist
//    - handlerRemoveItem

import { useState } from "react";
import { ShoppingList } from "./ShoppingList";
import { SearchBar } from "./SearchBar";

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);

  const handleSearchItemOnClick = (selectedItem) => {
    setShoppingList([...shoppingList, selectedItem]);
  };

  const handleRemoveShoppingItem = (index) => {
    const updatedShoppingList = shoppingList.filter((item, shoppingItemKey) => {
      return shoppingItemKey !== index;
    });
    setShoppingList(updatedShoppingList);
  };

  return (
    <div className="App">
      <h1>Food Googler</h1>
      <SearchBar handleSearchItemOnClick={handleSearchItemOnClick} />
      {shoppingList.length === 0 ? null : (
        <ShoppingList
          items={shoppingList}
          handleRemoveShoppingItem={handleRemoveShoppingItem}
        />
      )}
    </div>
  );
}
