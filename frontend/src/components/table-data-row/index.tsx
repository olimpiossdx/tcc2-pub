import React from 'react';

import { TableRow, TableCell, Typography } from '@material-ui/core';
import { IAgendamentoModel } from '../../pages/laboratorio-agendados/model';
import { dataFormatter } from '../../utils/formatted';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';

const TableDataRow: React.FC<{ agendamentos: IAgendamentoModel[] }> = ({ agendamentos }) => {
  return (<>
    {agendamentos.length ? (agendamentos.map(agendamento => (
      <TableRow key={agendamento.id} hover>
        <TableCell component='th' scope='row'>
          {agendamento.laboratorio.nome}
        </TableCell>
        <TableCell scope='row'>
          {dataFormatter(agendamento.data, {})}
        </TableCell>
        <TableCell >{`${dataFormatter(agendamento.horarioInicio, { type: 'HH:mm' })} às ${dataFormatter(agendamento.horarioFim, { type: 'HH:mm' })}`}</TableCell>
      </TableRow>))) :
      (<TableRow>
        <TableCell scope='row' colSpan={3}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FindInPageOutlinedIcon color='inherit' />
            <Typography variant='h6' >
              Nenhum agendamento encontrado.
            </Typography>
          </div>
        </TableCell>
      </TableRow>
      )}
  </>);
}

export default TableDataRow;