import axios from 'axios';

const API_URL = 'http://localhost:8080/sabores/';

export const createSabor = async (sabor) => {
  try {
    const response = await axios.post(API_URL, sabor);
    console.log('Sabor criado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar sabor:', error);
    throw error;
  }
};

export const fetchFlavors = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Dados recebidos:', response.data);
    return response.data.content.map((flavor) => ({
      label: flavor.nome,
      value: flavor.id,
    }));
  } catch (error) {
    console.error('Erro ao buscar sabores:', error);
    throw error;
  }
};
