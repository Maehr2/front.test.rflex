import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDollarValues, updateDollar, deleteDollar } from '../store/dollarSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  TextField,
  Box,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DollarValuesComponent = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.dollar);
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState(new Date());
  const [editing, setEditing] = useState(null);
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    dispatch(
      getDollarValues({
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      })
    );
  }, [dispatch, startDate, endDate]);

  const handleUpdate = (fecha) => {
  if (newValue) {
    dispatch(updateDollar({ fecha, newValue })).then(() => {
      dispatch(
        getDollarValues({
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
        })
      );
    });
    setEditing(null);
    setNewValue('');
  }
};

  const handleDelete = (fecha) => {
    dispatch(deleteDollar(fecha));
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Valores del dólar (últimos 30 días)
      </Typography>
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <DatePicker
          label="Fecha inicio"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Fecha fin"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          variant="contained"
          onClick={() =>
            dispatch(
              getDollarValues({
                startDate: startDate.toISOString().slice(0, 10),
                endDate: endDate.toISOString().slice(0, 10),
              })
            )
          }
        >
          Buscar
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Fecha</strong></TableCell>
                <TableCell><strong>Valor</strong></TableCell>
                <TableCell><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.fecha}>
                  <TableCell>{item.fecha}</TableCell>
                  <TableCell>
                    {editing === item.fecha ? (
                      <TextField
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        label="Nuevo valor"
                        type="number"
                      />
                    ) : (
                      `$${item.valor}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === item.fecha ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(item.fecha)}
                      >
                        Guardar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setEditing(item.fecha);
                          setNewValue(item.valor);
                        }}
                      >
                        🖊️ Editar
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(item.fecha)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DollarValuesComponent;



// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDollarValues } from '../store/dollarSlice';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField, Box, Button } from '@mui/material';

// const DollarValuesComponent = () => {
//   const dispatch = useDispatch();
//   const { data, loading } = useSelector((state) => state.dollar);
//   const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
//   const [endDate, setEndDate] = useState(new Date());
// useEffect(() => {
//   dispatch(
//     getDollarValues({
//       startDate: startDate.toISOString().slice(0, 10),
//       endDate: endDate.toISOString().slice(0, 10),
//     })
//   );
// }, [dispatch, startDate, endDate]);

//   if (loading) return <p>Cargando...</p>;

//   return (
//     <div>
//     <Typography variant="h6" gutterBottom>
//       Valores del dólar (últimos 30 días)
//     </Typography>
//     <Box display="flex" gap={2} alignItems="center" mb={2}>
//       <DatePicker
//         label="Fecha inicio"
//         value={startDate}
//         onChange={(newValue) => setStartDate(newValue)}
//         renderInput={(params) => <TextField {...params} />}
//       />
//       <DatePicker
//         label="Fecha fin"
//         value={endDate}
//         onChange={(newValue) => setEndDate(newValue)}
//         renderInput={(params) => <TextField {...params} />}
//       />
//       <Button
//         variant="contained"
//         onClick={() =>
//           dispatch(
//             getDollarValues({
//               startDate: startDate.toISOString().slice(0, 10),
//               endDate: endDate.toISOString().slice(0, 10),
//             })
//           )
//         }
//       >
//         Buscar
//         </Button>
//     </Box>
//     {loading ? (
//       <CircularProgress />
//     ) : (
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Fecha</strong></TableCell>
//               <TableCell><strong>Valor</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((item) => (
//               <TableRow key={item.fecha}>
//                 <TableCell>{item.fecha}</TableCell>
//                 <TableCell>${item.valor}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     )}
//   </div>
//   );
// };

// export default DollarValuesComponent;
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDollarValues } from '../store/slices/dollarSlice';

// const DollarValuesComponent = () => {
//   const dispatch = useDispatch();
//   const { data, loading } = useSelector((state) => state.dollar);

//   useEffect(() => {
//     const today = new Date();
//     const startDate = new Date(today);
//     startDate.setDate(today.getDate() - 30);

//     dispatch(
//       getDollarValues({
//         startDate: startDate.toISOString().slice(0, 10),
//         endDate: today.toISOString().slice(0, 10),
//       })
//     );
//   }, [dispatch]);

//   if (loading) return <p>Cargando...</p>;

//   return (
//     <div>
//       {/* renderiza la tabla y el gráfico con los datos */}
//     </div>
//   );
// };

// export default DollarValuesComponent;
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDollarValues } from '../services/dollarService';
// import { setDollarValues, setLoading, setError } from '../store/dollarSlice';

// const DollarValuesComponent = () => {
//   const dispatch = useDispatch();

//   const { dollarValues, loading, error } = useSelector(state => state.dollar);

//   useEffect(() => {
//     const loadDollarValues = async () => {
//       dispatch(setLoading(true));
//       try {
//         const data = await fetchDollarValues('2024-04-22', '2025-04-20');
//         dispatch(setDollarValues(data));
//         console.log('valordolaruseeffect', data);

//       } catch (error) {
//         dispatch(setError('Error al cargar los valores del dólar.'));
//         console.error(error);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     loadDollarValues();
//   }, [dispatch]);

//   return (
//     <div>
//       {loading && <p>Cargando...</p>}
//       {error && <p>{error}</p>}
//       {!loading && !error && (
//         <ul>
//           {dollarValues.map((value, index) => (
//             <li key={index}>
//               {value.date}: {value.value}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DollarValuesComponent;
