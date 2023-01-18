export const ShoppingList = (props) => {
  const { items, handleRemoveShoppingItem } = props;

  const shoppingItems = items.map((item, index) => {
    return (
      <li className="shoppingItem" key={index}>
        <label>
          <input type="checkbox" />
          {item}
        </label>
        <button onClick={() => handleRemoveShoppingItem(index)}>x</button>
      </li>
    );
  });

  return (
    <ul id="shopping-list" className="shoppingList">
      {shoppingItems}
    </ul>
  );
};
