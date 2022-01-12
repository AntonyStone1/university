import React, { useContext } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useHistory, useParams } from 'react-router'
import { Context } from 'src/components/context/context'
import IItemList from 'src/types/IItemList'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid  blue',
    height: '99.5vh',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '70%',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0px 2px 8px rgb(0 0 0 / 10%)',
    borderRadius: '20px',
  },
  arrow: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    cursor: 'pointer',
  },
  imageContainer: {
    marginRight: '7%',
    width: '150px',
  },
  itemImg: {
    width: '100%',
  },
  containerInfo: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  info: {
    width: '60%',
    padding: '10px',
  },
})

const ItemPage = () => {
  const itemData: Array<IItemList> = useContext(Context)
  const history = useHistory()
  const { id }: any = useParams()
  const style = useStyles()
  console.log('data', itemData)

  const handleClick = () => {
    history.push('/items')
  }
  const currentItem = itemData.find((item) => item.id === +id)
  console.log(currentItem)

  return (
    <div className={style.wrapper}>
      <Box className={style.content}>
        <ArrowBackIcon className={style.arrow} onClick={handleClick} />
        <Box className={style.containerInfo}>
          <Box className={style.imageContainer}>
            <img src={currentItem?.image} className={style.itemImg} />
          </Box>
          <Box className={style.info}>
            <Box>
              <Typography variant="h2" sx={{ paddingBottom: '20px' }}>
                {currentItem?.price}$
              </Typography>
              {/* <input type="textarea" value={currentItem?.title} /> */}
              <Typography variant="h4" sx={{ paddingBottom: '10px' }}>
                {currentItem?.title}
              </Typography>

              <Typography sx={{ paddingBottom: '20px' }}>{currentItem?.description}</Typography>
              <Typography variant="h5" sx={{ paddingBottom: '30px' }}>
                {currentItem?.rating.rate}
              </Typography>
            </Box>
            <Box>
              <Button variant="outlined">Add comment</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
export default ItemPage
