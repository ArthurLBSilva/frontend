import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import iceCreamLogo from '/public/3198644.png';
import { CSSProperties } from 'react';


const Header: React.FC = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const handleLogout = () => {
    
    localStorage.removeItem('loggedInUser');
    
    
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <img src={iceCreamLogo} alt="Ice Cream Logo" style={styles.logo} />
        Mr. Sorvetes
      </div>
      <div style={styles.right}>
        {loggedInUser ? (
          <>
            <Link to="/carrinho" style={styles.option}>Ver Carrinho</Link>
            {loggedInUser === 'admin@example.com' && (
              <Link to="/admin" style={styles.option}>Admin</Link>
            )}
            <div style={styles.option} onClick={handleLogout}>
              Log Out
            </div>
          </>
        ) : (
          <Link to="/login" style={styles.option}>Login</Link>
        )}
      </div>
    </header>
  );
};

const styles: { [key: string]: CSSProperties } = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    width: '100%',
    position: 'fixed',
    left: 0,
  },
  left: {
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px', 
  },
  logo: {
    width: '40px', 
    height: '40px',
  },
  right: {
    display: 'flex',
    gap: '15px',
  },
  option: {
    padding: '5px 10px',
    border: '1px solid #fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Header;
