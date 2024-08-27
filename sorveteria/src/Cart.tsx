import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IceCreamItem {
  id: number;
  name: string;
  price: string;
  weight: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<IceCreamItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
   
    const cart: IceCreamItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);

  
    const total = cart.reduce((sum: number, item: IceCreamItem) => {
      const price = item.price ? parseFloat(item.price.replace('R$', '').replace(',', '.').trim()) : 0;
      return sum + price;
    }, 0);

    setTotalPrice(total);
  }, []);

  const handleCheckout = () => {
    alert('Compra finalizada com sucesso!');

    
    localStorage.removeItem('cart');
    setCartItems([]);
    setTotalPrice(0);

   
    navigate('/');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <button onClick={handleGoBack} style={styles.backButton}>
        ← Voltar
      </button>
      <h2 style={styles.title}>Carrinho</h2>
      {cartItems.length === 0 ? (
        <p style={styles.emptyMessage}>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Sabor</th>
                <th style={styles.tableHeader}>Calda</th>
                <th style={styles.tableHeader}>Peso</th>
                <th style={styles.tableHeader}>Valor</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const [flavor, topping] = item.name?.split(' com ') || ["", ""];
                return (
                  <tr key={item.id}>
                    <td style={styles.tableCell}>{flavor || 'Indefinido'}</td>
                    <td style={styles.tableCell}>{topping || 'Indefinido'}</td>
                    <td style={styles.tableCell}>{item.weight || 'Indefinido'}</td>
                    <td style={styles.tableCell}>{item.price || 'Indefinido'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p style={styles.totalPrice}>Valor Total: R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
          <button onClick={handleCheckout} style={styles.button}>Finalizar Compra</button>
        </div>
      )}
    </div>
  );
};



const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      position: 'relative',
      minHeight: '100vh',
      backgroundImage: 'url(/fundo2.jpg)', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    backButton: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007BFF',
      color: '#FFF',
      border: 'none',
      cursor: 'pointer',
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#FFF', 
    },
    emptyMessage: {
      fontSize: '18px',
      color: '#FFF', 
    },
    table: {
      width: '100%', 
      borderCollapse: 'collapse',
      marginBottom: '20px',
      borderRadius: '12px',
      backgroundColor: 'rgba(49, 48, 48, 0.8)', 
    },
    tableHeader: {
      borderBottom: '2px solid #ddd',
      padding: '45px', 
      textAlign: 'left',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    tableCell: {
      borderBottom: '1px solid #ddd',
      padding: '15px', 
      fontSize: '16px',
    },
    totalPrice: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#FFF',
      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
      padding: '10px 20px',
      borderRadius: '8px', 
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007BFF',
      color: '#FFF',
      border: 'none',
      cursor: 'pointer',
    },
  };
  
export default Cart;
