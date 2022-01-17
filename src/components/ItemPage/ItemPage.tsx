/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { Box, CircularProgress, Rating, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useHistory, useParams } from 'react-router'
import { setRating, getItem } from 'src/utils/api/api'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '70%',
    maxWidth: '980px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0px 2px 8px rgb(0 0 0 / 10%)',
    borderRadius: '20px',
  },
  arrow: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'black',
    transform: 'scale(1.5)',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  imageContainer: {
    marginRight: '10%',
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
  input: {
    border: 'none',
    backgroundImage: 'none',
    backgroundColor: 'transparent',
    webkitBoxShadow: 'none',
    mozBoxShadow: 'none',
    boxShadow: 'none',
    fontSize: '34px',
    width: '60px',
    marginLeft: 'auto',
    borderBottom: '1px solid black',
  },
  errorText: {
    position: 'absolute',
    top: '30px',
    left: '100px',
    fontSize: '10px',
    color: 'red',
  },
})

const ItemPage = () => {
  const history = useHistory()
  const queryClient = useQueryClient()

  const style = useStyles()
  const { id }: any = useParams()
  const { data, error, isError }: { data: any; error: any; isLoading: boolean; isError: boolean } =
    useQuery(['items', { id }], getItem, {
      placeholderData() {
        const cacheData: any = queryClient.getQueryData('items')
        const currentItem = cacheData?.find((item: { id: any }) => item.id === +id)
        console.log('chache', currentItem)
        return currentItem ?? null
      },
      onError() {
        history.push('/')
      },
      retry: 2,
      retryDelay: 2000,
    })
  const { mutateAsync } = useMutation(setRating)
  const [isRated, setRated] = useState(false)

  const clickHandler = async (e: any) => {
    if (e.target.value) {
      const formatData = { rate: e?.target?.value }
      setRated((prev) => !prev)
      console.log({ ...formatData, id })

      await mutateAsync({ ...formatData, id })
      queryClient.invalidateQueries('items')
    }
  }
  if (data === null) {
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
  }

  if (isError) {
    throw new Error(error.message)
  }

  return (
    <div className={style.wrapper}>
      <Box className={style.content}>
        <Link to="/items">
          <ArrowBackIcon className={style.arrow} />
        </Link>
        <Box className={style.containerInfo}>
          <Box className={style.imageContainer}>
            <img src={data?.image} className={style.itemImg} />
          </Box>
          <Box className={style.info}>
            <Box>
              <Typography variant="h2" sx={{ paddingBottom: '20px' }}>
                {data?.price} $
              </Typography>
              <Typography variant="h4" sx={{ paddingBottom: '10px' }}>
                {data?.title}
              </Typography>

              <Typography sx={{ paddingBottom: '20px' }}>{data?.description}</Typography>
              <Typography variant="h5" sx={{ paddingBottom: '30px' }}>
                <Rating
                  defaultValue={data.rating.rate}
                  precision={0.5}
                  readOnly={isRated}
                  onClick={(e) => clickHandler(e)}
                />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
export default ItemPage
