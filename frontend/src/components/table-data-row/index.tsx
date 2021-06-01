import React from "react";

import { TableRow, TableCell, Typography } from "@material-ui/core";
import { IAgendamentoModel } from "../../pages/laboratorio-agendados/model";
import { dataFormatter } from "../../utils/formatted";
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';

const TableDataRow: React.FC<{ agendamentos: IAgendamentoModel[] }> = ({ agendamentos }) => {
  return (<>
    {agendamentos.length ? (agendamentos.map(agendamento => (
      <TableRow key={agendamento.id} hover>
        <TableCell component='th' scope='row'>
          {agendamento.laboratorio}
        </TableCell>
        <TableCell scope='row'>
          {dataFormatter(new Date(agendamento.data).toDateString(), {})}
        </TableCell>
        <TableCell >{`${dataFormatter(new Date(agendamento.horarioInicio).toDateString(), { type: 'HH:mm' })} às ${dataFormatter(new Date(agendamento.horarioFim).toDateString(), { type: 'HH:mm' })}`}</TableCell>
      </TableRow>))) :
      (<TableRow>
        <TableCell scope='row' colSpan={3}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FindInPageOutlinedIcon color='inherit' />
            <Typography variant='h6' >
              Sem agendamentos
            </Typography>
          </div>
        </TableCell>
      </TableRow>
      )}
  </>);
}

export default TableDataRow;