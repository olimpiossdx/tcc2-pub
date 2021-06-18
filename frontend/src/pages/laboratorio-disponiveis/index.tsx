import React, { useEffect, useState } from 'react';

import { TableRow, TableCell, Button, Grid, Paper, TableContainer, Toolbar, Typography, Table, TableHead, TableBody, IconButton, Tooltip, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';


import Main from '../../components/main';
import { IAgendamentoModel } from '../laboratorio-agendados/model';
import TableDataRow from '../../components/table-data-row';
import TableDataAnimatedLoading from '../../components/skeleton/table-data';


const LaboratorioDisponiveis: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<IAgendamentoModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  //TODO: alterar fake mock para, fake api e adicionar filtro
  useEffect(() => {
    new Promise(resolve => {
      setTimeout(() => {
        resolve(setAgendamentos([
          { id: '1', usuarioId: '123', data: new Date().getTime(), bloco: { id: '', nome: 'A' }, laboratorio: { id: '1', nome: 'A200', numero: 200 }, horarioInicio: new Date().getTime(), horarioFim: new Date().getTime() },
          { id: '2', usuarioId: '124', data: new Date().getTime(), bloco: { id: '', nome: 'A' }, laboratorio: { id: '1', nome: 'A200', numero: 200 }, horarioInicio: new Date().getTime(), horarioFim: new Date().getTime() },
          { id: '2', usuarioId: '124', data: new Date().getTime(), bloco: { id: '', nome: 'A' }, laboratorio: { id: '1', nome: 'A200', numero: 200 }, horarioInicio: new Date().getTime(), horarioFim: new Date().getTime() },
          { id: '2', usuarioId: '124', data: new Date().getTime(), bloco: { id: '', nome: 'A' }, laboratorio: { id: '1', nome: 'A200', numero: 200 }, horarioInicio: new Date().getTime(), horarioFim: new Date().getTime() },
          { id: '2', usuarioId: '124', data: new Date().getTime(), bloco: { id: '', nome: 'A' }, laboratorio: { id: '1', nome: 'A200', numero: 200 }, horarioInicio: new Date().getTime(), horarioFim: new Date().getTime() }
        ]));
      }, 300);
    }).then(() => setLoading(false));
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (<Main>
    <Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)' }}>
      <Grid item xs={11} sm={10} md={8}>
        <Grid component={Paper} container spacing={2} justifyContent='center' alignItems='center' style={{ height: '100%', padding: '1%' }} >
          <TableContainer>
            <Toolbar
            // style={{ padding: 0 }}
            >
              <Grid container spacing={1} justifyContent='space-between' alignItems='center'>
                {open ? (<>
                  <Grid item>
                    <Grid container spacing={1} alignItems='center'>
                      <Grid item>
                        <CalendarTodayIcon />
                      </Grid>
                      <Grid item>
                        <Typography>
                          Laboratórios dispníveis
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Tooltip title='Filtro'>
                      <IconButton aria-label='filter' onClick={handleOpen}>
                        <FilterListIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </>) : (<>
                  <Grid item xs={12} sm>
                    <FormControl variant='outlined' fullWidth size='small'>
                      <InputLabel id='demo-simple-select-outlined-label'>Selecione laboratório</InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        // value={age}
                        // onChange={handleChange}
                        label='Selecione laboratório'
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm>
                    <FormControl variant='outlined' fullWidth size='small'>
                      <InputLabel id='demo-simple-select-outlined-label'>Selecione bloco</InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        // value={age}
                        // onChange={handleChange}
                        label='Selecione bloco'
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button endIcon={<SearchIcon />}>
                      Buscar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Tooltip title='Filtro'>
                      <IconButton aria-label='filter' onClick={handleOpen}>
                        <FilterListIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </>)}
              </Grid>
            </Toolbar>
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell>Laboratório</TableCell>
                  <TableCell >Data</TableCell>
                  <TableCell >Período</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? <TableDataAnimatedLoading /> :
                  <TableDataRow agendamentos={agendamentos} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  </Main>);
}

export default LaboratorioDisponiveis;
