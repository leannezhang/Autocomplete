import React, { useState, useMemo, useCallback } from "react";
import { getFood } from "./foodapi";
import { debounce } from "./debounce";

const SearchList = ({ resultList, handleResultItemOnClick }) => {
  console.log(resultList); // why is this always rerender twice?

  const searchList = resultList.map((item, index) => {
    return (
      <li className="searchItem" key={index} onClick={handleResultItemOnClick}>
        {item}
      </li>
    );
  });
  return (
    <ul id="search-result" className="searchResult">
      {searchList}
    </ul>
  );
};

const MemoizedSearchList = React.memo(SearchList);

export const SearchBar = ({ handleSearchItemOnClick }) => {
  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const handleSearch = (searchItem) => {
    getFood(searchItem)
      .then((data) => {
        setResultList(data);
      })
      .catch(() => {
        setResultList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // useMemo prevent it from fetch from mutiple times
  // https://stackoverflow.com/questions/55616536/lodash-debounce-in-react-functional-component-not-working
  const optimizedDebounceFetch = useMemo(
    () => debounce(handleSearch, 1000),
    []
  );

  const handleSearchInput = useCallback(
    (event) => {
      const searchInput = event.target.value;
      setSearchItem(searchInput);
      if (searchInput.length >= 2) {
        optimizedDebounceFetch(searchInput);
      } else {
        setResultList([]);
      }
    },
    [optimizedDebounceFetch]
  );

  const handleResultItemOnClick = useCallback(
    (event) => {
      handleSearchItemOnClick(event.target.innerText);
      setResultList([]);
      setSearchItem("");
    },
    [setResultList, setSearchItem, handleSearchItemOnClick]
  );

  const handleClearSearchInput = () => {
    setSearchItem("");
    setResultList([]);
  };

  return (
    <div className="SearchContainer">
      <div>
        <input
          className="searchBar"
          name="searchBar"
          placeholder="search.."
          onChange={handleSearchInput}
          value={searchItem}
        ></input>
        <button onClick={handleClearSearchInput}>x</button>
      </div>
      {!loading && resultList.length > 0 ? (
        <MemoizedSearchList
          resultList={resultList}
          handleResultItemOnClick={handleResultItemOnClick}
        />
      ) : null}
    </div>
  );
};
