import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ItemPage from 'src/components/ItemPage/ItemPage'
import ItemList from './components/ItemList/ItemList'
import apiClient from './utils/api/apiClient'
import PATHS from './utils/api/Path'
import { Context } from './components/context/context'

function App() {
  const [itemData, setItemDataData] = useState([])

  async function getUserData() {
    const getData = () => apiClient.get(PATHS.getUserData)
    const data = await getData()
    console.log(data)

    setItemDataData(data.data)
  }
  useEffect(() => {
    getUserData()
  }, [])
  console.log(itemData)
  return (
    <Router>
      <Switch>
        <Context.Provider value={itemData}>
          <Route exact path="/items">
            <ItemList />
          </Route>
          <Route path="/items/:id">
            <ItemPage />
          </Route>
          <Redirect from="" to="/items" />
        </Context.Provider>
      </Switch>
    </Router>
  )
}

export default App
