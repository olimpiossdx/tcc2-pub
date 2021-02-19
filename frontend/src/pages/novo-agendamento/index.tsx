import React, { useState, useCallback } from 'react';
import { Paper, Grid, Typography, FormControl, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptBRLocale from 'date-fns/locale/pt-BR'
import DateFnsUtils from '@date-io/date-fns';

const NovoAgendamento: React.FC = () => {
  const [selectBloco, setSelectBloco] = React.useState('');
  const [selectSala, setSelectSala] = React.useState('');
  const [selectStartDate, setSelectStartDate] = useState<Date | null>(new Date());
  const [selectEndDate, setSelectEndDate] = useState<Date | null>(new Date());

  const handleSelectBlocoChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectBloco(event.target.value as string);
  }, []);

  const handleSelectSalaChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectSala(event.target.value as string);
  }, []);

  const handleDateStartChange = useCallback((date: Date | null, _value?: string | null | undefined) => {
    setSelectStartDate(date);
  }, []);

  const handleDateEndChange = useCallback((date: Date | null, _value?: string | null | undefined) => {
    setSelectEndDate(date);
  }, []);

  return (<Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 64px)' }}>
    <Grid item xs={11} sm={10} md={6}>
      <Paper style={{ padding: 10 }}>
        <Grid container spacing={2} alignItems='center' style={{ height: '100%' }} >
          <Grid item>
            <CalendarToday />
          </Grid>
          <Grid item >
            <Typography align='left'>
              Novo agendamento
           </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel id='demo-simple-select-outlined-label'>Selecione o bloco</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={selectBloco}
                onChange={handleSelectBlocoChange}
                label='Selecione o bloco'
              >
                <MenuItem value=''>
                  <em>limpar seleção</em>
                </MenuItem>
                <MenuItem value={10}>B200</MenuItem>
                <MenuItem value={20}>A201</MenuItem>
                <MenuItem value={30}>C202</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel id='demo-simple-select-outlined-label'>Selecione a sala</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={selectSala}
                onChange={handleSelectSalaChange}
                label='Selecione a sala'
              >
                <MenuItem value=''>
                  <em>limpar seleção</em>
                </MenuItem>
                <MenuItem value={10}>C202</MenuItem>
                <MenuItem value={20}>C203</MenuItem>
                <MenuItem value={30}>C204</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
              <KeyboardDateTimePicker
                fullWidth
                value={selectStartDate}
                onChange={handleDateStartChange}
                label='Data e horário de inicio'
                onError={console.log}
                minDate={new Date('2018-01-01T00:00')}
                format='yyyy/MM/dd hh:mm a'
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} sm>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
              <KeyboardDateTimePicker
                fullWidth
                value={selectEndDate}
                onChange={handleDateEndChange}
                label='Data e horário de final'
                onError={console.log}
                minDate={new Date('2018-01-01T00:00')}
                format='yyyy/MM/dd hh:mm a'
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button variant='outlined'>Agendar</Button>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Paper>
    </Grid>
  </Grid>)
}

export default NovoAgendamento;
