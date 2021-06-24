import React, { useEffect, useState } from 'react';

import { TableRow, TableCell, Button, Grid, Paper, TableContainer, Toolbar, Typography, Table, TableHead, TableBody, IconButton, Tooltip, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ptBRLocale from 'date-fns/locale/pt-BR'

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import Main from '../../components/main';
import TableDataAnimatedLoading from '../../components/skeleton/table-data';
import BlocoModel from '../novo-agendamento/models/bloco.model';
import { ApiServiceRequestAsync } from '../../services';
import { useNotifcation } from '../../components/hooks/notification';
import ILaboratorioDisponivel from './model';
import TableLaboratorioDisponivel from '../../components/table-laboratorio-disponivel';

const LaboratorioDisponiveis: React.FC = () => {
  const { addNotification } = useNotifcation();
  const [blocos, setBlocos] = useState<BlocoModel[]>([]);
  const [selectedBlocoId, setSelectedBlocoId] = useState('');
  const [selectedLaboratorioId, setSelectedLaboratorioId] = useState('');
  const [data, setData] = useState<Date | null>(new Date());
  const [laboratoriosDisponiveis, setLaboratoriosDisponiveis] = useState<ILaboratorioDisponivel[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [disabled, setDisabled] = useState(!selectedBlocoId || !selectedLaboratorioId);


  //TODO: alterar fake mock para, fake api e adicionar filtro
  useEffect(() => {

    const requestAsync = async () => {
      const response = await ApiServiceRequestAsync<BlocoModel[]>({ method: 'get', url: 'blocos' }, setLoading, addNotification);

      if (!('status' in response)) {
        setBlocos(response);
      };
    };

    requestAsync();

    // TODO; remover
    // new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(setAgendamentos([
    //       { id: '11', usuarioId: '123', data: new Date().getTime(), bloco: { id: '6', nome: 'A' }, laboratorio: { id: '1', nome: 'A200', numero: 200 }, horarioInicio: new Date().getTime(), horarioFim: new Date().getTime() },
    //       { id: '12', usuarioId: '124', data: new Date().getTime(), bloco: { id: '7', nome: 'A' }, laboratorio: { id: '2', nome: 'A200', numero: 200 }, horarioInicio: new Date().getTime(), horarioFim: new Date().getTime() },
    //       { id: '13', usuarioId: '124', data: new Date().getTime(), bloco: { id: '8', nome: 'A' }, laboratorio: { id: '3', nome: 'A200', numero: 200 }, horarioInicio: new Date().getTime(), horarioFim: new Date().getTime() },
    //       { id: '14', usuarioId: '124', data: new Date().getTime(), bloco: { id: '9', nome: 'A' }, laboratorio: { id: '4', nome: 'A200', numero: 200 }, horarioInicio: new Date().getTime(), horarioFim: new Date().getTime() },
    //       { id: '15', usuarioId: '124', data: new Date().getTime(), bloco: { id: '10', nome: 'A' }, laboratorio: { id: '51', nome: 'A200', numero: 200 }, horarioInicio: new Date().getTime(), horarioFim: new Date().getTime() }
    //     ]));
    //   }, 600);
    // }).then(() => setLoading(false));

  }, [addNotification]);

  useEffect(() => {
    setDisabled(!selectedBlocoId || !selectedLaboratorioId);
  }, [selectedBlocoId, selectedLaboratorioId]);

  const handleOpen = () => {
    setOpen(!open);
    setSelectedBlocoId('');
    setSelectedLaboratorioId('');
  };

  const handleChangeBloco = (event: React.ChangeEvent<{ name?: string; value: string; }>, _child: React.ReactNode) => {
    setSelectedBlocoId(event.target.value);
  };

  const handleChangeLaboratorio = (event: React.ChangeEvent<{ name?: string; value: string; }>, _child: React.ReactNode) => {
    setSelectedLaboratorioId(event.target.value);
  };

  const handleChangeSearchAsync = async () => {
    const response = await ApiServiceRequestAsync<ILaboratorioDisponivel[]>({
      method: 'post', url: 'blocos/laboratorios-disponiveis', data: {
        blocoId: selectedBlocoId,
        laboratorioId: selectedLaboratorioId,
        data
      }
    }, setLoading, addNotification);

    if (!('status' in response)) {
      setLaboratoriosDisponiveis(response);
    };
  };

  return (<Main>
    <Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)' }}>
      <Grid item xs={11} sm={10} md={8}>
        <Grid component={Paper} container justifyContent='center' alignItems='center' style={{ height: '100%', padding: '2%' }} >
          <TableContainer>
            <Toolbar style={{ padding: 10 }}>
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
                    <FormControl variant='outlined' size='small' fullWidth >
                      <InputLabel id='simple-select-outlined-bloco'>bloco</InputLabel>
                      <Select
                        name='simple-select-bloco'
                        id='demo-simple-select-bloco'
                        labelId='simple-select-outlined-bloco'
                        label='bloco'
                        value={selectedBlocoId}
                        onChange={handleChangeBloco}>
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {blocos.map(bloco => (<MenuItem value={bloco.id}>{bloco.nome}</MenuItem>))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm>
                    <FormControl variant='outlined' size='small' fullWidth>
                      <InputLabel id='simple-select-outlined-laboratorio'>laboratório</InputLabel>
                      <Select
                        name='simple-select-laboratorio'
                        labelId='simple-select-outlined-laboratorio'
                        id='simple-select-laboratorio'
                        label='laboratório'
                        value={selectedLaboratorioId}
                        onChange={handleChangeLaboratorio}>
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {selectedBlocoId.length > 0 && blocos.find(bloco => bloco.id === selectedBlocoId)?.laboratorios.map(laboratorio => (<MenuItem value={laboratorio.id}>{laboratorio.nome}</MenuItem>))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
                      <KeyboardDatePicker
                        size='small'
                        name='dataInicio'
                        value={data}
                        onChange={(data) => setData(data)}
                        label='Data'
                        minDate={new Date()}
                        format='dd/MM/yyyy'
                        disabled={loading} />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item>
                    <Button variant='outlined' endIcon={<SearchIcon />} onClick={handleChangeSearchAsync} disabled={disabled}>
                      Buscar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Tooltip title='Fechar filtro '>
                      <IconButton aria-label='close-filter' onClick={handleOpen}>
                        <CloseIcon />
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
                  <TableLaboratorioDisponivel laboratoriosDisponiveis={laboratoriosDisponiveis} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  </Main>);
}

export default LaboratorioDisponiveis;
