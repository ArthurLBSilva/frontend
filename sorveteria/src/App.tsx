import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MakeYourIceCream from './MakeYourIceCream';
import Register from './Register';
import Login from './Login';
import Cart from './Cart';
import Header from './header';
import Footer from './Footer';
import AdminPanel from './AdminPanel';
import EditarSabor from './EditarSabor';
import EditarCalda from './EditarCalda';
import EditarPesoValor from './EditarPesoValor';

function App() {
  const styles: { [key: string]: React.CSSProperties } = {
    appContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundImage: 'url(/fundo3.jpg)', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#fff', 
    },
    iceCreamBox: {
      backgroundColor: '#B88793', 
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
      maxWidth: '600px',
      width: '100%',
    },
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <div style={styles.appContainer}>
                <div style={styles.content}>
                  <h1 style={styles.title}>Faça seu PRÓPRIO Sorvete!</h1>
                  <div style={styles.iceCreamBox}>
                    <MakeYourIceCream />
                  </div>
                </div>
                <Footer />
              </div>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/editarSabor/:sabor" element={<EditarSabor />} />
        <Route path="/editarCalda/:calda" element={<EditarCalda />} />
        <Route path="/editarPeso/:peso" element={<EditarPesoValor />} />
      </Routes>
    </Router>
  );
}

export default App;
