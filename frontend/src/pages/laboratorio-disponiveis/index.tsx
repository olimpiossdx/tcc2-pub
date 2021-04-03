import React, { useEffect, useState } from 'react';

import { TableRow, TableCell, Grid, Paper, TableContainer, Toolbar, Typography, Table, TableHead, TableBody } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import Loading from '../../components/loading';
import { dataFormatter } from '../../utils/formatted';
import Main from '../../components/main';

interface IAgendamento {
  id?: string;
  laboratorio: string;
  dataInicio: string;
  dataFim: string;
}

const RenderROw: React.FC<{ agendamentos: IAgendamento[] }> = ({ agendamentos }) => {
  return (<>
    {agendamentos.map(agendamento => (<TableRow key={agendamento.id}>
      <TableCell component='th' scope='row'>
        {agendamento.laboratorio}
      </TableCell>
      <TableCell scope='row'>
        {dataFormatter(agendamento.dataInicio, {})}
      </TableCell>
      <TableCell >{`${dataFormatter(agendamento.dataInicio, { type: 'HH:mm' })} às ${dataFormatter(agendamento.dataFim, { type: 'HH:mm' })}`}</TableCell>
    </TableRow>))}
  </>);
}

const LaboratorioDisponiveis: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
  const [loading, setLoading] = useState(true);

  //TODO: alterar fake mock para, fake api e adicionar filtro
  useEffect(() => {
    new Promise(resolve => {
      setTimeout(() => {
        resolve(setAgendamentos([
          { id: '1', laboratorio: 'A200', dataInicio: '01/02/2021 13:30', dataFim: '01/02/2021 21:00' },
          { id: '2', laboratorio: 'E201', dataInicio: '01/02/2021 14:30', dataFim: '01/02/2021 18:00' },
          { id: '3', laboratorio: 'B301', dataInicio: '01/02/2021 12:30', dataFim: '01/02/2021 16:00' },
          { id: '4', laboratorio: 'A201', dataInicio: '01/02/2021 15:00', dataFim: '01/02/2021 19:00' },
          { id: '5', laboratorio: 'D208', dataInicio: '01/02/2021 08:30', dataFim: '01/02/2021 10:00' },
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
                {loading ?
                  (<TableRow>
                    <TableCell colSpan={3} align='center'>
                      <Loading />
                    </TableCell>
                  </TableRow>) :
                  <RenderROw agendamentos={agendamentos} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  </Main>)
}

export default LaboratorioDisponiveis;
