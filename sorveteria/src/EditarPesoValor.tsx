import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarPesoValor: React.FC = () => {
  const { peso } = useParams<{ peso: string }>();
  const [novoPeso, setNovoPeso] = useState(peso || '');
  const [novoPreco, setNovoPreco] = useState('');
  const [status, setStatus] = useState<string>('Disponivel');
  const navigate = useNavigate();

  useEffect(() => {
   
    axios.get(`http://localhost:8080/pesos/${peso}`)
      .then(response => {
        setNovoPeso(response.data.peso);
        setNovoPreco(response.data.valor.toString());
        setStatus(response.data.estoque);
      })
      .catch(error => {
        console.error('Error fetching peso details:', error);
      });
  }, [peso]);

  const handleConfirm = () => {
    const updatedPeso = {
      peso: novoPeso,
      valor: parseFloat(novoPreco),
      estoque: status,
    };

   
    axios.put(`http://localhost:8080/pesos/${peso}`, updatedPeso)
      .then(() => {
        alert(`Peso atualizado para: ${novoPeso} com preço: ${novoPreco} e status: ${status}`);
        navigate('/admin');
      })
      .catch(error => {
        console.error('Error updating peso:', error);
      });
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>Voltar</button>
      <h2>Editar Peso e Valor</h2>
      <input
        type="text"
        value={novoPeso}
        onChange={(e) => setNovoPeso(e.target.value)}
        placeholder="Novo Peso"
        style={styles.input}
      />
      <input
        type="text"
        value={novoPreco}
        onChange={(e) => setNovoPreco(e.target.value)}
        placeholder="Novo Preço"
        style={styles.input}
      />
      
      <button onClick={handleConfirm} style={styles.confirmButton}>Confirmar</button>
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
  backButton: {
    alignSelf: 'flex-start',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#6c757d',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    width: '50%',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    width: '50%',
  },
  confirmButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
  },
};

export default EditarPesoValor;
