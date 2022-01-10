import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { Context } from 'src/components/context/context'
import { IItem } from '../ItemList/ItemList'

const ItemPage = () => {
  const itemData: Array<IItem> = useContext(Context)
  const { id }: any = useParams()
  console.log(+id)
  console.log('data', itemData)

  const currentItem = itemData.find((item) => item.id === +id)
  console.log(currentItem)

  return (
    <div className="container">
      <div className="info">
        <img />
        <h3>{currentItem?.title}</h3>
      </div>

      <div className="change-info" />
    </div>
  )
}
export default ItemPage
