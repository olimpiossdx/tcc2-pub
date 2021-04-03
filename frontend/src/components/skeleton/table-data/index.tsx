import { TableRow, TableCell, Skeleton } from '@material-ui/core'

const TableDataAnimatedLoading = () =>
(<>
  <TableRow component='tr'>
    <TableCell>
      <Skeleton height={36} />
    </TableCell>
    <TableCell>
      <Skeleton height={36} />
    </TableCell>
    <TableCell>
      <Skeleton height={36} />
    </TableCell>
  </TableRow>
  <TableRow component='tr'>
    <TableCell>
      <Skeleton height={36} />
    </TableCell>
    <TableCell>
      <Skeleton height={36} />
    </TableCell>
    <TableCell>
      <Skeleton height={36} />
    </TableCell>
  </TableRow>
  <TableRow component='tr'>
    <TableCell>
      <Skeleton height={36} />
    </TableCell>
    <TableCell>
      <Skeleton height={36} />
    </TableCell>
    <TableCell>
      <Skeleton height={36} />
    </TableCell>
  </TableRow>
</>);

export default TableDataAnimatedLoading
