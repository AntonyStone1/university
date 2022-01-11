import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useContext } from 'react'
import { useHistory } from 'react-router'
import IItemList from 'src/types/IItemList'
import { Context } from '../context/context'

interface Column {
  id: 'id' | 'title' | 'price' | 'category'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'id', label: '№', minWidth: 30 },
  { id: 'title', label: 'Title', minWidth: 100 },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
]

export default function ItemListMU() {
  const itemData = useContext(Context)
  const history = useHistory()

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const currentNumber = e.currentTarget.textContent?.slice(0, 1)
    console.log(e.currentTarget.textContent?.slice(0, 1))

    itemData.forEach((user: IItemList) => {
      if (currentNumber === undefined) {
        return
      }
      if (String(user.id) === currentNumber) {
        console.log(`/items/${currentNumber}`)

        history.push({ pathname: `/items/${currentNumber}` })
      }
    })
  }
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 590 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {itemData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: IItemList) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    style={{ cursor: 'pointer' }}
                    onClick={(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) =>
                      handleClick(e)
                    }
                  >
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={itemData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
