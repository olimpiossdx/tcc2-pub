import { TableRow, TableCell, Skeleton } from '@material-ui/core'

const TableDataAnimatedLoading = () => {
  return (<>
    <TableRow>
      <TableCell component='th' scope='row'>
        <Skeleton  height={35} width={110} />
      </TableCell>
      <TableCell scope='row'>
        <Skeleton height={35} width={110} />
      </TableCell>
      <TableCell >
        <Skeleton height={35} width={110} />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell component='th' scope='row'>
        <Skeleton height={35} width={110} />
      </TableCell>
      <TableCell scope='row'>
        <Skeleton height={35} width={110} />
      </TableCell>
      <TableCell >
        <Skeleton height={35} width={110} />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell component='th' scope='row'>
        <Skeleton height={35} width={110} />
      </TableCell>
      <TableCell scope='row'>
        <Skeleton height={35} width={110} />
      </TableCell>
      <TableCell >
        <Skeleton height={35} width={110} />
      </TableCell>
    </TableRow>
  </>)
}

export default TableDataAnimatedLoading
