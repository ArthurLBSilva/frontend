import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarCalda: React.FC = () => {
  const { calda } = useParams<{ calda: string }>();
  const [novaCalda, setNovaCalda] = useState(calda);
  const [status, setStatus] = useState<string>('Disponível'); 
  const navigate = useNavigate();

  const handleConfirm = () => {
    const id = calda; 
    const updatedCalda = {
      nome: novaCalda,
      estoque: status,
    };

    axios.put(`http://localhost:8080/caldas/${id}`, updatedCalda)
      .then(() => {
        alert('Calda atualizada com sucesso!');
        navigate('/admin'); 
      })
      .catch(error => {
        console.error('Erro ao atualizar a calda:', error);
        alert('Ocorreu um erro ao tentar atualizar a calda.');
      });
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>Voltar</button>
      <h2>Editar Calda</h2>
      <input
        type="text"
        value={novaCalda}
        onChange={(e) => setNovaCalda(e.target.value)}
        style={styles.input}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={styles.select}
      >
        <option value="Disponível">Disponível</option>
        <option value="Indisponível">Indisponível</option>
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

export default EditarCalda;
