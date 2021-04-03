import React, { useState, useCallback, useEffect } from 'react';

import { Paper, Grid, Typography, FormControl, InputLabel, MenuItem, Select, Button, LinearProgress } from '@material-ui/core';

import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptBRLocale from 'date-fns/locale/pt-BR'
import DateFnsUtils from '@date-io/date-fns';

import EventNoteIcon from '@material-ui/icons/EventNote';
import api from '../../services';
import { IBlocoModel, ILaboratorioModel } from './model';
import NovoAgendamentoAnimatedLoading from '../../components/skeleton';
import { useNotifcation } from '../../components/hooks/notification';
import Main from '../../components/main';

interface IReseponse {
  blocos: IBlocoModel[];
  laboratorios: ILaboratorioModel[];
}

const NovoAgendamento: React.FC = () => {
  const { addNotification } = useNotifcation();
  const [loading, setLoading] = useState(true);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [blocos, setBlocos] = useState<IBlocoModel[]>([]);
  const [laboratorios, setLaboratorios] = useState<ILaboratorioModel[]>([]);
  const [selectBloco, setSelectBloco] = React.useState('');
  const [selectSala, setSelectSala] = React.useState('');
  const [data, setData] = useState<Date | null>(new Date());
  const [selectStartTime, setSelectStartTime] = useState<Date | null>(new Date());
  const [selectEndTime, setSelectEndTime] = useState<Date | null>(new Date());

  useEffect(() => {
    api.get<IReseponse>('laboratorios')
      .then(response => {
        setBlocos(response.data.blocos);
        setBlocos(response.data.laboratorios);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingSkeleton(false);
        setLoading(false)
      });

  }, []);

  const loadSalasByBloco = useCallback(() => {
    setLoading(true);
    api.get<ILaboratorioModel[]>(`laboratorios-por-bloco/${selectBloco}`)
      .then(response => {
        setLaboratorios(response.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [selectBloco]);

  useEffect(() => {
    loadSalasByBloco();
    return () => {
      loadSalasByBloco()
    }
  }, [loadSalasByBloco]);


  const handleSelectBlocoChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectBloco(event.target.value as string);
  }, []);

  const handleSelectSalaChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectSala(event.target.value as string);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("tes")
    addNotification({ tipo: 'success', descricao: 'Agendamento realizado com sucesso! ' });
    //TODO ADICIONAR REGRA PARA CADASTRAMENTO
  };

  return (<Main>
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)', minHeight: 350 }}>
        {loadingSkeleton ? (<NovoAgendamentoAnimatedLoading />) :
          <Grid item xs={11} sm={10} md={7} lg={4}>
            <Paper style={{ padding: 10 }}>
              <Grid container spacing={2} alignItems='center' style={{ height: '100%' }}>
                <Grid item>
                  <EventNoteIcon />
                </Grid>
                <Grid item>
                  <Typography align='left'>
                    Novo agendamento
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {loading && <LinearProgress />}
                  {!loading && (<FormControl variant='outlined' fullWidth>
                    <InputLabel id='select-bloco-simple-select-outlined-label'>Selecione o bloco</InputLabel>
                    <Select
                      labelId='select-bloco-simple-select-outlined-label'
                      id='select-bloco-simple-select-outlined'
                      value={selectBloco}
                      onChange={handleSelectBlocoChange}
                      label='Selecionar bloco'>
                      {!loading && blocos.length ? (<MenuItem value=''>
                        <em>limpar seleção</em>
                      </MenuItem>) : (<MenuItem value=''>
                        <em>Nenhum registro</em>
                      </MenuItem>)}
                      {blocos.map(bloco => (<MenuItem value={bloco.id}>{bloco.nome}</MenuItem>))}
                    </Select>
                  </FormControl>)}
                </Grid>
                <Grid item xs={12}>
                  {loading && <LinearProgress />}
                  {!loading && (<FormControl variant='outlined' fullWidth>
                    <InputLabel id='select-sala-simple-select-outlined-label'>Selecione a sala</InputLabel>
                    <Select
                      labelId='select-sala-simple-select-outlined-label'
                      id='select-sala-simple-select-outlined'
                      value={selectSala}
                      onChange={handleSelectSalaChange}
                      label='Selecionar sala'>
                      {!loading && laboratorios.length ? (<MenuItem value=''>
                        <em>limpar seleção</em>
                      </MenuItem>) : (<MenuItem value=''>
                        <em>Nenhum registro</em>
                      </MenuItem>)}
                      {laboratorios.map(laboratorio => (<MenuItem value={laboratorio.id}>{laboratorio.nome}</MenuItem>))}
                    </Select>
                  </FormControl>)}
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
                    <KeyboardDatePicker
                      fullWidth
                      value={data}
                      onChange={(data) => setData(data)}
                      label='Data'
                      onError={console.log}
                      minDate={new Date()}
                      format='dd/MM/yyyy' />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
                    <KeyboardTimePicker
                      label='Horário de inicio'
                      ampm={false}
                      fullWidth
                      value={selectStartTime}
                      onChange={(data) => setSelectStartTime(data)}
                      onError={console.log} />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
                    <KeyboardTimePicker
                      label='Horário de final'
                      ampm={false}
                      fullWidth
                      value={selectEndTime}
                      onChange={(data) => setSelectEndTime(data)}
                      onError={console.log} />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent='flex-end'>
                    <Grid item>
                      <Button type='submit' variant='outlined'>Agendar</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>}
      </Grid>
    </form>
  </Main>);

}

export default NovoAgendamento;
