/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-return-await */
import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useHistory } from 'react-router'
import IItemList from 'src/types/IItemList'
import { useQuery, useQueryClient } from 'react-query'
import { getItemsData } from 'src/utils/api/api'
import { Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

interface Column {
  id: 'id' | 'title' | 'price' | 'category' | 'rating'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'id', label: '№', minWidth: 5 },
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
  // {
  //   id: 'rating',
  //   label: 'Rating',
  //   minWidth: 10,
  //   align: 'center',
  // },
]
const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})

export function ItemListMU() {
  const style = useStyles()
  const queryClient = useQueryClient()
  console.log(queryClient.getQueryData('items'))
  const history = useHistory()

  const { data, error, isLoading, isError } = useQuery('items', getItemsData, {
    placeholderData: () => {
      const currtentItem: any = queryClient.getQueryData('items')
      console.log('chache', currtentItem)
      return currtentItem ?? null
    },
    onError() {
      history.push('/')
    },
    retry: 2,
    retryDelay: 2000,
  })

  console.log('data', data)
  console.log('error', error)
  console.log('isLoading', isLoading)
  console.log('isError', isError)

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  console.log(isLoading)

  if (data !== null) {
    console.log(data[0]['rating.rate'])
  }
  if (data === null)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
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
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: IItemList) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Link to={`/items/${row.id}`} className={style.link}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </Link>
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
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
