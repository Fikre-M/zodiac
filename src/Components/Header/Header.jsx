import React from "react";
import { motion } from "framer-motion";
import styles from "./Header.module.css";


const Header = () => {
  return (

    <section className={styles.headerSection}>
      <nav className={styles.navContainer}>
        <motion.div
          className={styles.logo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className={styles.logoPart}>K</span>
          <span className={styles.sixPointedStar}></span>
          <span className={styles.logoPart}>KEBI</span>
        </motion.div>

        <div className={styles.navLinks}>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/how-it-works">How it works</a>
          <a href="/links">Links...</a>
          <a href="/links">Show me</a>
        </div>
      </nav>
    </section>

  );
};

export default Header;
