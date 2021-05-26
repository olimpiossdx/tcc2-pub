import React, { useState, useEffect } from 'react';

import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';

import InsertInvitation from '@material-ui/icons/InsertInvitation';
import Main from '../../components/main';
import TableDataAnimatedLoading from '../../components/skeleton/table-data';
import TableDataRow from '../../components/table-data-row';
import { IAgendamentoModel } from './model';
import { ApiServiceRequestAsync, cancellationRequest } from '../../services';
import { useNotifcation } from '../../components/hooks/notification';
import { ContactSupportOutlined } from '@material-ui/icons';

const LaboratoriosAgendados: React.FC = () => {
  const { addNotification } = useNotifcation();
  const [agendamentos, setAgendamentos] = useState<IAgendamentoModel[]>([]);
  const [loading, setLoading] = useState(true);

  //TODO: alterar fake mock para, fake api e adicionar filtro
  useEffect(() => {
    new Promise(resolve => {
      setTimeout(() => {
        resolve(setAgendamentos([
          { id: '1', laboratorio: 'B200', dataInicio: '01/02/2021 13:30', dataFim: '01/02/2021 21:00' },
          { id: '2', laboratorio: 'C201', dataInicio: '01/02/2021 14:30', dataFim: '01/02/2021 18:00' },
          { id: '3', laboratorio: 'D401', dataInicio: '01/02/2021 12:30', dataFim: '01/02/2021 16:00' },
          { id: '4', laboratorio: 'E201', dataInicio: '01/02/2021 15:00', dataFim: '01/02/2021 19:00' },
          { id: '5', laboratorio: 'F208', dataInicio: '01/02/2021 08:30', dataFim: '01/02/2021 10:00' },
        ]));
      }, 300);
    }).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const requestAsync = async () => {
      // const response = await ApiServiceRequestAsync<IAgendamentoModel[]>({ method: 'get', url: 'usuarios/agendamentos' }, setLoading, addNotification);
      
      // if (!('status' in response)) {
      //    setAgendamentos(response);
      // };
    };

    // requestAsync();

    return function cleanUpFunction() {
      cancellationRequest('cancelou');
    };
  }, [addNotification]);

  return (<Main>
    <Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)' }}>
      <Grid item xs={11} sm={10} md={6}>
        <Grid component={Paper} container spacing={2} justifyContent='center' alignItems='center' style={{ height: '100%', padding: '1%' }} >
          <TableContainer>
            <Toolbar>
              <Grid container spacing={2} alignItems='center'>
                <Grid item>
                  <InsertInvitation />
                </Grid>
                <Grid item>
                  <Typography >
                    Laboratórios agendados
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

export default LaboratoriosAgendados;
