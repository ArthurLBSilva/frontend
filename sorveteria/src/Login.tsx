import React, { useState } from 'react';
import { CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const authenticateUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      
      // Supondo que a resposta do backend contenha um campo 'authenticated' que indica sucesso
      return result.authenticated;
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      return false;
    }
  };
  

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (fakeAuth(email, password)) {
 
      localStorage.setItem('loggedInUser', email);

      if (email === 'admin@example.com') { 
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      alert('Email ou senha incorretos.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <Link to="/" style={styles.backButton}>Voltar</Link>
      <Link to="/register" style={styles.registerButton}>Cadastrar-se</Link>
      
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>
        <form style={styles.form} onSubmit={handleLogin}>
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
          <button type="submit" style={styles.button}>Logar-se</button>
        </form>
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
  registerButton: {
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

export default Login;
