import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarSabor: React.FC = () => {
  const { sabor } = useParams<{ sabor: string }>();
  const [novoSabor, setNovoSabor] = useState(sabor || '');
  const [status, setStatus] = useState<string>('Disponivel');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/sabores/${sabor}`)
      .then(response => {
        setNovoSabor(response.data.nome);
        setStatus(response.data.estoque);
      })
      .catch(error => {
        console.error('Error fetching flavor details:', error);
      });
  }, [sabor]);

  const handleConfirm = () => {
    const updatedFlavor = {
      nome: novoSabor,
      estoque: status,
    };

    axios.put(`http://localhost:8080/sabores/${sabor}`, updatedFlavor)
      .then(() => {
        alert(`Sabor atualizado para: ${novoSabor} com status: ${status}`);
        navigate('/admin');
      })
      .catch(error => {
        console.error('Error updating flavor:', error);
      });
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>Voltar</button>
      <h2>Editar Sabor</h2>
      <input
        type="text"
        value={novoSabor}
        onChange={(e) => setNovoSabor(e.target.value)}
        style={styles.input}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={styles.select}
      >
        <option value="Disponivel">Disponível</option>
        <option value="Indisponivel">Indisponível</option>
      </select>
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

export default EditarSabor;
