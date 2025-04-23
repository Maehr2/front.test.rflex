import http from '../core/http';

export const fetchDollarValues = (startDate, endDate) => {
  return http.get('/rango', {
      params: { inicio: startDate, fin: endDate },
  });
};
export const updateDollarValue = (fecha, newValue) => {
  return http.put('/dolar/actualizar', { fecha, valor: newValue });
};

export const deleteDollarValue = (fecha) => {
  return http.delete('/dolar/eliminar', { data: { fecha } });
};
// import http from '../core/http';

// export const fetchDollarValues = async (startDate, endDate) => {
//   try {
//     const response = await http.get('/rango', {
//       params: {
//         inicio: startDate,
//         fin: endDate,
//       },
//     });
//     console.log('Datos obtenidos de la API:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error al obtener los valores del dólar:', error);
//     throw error;
//   }
// };

// export const updateDollarValue = (id, value) => {
//   return http.put(`/dolar/${id}`, { value });
// };

// export const deleteDollarValue = id => {
//   return http.delete(`/dolar/${id}`);
// };