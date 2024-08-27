import React, { useState } from 'react';
import { CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fakeRegister = async (userData: { email: string; password: string; address: string }) => {
    
    console.log('Enviando dados para o backend:', userData);
 
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  };

  const handleConfirmAddress = () => {
    if (street && number) {
      setAddressConfirmed(true);
    } else {
      alert('Por favor, preencha todos os campos de endereço.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressConfirmed) {
      alert('Por favor, confirme o endereço antes de prosseguir.');
      return;
    }

    const address = `${street}, ${number}`;
    const userData = { email, password, address };

    try {
      const success = await fakeRegister(userData);
      if (success) {
        navigate('/login');
      } else {
        alert('Falha ao registrar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <Link to="/login" style={styles.backButton}>Voltar</Link>
      <Link to="/" style={styles.homeButton}>Home</Link>
      
      <div style={styles.container}>
        <h2 style={styles.title}>Registrar</h2>
        
        {!addressConfirmed ? (
          <>
            <input 
              type="text" 
              placeholder="Rua" 
              style={styles.input} 
              required 
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Número" 
              style={styles.input} 
              required 
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <button type="button" style={styles.button} onClick={handleConfirmAddress}>
              Confirmar Endereço
            </button>
          </>
        ) : (
          <>
            <p style={styles.confirmationMessage}>Endereço confirmado: {street}, {number}</p>
            <form style={styles.form} onSubmit={handleRegister}>
              <input 
                type="email" 
                placeholder="Email" 
                style={styles.input} 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Senha" 
                style={styles.input} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" style={styles.button}>Cadastrar-se</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url(/5525735.jpg)',
    backgroundSize: 'cover',
    position: 'relative',
  },
  container: {
    backgroundColor: '#46B2B5',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  button: {
    padding: '10px',
    backgroundColor: '#8FD5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '50%',
  },
  backButton: {
    position: 'fixed',
    top: '10px',
    left: '10px',
    color: '#ffffff',
    textDecoration: 'none',
    backgroundColor: '#46B2B5',
    padding: '5px 10px',
    borderRadius: '4px',
  },
  homeButton: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    color: '#ffffff',
    textDecoration: 'none',
    backgroundColor: '#46B2B5',
    padding: '5px 10px',
    borderRadius: '4px',
  },
};

export default Register;
