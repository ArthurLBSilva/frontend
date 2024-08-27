import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IceCreamOption {
  label: string;
  value: string;
}

interface WeightOption {
  label: string;
  value: string;
  price: string;
}

const MakeYourIceCream: React.FC = () => {
  const navigate = useNavigate();

  const [flavors, setFlavors] = useState<IceCreamOption[]>([]);
  const [toppings, setToppings] = useState<IceCreamOption[]>([]);
  const [weights, setWeights] = useState<WeightOption[]>([]);

  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedTopping, setSelectedTopping] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string>('');

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sabores/');
        setFlavors(response.data.content.map((flavor: any) => ({
          label: flavor.nome,
          value: flavor.id,
        })));
      } catch (error) {
        console.error('Erro ao buscar sabores:', error);
      }
    };

    const fetchToppings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/caldas');
        setToppings(response.data.content.map((topping: any) => ({
          label: topping.nome,
          value: topping.id,
        })));
      } catch (error) {
        console.error('Erro ao buscar caldas:', error);
      }
    };

    const fetchWeights = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pesos/');
        setWeights(response.data.content.map((weight: any) => ({
          label: `${weight.peso}g`,
          value: weight.id,
          price: `R$ ${weight.valor.toFixed(2)}`,
        })));
      } catch (error) {
        console.error('Erro ao buscar pesos:', error);
      }
    };

    fetchFlavors();
    fetchToppings();
    fetchWeights();
  }, []);

  const handleAddToCart = () => {
    if (!selectedFlavor || !selectedTopping || !selectedWeight) {
      alert('Por favor, selecione todas as opções!');
      return;
    }
  
    const selectedWeightObject = weights.find(w => w.value === selectedWeight);
  
    const customizedIceCream = {
      id: Date.now(),
      name: `${flavors.find(f => f.value === selectedFlavor)?.label} com ${toppings.find(t => t.value === selectedTopping)?.label}`,
      price: selectedWeightObject?.price || '',
      weight: selectedWeightObject?.label || '',
    };
  
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(customizedIceCream);
    localStorage.setItem('cart', JSON.stringify(cart));
  
    navigate('/carrinho'); 
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Monte seu Sorvete</h2>

      <div style={styles.option}>
        <label style={styles.label}>Escolha o Sabor:</label>
        <select value={selectedFlavor} onChange={(e) => setSelectedFlavor(e.target.value)} style={styles.select}>
          <option value="">Selecione...</option>
          {flavors.map((flavor) => (
            <option key={flavor.value} value={flavor.value}>
              {flavor.label}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.option}>
        <label style={styles.label}>Escolha a Calda:</label>
        <select value={selectedTopping} onChange={(e) => setSelectedTopping(e.target.value)} style={styles.select}>
          <option value="">Selecione...</option>
          {toppings.map((topping) => (
            <option key={topping.value} value={topping.value}>
              {topping.label}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.option}>
        <label style={styles.label}>Escolha o Peso:</label>
        <select value={selectedWeight} onChange={(e) => setSelectedWeight(e.target.value)} style={styles.select}>
          <option value="">Selecione...</option>
          {weights.map((weight) => (
            <option key={weight.value} value={weight.value}>
              {weight.label} - {weight.price}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAddToCart} style={styles.button}>Adicionar ao Carrinho</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  option: {
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#5a383c84',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default MakeYourIceCream;
