import React from "react";

import { TableRow, TableCell } from "@material-ui/core";
import { IAgendamentoModel } from "../../pages/laboratorio-agendados/model";
import { dataFormatter } from "../../utils/formatted";

const TableDataRow: React.FC<{ agendamentos: IAgendamentoModel[] }> = ({ agendamentos }) => {
  return (<>
    {agendamentos.map(agendamento => (
      <TableRow key={agendamento.id} hover>
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

export default TableDataRow;