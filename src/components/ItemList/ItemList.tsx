import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import { Context } from 'src/components/context/context'

interface IItem {
  id: number
  category: string
  price: number
  description: string
  image: string
  title: string
  rating: {
    count: number
    rate: number
  }
}

const AntdUserList = () => {
  const itemData = useContext(Context)
  const history = useHistory()
  const { id }: any = useParams()
  console.log('id', id)

  const handleClick = (e: { id: number }) => {
    itemData.forEach((user: IItem) => {
      if (user.id === e.id) {
        console.log(`/items/${e.id}`)

        history.push({ pathname: `/items/${e.id}` })
      }
    })
  }

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'Price',
      sorter: (a: { price: number }, b: { price: number }) => a.price - b.price,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'name',
    },
  ]
  return (
    <Table
      dataSource={itemData}
      columns={columns}
      rowClassName="atnd_row-styles"
      onRow={(e: { id: number }) => ({
        onClick: () => handleClick(e),
      })}
    />
  )
}

export default AntdUserList
