import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ItemPage from 'src/components/ItemPage/ItemPage'
import { Container } from '@mui/material'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ItemList from './components/ItemList/ItemList'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/items">
            <Container>
              <ItemList />
              {/* <ItemListMU /> */}
            </Container>
          </Route>
          <Route path="/items/:id">
            <ItemPage />
          </Route>
          <Redirect from="" to="/items" />
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default App
