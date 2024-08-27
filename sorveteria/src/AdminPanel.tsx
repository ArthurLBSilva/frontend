import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface IceCreamOption {
  label: string;
  value: string;
}

interface PesoOption {
  id: string;
  peso: string;
  valor: number;
}

const AdminPanel: React.FC = () => {
  const [flavors, setFlavors] = useState<IceCreamOption[]>([]);
  const [newFlavor, setNewFlavor] = useState('');
  const [toppings, setToppings] = useState<IceCreamOption[]>([]);
  const [newTopping, setNewTopping] = useState('');
  const [pesos, setPesos] = useState<PesoOption[]>([]);
  const [newPeso, setNewPeso] = useState('');
  const [newValor, setNewValor] = useState<number | ''>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the flavors from the backend
    axios.get('http://localhost:8080/sabores/')
      .then(response => {
        const flavorData = response.data.content.map((flavor: any) => ({
          label: flavor.nome,
          value: flavor.id,
        }));
        setFlavors(flavorData);
      })
      .catch(error => {
        console.error('Error fetching flavors:', error);
      });

    // Fetch the toppings from the backend
    axios.get('http://localhost:8080/caldas')
      .then(response => {
        const toppingData = response.data.content.map((topping: any) => ({
          label: topping.nome,
          value: topping.id,
        }));
        setToppings(toppingData);
      })
      .catch(error => {
        console.error('Error fetching toppings:', error);
      });

    // Fetch the pesos from the backend
    axios.get('http://localhost:8080/pesos/')
      .then(response => {
        const pesoData = response.data.content.map((peso: any) => ({
          id: peso.id,
          peso: peso.peso,
          valor: peso.valor,
        }));
        setPesos(pesoData);
      })
      .catch(error => {
        console.error('Error fetching pesos:', error);
      });
  }, []);

  const handleAddFlavor = () => {
    if (newFlavor) {
      axios.post('http://localhost:8080/sabores/', { nome: newFlavor })
        .then(response => {
          const addedFlavor = response.data;
          setFlavors([...flavors, { label: addedFlavor.nome, value: addedFlavor.id }]);
          setNewFlavor('');
        })
        .catch(error => {
          console.error('Error adding flavor:', error);
        });
    }
  };

  const handleDeleteFlavor = (id: string) => {
    axios.delete(`http://localhost:8080/sabores/${id}`)
      .then(() => {
        setFlavors(flavors.filter(flavor => flavor.value !== id));
      })
      .catch(error => {
        console.error('Error deleting flavor:', error);
      });
  };

  const handleAddTopping = () => {
    if (newTopping) {
      axios.post('http://localhost:8080/caldas', { nome: newTopping })
        .then(response => {
          const addedTopping = response.data;
          setToppings([...toppings, { label: addedTopping.nome, value: addedTopping.id }]);
          setNewTopping('');
        })
        .catch(error => {
          console.error('Error adding topping:', error);
        });
    }
  };

  const handleDeleteTopping = (id: string) => {
    axios.delete(`http://localhost:8080/caldas${id}`)
      .then(() => {
        setToppings(toppings.filter(topping => topping.value !== id));
      })
      .catch(error => {
        console.error('Error deleting topping:', error);
      });
  };

  const handleAddPeso = () => {
    if (newPeso && newValor !== '') {
      axios.post('http://localhost:8080/pesos/', { peso: newPeso, valor: newValor })
        .then(response => {
          const addedPeso = response.data;
          setPesos([...pesos, { id: addedPeso.id, peso: addedPeso.peso, valor: addedPeso.valor }]);
          setNewPeso('');
          setNewValor('');
        })
        .catch(error => {
          console.error('Error adding peso:', error);
        });
    }
  };

  const handleDeletePeso = (id: string) => {
    axios.delete(`http://localhost:8080/pesos/${id}`)
      .then(() => {
        setPesos(pesos.filter(peso => peso.id !== id));
      })
      .catch(error => {
        console.error('Error deleting peso:', error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.navButtons}>
        <button onClick={() => navigate('/')} style={styles.navButton}>Home</button>
        <button onClick={() => alert('Logout acionado')} style={styles.navButton}>Logout</button>
      </div>

      <h2 style={styles.title}>Painel Administrativo</h2>

      <div style={styles.boxContainer}>
        {/* Flavors Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Sabores</h3>
          <ul style={styles.list}>
            {flavors.map((flavor) => (
              <li key={flavor.value} style={styles.listItem}>
                {flavor.label}
                <div>
                  <button onClick={() => navigate(`/editarSabor/${flavor.value}`)} style={styles.editButton}>Editar</button>
                  <button onClick={() => handleDeleteFlavor(flavor.value)} style={styles.deleteButton}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
          <div style={styles.addItemContainer}>
            <input
              type="text"
              value={newFlavor}
              onChange={(e) => setNewFlavor(e.target.value)}
              placeholder="Novo Sabor"
              style={styles.input}
            />
            <button onClick={handleAddFlavor} style={styles.addButton}>Adicionar Novo Sabor</button>
          </div>
        </div>

        {/* Toppings Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Caldas</h3>
          <ul style={styles.list}>
            {toppings.map((topping) => (
              <li key={topping.value} style={styles.listItem}>
                {topping.label}
                <div>
                  <button onClick={() => navigate(`/editarCalda/${topping.value}`)} style={styles.editButton}>Editar</button>
                  <button onClick={() => handleDeleteTopping(topping.value)} style={styles.deleteButton}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
          <div style={styles.addItemContainer}>
            <input
              type="text"
              value={newTopping}
              onChange={(e) => setNewTopping(e.target.value)}
              placeholder="Nova Calda"
              style={styles.input}
            />
            <button onClick={handleAddTopping} style={styles.addButton}>Adicionar Nova Calda</button>
          </div>
        </div>

        {/* Pesos Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Pesos</h3>
          <ul style={styles.list}>
            {pesos.map((peso) => (
              <li key={peso.id} style={styles.listItem}>
                {peso.peso} - R$ {peso.valor.toFixed(2)}
                <div>
                  <button onClick={() => navigate(`/editarPeso/${peso.id}`)} style={styles.editButton}>Editar</button>
                  <button onClick={() => handleDeletePeso(peso.id)} style={styles.deleteButton}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
          <div style={styles.addItemContainer}>
            <input
              type="text"
              value={newPeso}
              onChange={(e) => setNewPeso(e.target.value)}
              placeholder="Novo Peso"
              style={styles.input}
            />
            <input
              type="number"
              value={newValor}
              onChange={(e) => setNewValor(parseFloat(e.target.value))}
              placeholder="Valor"
              style={styles.input}
            />
            <button onClick={handleAddPeso} style={styles.addButton}>Adicionar Novo Peso</button>
          </div>
        </div>
      </div>
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
  navButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  navButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  boxContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%', 
  },
  section: {
    width: '48%', 
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
  },
  addItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    width: '100%',
  },
  editButton: {
    marginRight: '10px',
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#dc3545',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
  },
};

export default AdminPanel;
