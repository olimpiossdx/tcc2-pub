import React, { useState, useCallback, useEffect } from 'react';

import { Paper, Grid, Typography, FormControl, InputLabel, MenuItem, Select, Button, LinearProgress, Divider } from '@material-ui/core';

import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptBRLocale from 'date-fns/locale/pt-BR'
import DateFnsUtils from '@date-io/date-fns';

import EventNoteIcon from '@material-ui/icons/EventNote';
import { ApiServiceRequestAsync, cancellationRequest } from '../../services';
import { useNotifcation } from '../../components/hooks/notification';
import Main from '../../components/main';
import BlocoModel from './models/bloco.model';

const NovoAgendamento: React.FC = () => {
  const { addNotification } = useNotifcation();
  const [loading, setLoading] = useState(true);
  const [blocos, setBlocos] = useState<BlocoModel[]>([]);
  const [selectBloco, setSelectBloco] = React.useState('');
  const [selectedIndexBloco, setSelectedIndexBloco] = React.useState<number>(-1);
  const [laboratorioSelected, setLaboratorioSelected] = React.useState('');
  const [data, setData] = useState<Date | null>(new Date());
  const [selectStartTime, setSelectStartTime] = useState<Date | null>(new Date());
  const [selectEndTime, setSelectEndTime] = useState<Date | null>(new Date());
  // TODO: ajustar get de parametro de agendamento
  // const [parametroAgendamento, setParametroAgendamento] = useState<any>();

  useEffect(() => {
    const requestAsync = async () => {
      const response = await ApiServiceRequestAsync<BlocoModel[]>({ method: 'get', url: 'blocos' }, setLoading, addNotification);

      if (!('status' in response)) {
        setBlocos(response);
      };
    };

    requestAsync();

    return function cleanUpFunction() {
      cancellationRequest('cancelou');
    };
  }, [addNotification]);


  const handleSelectBlocoChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    const id = event.target.value as string;
    setSelectBloco(id);
    setSelectedIndexBloco(() => blocos.findIndex(bloco => bloco.id === id));
  }, [blocos]);

  const handleSelectSalaChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setLaboratorioSelected(event.target.value as string);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //TODO ADICIONAR REGRA PARA CADASTRAMENTO
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.forEach((value: FormDataEntryValue, key: string, parent: FormData) => {
      console.log(key, value);
    });


    addNotification({ tipo: 'success', descricao: 'Agendamento realizado com sucesso! ' });
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
              {!loading && (<FormControl variant='outlined' fullWidth>
                <InputLabel id='select-bloco-simple-select-outlined-label'>Selecione o bloco</InputLabel>
                <Select
                  labelId='select-bloco-simple-select-outlined-label'
                  id='select-bloco-simple-select-outlined'
                  name='bloco'
                  value={selectBloco}
                  onChange={handleSelectBlocoChange}
                  label='Selecionie bloco'>
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
              {!loading && (<FormControl variant='outlined' fullWidth>
                <InputLabel id='select-sala-simple-select-outlined-label'>Selecione o laboratório</InputLabel>
                <Select
                  labelId='select-sala-simple-select-outlined-label'
                  id='select-sala-simple-select-outlined'
                  name='laboratorio'
                  value={laboratorioSelected}
                  onChange={handleSelectSalaChange}
                  label='Selecione laboratório'>
                  {!loading && blocos.length ? (<MenuItem value=''>
                    <em>limpar seleção</em>
                  </MenuItem>) : (<MenuItem value=''>
                    <em>Nenhum registro</em>
                  </MenuItem>)}
                  {selectedIndexBloco !== -1 && blocos[selectedIndexBloco].laboratorios.map(laboratorio => (<MenuItem key={laboratorio.id} value={laboratorio.id}>{laboratorio.nome}</MenuItem>))}
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
                  disabled={loading} />
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
                />
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
