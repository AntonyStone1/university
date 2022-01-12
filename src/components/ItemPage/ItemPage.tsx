/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { Box, Button, Skeleton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useHistory, useParams } from 'react-router'
import { setRating, getItem } from 'src/utils/api/api'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'

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
  },
})

const ItemPage = () => {
  const { id }: any = useParams()
  const {
    data,
    error,
    isLoading,
    isError,
  }: { data: any; error: any; isLoading: boolean; isError: boolean } = useQuery(
    ['items', { id }],
    getItem,
  )

  const queryClient = useQueryClient()
  const [isRated, setRated] = useState(false)
  const { mutateAsync, isLoading: isMutation } = useMutation(setRating)
  const { register, reset, getValues, handleSubmit } = useForm({ defaultValues: { rating: '...' } })

  const createObj = (e: React.MouseEvent) => {
    e.stopPropagation()
    const result = { rating: { rate: '' }, id: '' }
    result.rating.rate = getValues('rating')
    result.id = id
    setRated((prev) => !prev)
    console.log(result)
    return result
  }
  const addCom = async () => {
    await mutateAsync(data)
    queryClient.invalidateQueries('items')
  }
  useEffect(() => {
    if (!isLoading) {
      reset({ rating: data.rating.rate })
    }
  }, [isLoading])
  const history = useHistory()
  const style = useStyles()

  const handleClick = () => {
    history.push('/items')
  }
  if (isError) {
    throw new Error(error.message)
  }

  return (
    <div className={style.wrapper}>
      {isLoading || isMutation ? (
        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : (
        <Box className={style.content}>
          <ArrowBackIcon className={style.arrow} onClick={handleClick} />
          <Box className={style.containerInfo}>
            <Box className={style.imageContainer}>
              <img src={data?.image} className={style.itemImg} />
            </Box>
            <Box className={style.info}>
              <form>
                <Box>
                  <Typography variant="h2" sx={{ paddingBottom: '20px' }}>
                    {data?.price} $
                  </Typography>
                  <Typography variant="h4" sx={{ paddingBottom: '10px' }}>
                    {data?.title}
                  </Typography>

                  <Typography sx={{ paddingBottom: '20px' }}>{data?.description}</Typography>
                  <Typography variant="h5" sx={{ paddingBottom: '30px' }}>
                    <label htmlFor="rating">Rating</label>
                    <input
                      {...register('rating', {
                        required: true,
                        pattern: /^[1-9]+$/,
                      })}
                      name="rating"
                      id="rating"
                      className={style.input}
                      type="text"
                      disabled={!isRated}
                    />
                  </Typography>
                </Box>
                <Box>
                  {!isRated ? (
                    <Button variant="outlined" onClick={() => setRated(true)}>
                      Set rating
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      // type={isRated ? 'submit' : 'button'}
                      onClick={createObj}
                    >
                      Submit
                    </Button>
                  )}
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  )
}
export default ItemPage
