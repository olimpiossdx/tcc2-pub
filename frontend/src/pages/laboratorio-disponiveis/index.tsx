import React, { useEffect, useState } from 'react';

import { TableRow, TableCell, Grid, Paper, TableContainer, Toolbar, Typography, Table, TableHead, TableBody } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import Main from '../../components/main';
import { IAgendamentoModel } from '../laboratorio-agendados/model';
import TableDataRow from '../../components/table-data-row';
import TableDataAnimatedLoading from '../../components/skeleton/table-data';

const LaboratorioDisponiveis: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<IAgendamentoModel[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (<Main>
    <Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)' }}>
      <Grid item xs={11} sm={10} md={6}>
        <Grid component={Paper} container spacing={2} justifyContent='center' alignItems='center' style={{ height: '100%', padding: '1%' }} >
          <TableContainer>
            <Toolbar>
              <Grid container spacing={2} alignItems='center'>
                <Grid item>
                  <CalendarTodayIcon />
                </Grid>
                <Grid item>
                  <Typography >
                    Laboratórios dispníveis
                  </Typography>
                </Grid>
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
