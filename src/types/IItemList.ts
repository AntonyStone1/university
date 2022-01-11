export default interface IItemList {
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
