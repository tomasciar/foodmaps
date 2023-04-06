import Link from 'next/link';

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
      <Link href='/menu' style={styles.item}>
        menu
      </Link>
      <Link href='/coupons' style={styles.item}>
        coupons
      </Link>
      <Link href='/about' style={styles.item}>
        about
      </Link>
      <Link href='/blog' style={styles.item}>
        blog
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
    paddingLeft: '4rem'
  },

  logo: {
    color: '#d94640',
    fontSize: 30,
    fontFamily: 'Inter',
    fontWeight: 900,
    textDecoration: 'none'
  },

  item: {
    color: '#444',
    fontFamily: 'Inter',
    fontWeight: 500,
    textDecoration: 'none'
  }
};
