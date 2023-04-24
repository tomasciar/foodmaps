import Link from 'next/link';
import React from 'react';

/**
 * @component Navbar
 * @returns {React.FC}
 */
const Navbar: React.FC = () => {
  return (
    <div style={styles.nav}>
      <Link href='/' style={styles.logo}>
        foodmaps
      </Link>
      <Link href='/search' style={styles.item}>
        search
      </Link>
      <Link href='/coupons' style={styles.item}>
        coupons
      </Link>
      <Link href='/tips&tricks' style={styles.item}>
        tips & tricks
      </Link>
    </div>
  );
};

export default Navbar;

const styles = {
  nav: {
    width: '100%',
    height: '7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: '3.25rem',
    paddingLeft: '4rem',
    flexWrap: 'wrap'
  },

  logo: {
    color: '#d94640',
    fontSize: 30,
    fontWeight: 900,
    textDecoration: 'none'
  },

  item: {
    color: '#444',
    fontWeight: 500,
    textDecoration: 'none'
  }
};
