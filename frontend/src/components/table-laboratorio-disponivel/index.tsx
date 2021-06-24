import React from 'react';

import { TableRow, TableCell, Typography } from '@material-ui/core';
import { dataFormatter } from '../../utils/formatted';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import ILaboratorioDisponivel from '../../pages/laboratorio-disponiveis/model';

const LaboratorioDisponivelRow: React.FC<ILaboratorioDisponivel> = ({ blocoId, laboratorioId, laboratorioNome, data, horarioInicio, horarioFim }) => {
  return (<TableRow hover>
    <TableCell component='th' scope='row'>
      {laboratorioNome}
    </TableCell>
    <TableCell scope='row'>
      {dataFormatter(data, {})}
    </TableCell>
    <TableCell >{`${dataFormatter(horarioInicio, { type: 'HH:mm' })} às ${dataFormatter(horarioFim, { type: 'HH:mm' })}`}</TableCell>
  </TableRow>);
};

const TableLaboratorioDisponivel: React.FC<{ laboratoriosDisponiveis: ILaboratorioDisponivel[] }> = ({ laboratoriosDisponiveis }) => {
  return (<>
    {laboratoriosDisponiveis.length ? laboratoriosDisponiveis.map((laboratorioDisponivel, index) => <LaboratorioDisponivelRow key={index} {...laboratorioDisponivel} />) :
      (<TableRow>
        <TableCell scope='row' colSpan={3}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FindInPageOutlinedIcon color='inherit' />
            <Typography variant='h6' >
              Nenhum agendamento encontrado.
            </Typography>
          </div>
        </TableCell>
      </TableRow>)}
  </>);
};

export default TableLaboratorioDisponivel;