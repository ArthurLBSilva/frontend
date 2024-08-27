import React from 'react';
import { CSSProperties } from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2024 Mr. Sorvetes. Todos os direitos reservados.</p>
      <p style={styles.text}>Contato: contato@mrsorvetes.com</p>
    </footer>
  );
};

const styles: { [key: string]: CSSProperties } = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    backgroundColor: '#333',
    color: '#fff',
    width: '100%',
    boxSizing: 'border-box',
    position: 'absolute',
    bottom: -80, 
    left: 0, 
    right: 0, 
  },
  text: {
    margin: '5px 0',
  },
};

export default Footer;
