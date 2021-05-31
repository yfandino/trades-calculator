import {
  Checkbox, Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

function Table({ rows, columns, selectable, onSelect }) {
  return (
    <TableContainer>
      <MuiTable size="small">
        <TableHead>
          <TableRow>
            {selectable && (
              <TableCell />
            )}
            {columns.map(head => (
              <TableCell key={head.id}>
                {head.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {selectable && (
                <TableCell>
                  <Checkbox value={row.id} onChange={onSelect}/>
                </TableCell>
              )}
              {columns.map(column => (
                <CustomCell key={column.id} row={row} cell={column} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;

const CustomCell = ({ row, cell }) => {
  const value = cell.getValue ? cell.getValue(row[cell.id]) : row[cell.id];
  const className = typeof cell.className === "function"
    ? cell.className(row[cell.id])
    : cell.className;
  return <TableCell className={className}>{value}</TableCell>
}