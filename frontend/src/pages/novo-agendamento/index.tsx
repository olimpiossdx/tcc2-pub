import React, { useState, useCallback, useEffect } from 'react';
import { differenceInMinutes } from 'date-fns';

import { Paper, Grid, Typography, FormControl, InputLabel, MenuItem, Select, Button, LinearProgress, Divider } from '@material-ui/core';

import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptBRLocale from 'date-fns/locale/pt-BR'
import DateFnsUtils from '@date-io/date-fns';

import EventNoteIcon from '@material-ui/icons/EventNote';
import { ApiServiceRequestAsync, cancellationRequest } from '../../services';
import { useNotifcation } from '../../components/hooks/notification';
import Main from '../../components/main';
import BlocoModel from './models/bloco.model';
import { useHistory } from 'react-router';

interface IParametroAgendamento {
  id: string;
  periodo: number;
};

const NovoAgendamento: React.FC = () => {
  const { addNotification } = useNotifcation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [blocos, setBlocos] = useState<BlocoModel[]>(new Array<BlocoModel>());
  const [selectBloco, setSelectBloco] = React.useState<{ id: string, pos: number }>({ id: '', pos: -1 });
  const [selectedLaboratorio, setSelectedLaboratorio] = React.useState('');
  const [data, setData] = useState<Date | null>(new Date());
  const [selectStartTime, setSelectStartTime] = useState<Date | null>(new Date());
  const [selectEndTime, setSelectEndTime] = useState<Date | null>(new Date());
  const [parametroAgendamento, setParametroAgendamento] = useState<IParametroAgendamento[]>([]);

  useEffect(() => {
    const requestAsync = async () => {
      const response = await ApiServiceRequestAsync<BlocoModel[]>({ method: 'get', url: 'blocos' }, setLoading, addNotification);

      if (!('status' in response)) {
        setBlocos(response);
      };
    };

    const requesParametrotAsync = async () => {
      const response = await ApiServiceRequestAsync<IParametroAgendamento[]>({ method: 'get', url: 'parametro-periodo-agendamento' }, setLoading, addNotification);

      if (!('status' in response)) {
        setParametroAgendamento(response);
      };
    };

    requesParametrotAsync();
    requestAsync();

    return function cleanUpFunction() {
      cancellationRequest('cancelou');
    };
  }, [addNotification]);


  const handleSelectBlocoChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    const id = event.target.value as string;
    const blocoIndex = blocos.findIndex(bloco => bloco.id === id);

    if (blocoIndex === -1) {
      setSelectedLaboratorio('');
    };

    setSelectBloco({ id, pos: blocoIndex });
  }, [blocos]);

  const handleSelectSalaChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedLaboratorio(event.target.value as string);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //TODO ADICIONAR REGRA PARA CADASTRAMENTO
    event.preventDefault();

    const differenceMinutes = differenceInMinutes(selectEndTime as Date, selectStartTime as Date);

    if (!(differenceMinutes > 0 && differenceMinutes >= parametroAgendamento[0].periodo)) {
      addNotification({ tipo: 'error', descricao: `Permanência mínima de ${parametroAgendamento[0].periodo} minutos.` });
      return;
    };

    const response = await ApiServiceRequestAsync<IParametroAgendamento[]>({ method: 'post', url: 'agendamentos', data: { blocoId: selectBloco.id, laboratorioId: selectedLaboratorio, data, horarioInicio: selectStartTime, horarioFim: selectEndTime } }, setLoading, addNotification);

    console.log('response', response);

    if (!('status' in response)) {
      history.push('/laboratorios-agendados');
    };
  };

  return (<Main>
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)', minHeight: 400 }}>
        <Grid item xs={11} sm={10} md={7} lg={4} component={Paper}>
          <Grid container spacing={2} alignItems='center' style={{ padding: 10 }}>
            <Grid item>
              <EventNoteIcon />
            </Grid>
            <Grid item>
              <Typography align='left'>
                Novo agendamento
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems='center' style={{ padding: 10, paddingLeft: 0, paddingRight: 0 }}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems='center' style={{ padding: 10 }}>
            <Grid item xs={12}>
              {loading && <LinearProgress />}
              {!loading && (<FormControl variant='outlined' fullWidth required>
                <InputLabel id='select-bloco-simple-select-outlined-label'>Selecione o bloco</InputLabel>
                <Select
                  labelId='select-bloco-simple-select-outlined-label'
                  id='select-bloco-simple-select-outlined'
                  name='bloco'
                  value={selectBloco.id}
                  onChange={handleSelectBlocoChange}
                  label='Selecionie bloco'
                  required>
                  {!loading && blocos.length ? (<MenuItem value=''>
                    <em>limpar seleção</em>
                  </MenuItem>) : (<MenuItem value=''>
                    <em>Nenhum registro</em>
                  </MenuItem>)}
                  {blocos.map(bloco => (<MenuItem key={bloco.id} value={bloco.id}>{bloco.nome}</MenuItem>))}
                </Select>
              </FormControl>)}
            </Grid>
            <Grid item xs={12}>
              {loading && <LinearProgress />}
              {!loading && (<FormControl variant='outlined' fullWidth required>
                <InputLabel id='simple-select-outlined-label'>Selecione o laboratório</InputLabel>
                <Select
                  labelId='simple-select-outlined-label'
                  id='simple-select-outlined-label'
                  name='laboratorio'
                  value={selectedLaboratorio}
                  onChange={handleSelectSalaChange}
                  label='Selecione laboratório'
                  required>
                  {selectBloco.pos !== -1 ? (<MenuItem value=''>
                    <em>limpar seleção</em>
                  </MenuItem>) : (<MenuItem value=''>
                    <em>Nenhum registro</em>
                  </MenuItem>)}
                  {selectBloco.pos !== -1 && blocos[selectBloco.pos].laboratorios.map(laboratorio => (<MenuItem key={laboratorio.id} value={laboratorio.id}>{laboratorio.nome}</MenuItem>))}
                </Select>
              </FormControl>)}
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
                <KeyboardDatePicker
                  fullWidth
                  name='dataInicio'
                  value={data}
                  onChange={(data) => setData(data)}
                  label='Data'
                  onError={console.log}
                  minDate={new Date()}
                  format='dd/MM/yyyy'
                  disabled={loading} />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
                <KeyboardTimePicker
                  label='Horário de inicio'
                  name='horarioInicio'
                  ampm={false}
                  fullWidth
                  value={selectStartTime}
                  onChange={(data) => setSelectStartTime(data)}
                  onError={console.log}
                  disabled={loading}
                  required />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
                <KeyboardTimePicker
                  label='Horário de final'
                  name='horarioFim'
                  ampm={false}
                  fullWidth
                  value={selectEndTime}
                  onChange={(data) => setSelectEndTime(data)}
                  onError={console.log}
                  disabled={loading}
                  required />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Button type='submit' variant='outlined' disabled={loading}>Agendar</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  </Main>);

}

export default NovoAgendamento;
