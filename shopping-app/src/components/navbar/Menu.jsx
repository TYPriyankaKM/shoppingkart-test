import React from "react";
import styles from "./navbar.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const Menu = () => {
  return (
    <div className={styles.searchBlock}>
      <div className={styles.searchContainer}>
        <input
          type="search"
          name="searchbar"
          id="searchbar"
          placeholder="Search for products brands and more"
        />
        <AiOutlineSearch />
      </div>
    </div>
  );
};

export default Menu;
