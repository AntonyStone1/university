import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, CircularProgress } from '@mui/material'
import { useQuery, useQueryClient } from 'react-query'
import { getItemsData } from 'src/utils/api/api'
import { useHistory } from 'react-router'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'title', headerName: 'Title', width: 600 },
  { field: 'price', headerName: 'Price', width: 100 },
  {
    field: 'category',
    headerName: 'Category',
    type: 'string',
    width: 100,
  },
]

export default function ItemList() {
  const history = useHistory()
  const queryClient = useQueryClient()
  console.log(queryClient.getQueryData('items'))
  const { data, isLoading } = useQuery('items', getItemsData)
  const clickHandler = (e: any) => {
    history.push(`items/${e.id}`)
  }

  if (isLoading)
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
    <div style={{ height: 630, width: '82%', margin: '0 auto' }}>
      <DataGrid
        autoPageSize
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellClick={(e) => clickHandler(e)}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}
