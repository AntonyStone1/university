/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useHistory, useParams } from 'react-router'
import { setRating, getItem } from 'src/utils/api/api'
import { useQuery, useMutation } from 'react-query'
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
    fontSize: '34px',
    width: '60px',
    marginLeft: '15px',
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
  const style = useStyles()
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
  const { mutateAsync } = useMutation(setRating)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { rating: '...' } })
  const [isRated, setRated] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      reset({ rating: data.rating.rate })
    }
  }, [isLoading])

  const onSubmit = async (formData: any) => {
    console.log({ ...formData, id })
    await mutateAsync({ ...formData, id })
  }
  const onFormSubmit = handleSubmit((formData) => {
    onSubmit(formData)
  })

  const handleClick = () => {
    history.push('/items')
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
  if (isError) {
    throw new Error(error.message)
  }
  const tobbleButton = () => {
    if (!errors.rating) {
      setRated((prev) => !prev)
    }
  }

  return (
    <div className={style.wrapper}>
      <Box className={style.content}>
        <ArrowBackIcon className={style.arrow} onClick={handleClick} />
        <Box className={style.containerInfo}>
          <Box className={style.imageContainer}>
            <img src={data?.image} className={style.itemImg} />
          </Box>
          <Box className={style.info}>
            <form onSubmit={onFormSubmit}>
              <Box>
                <Typography variant="h2" sx={{ paddingBottom: '20px' }}>
                  {data?.price} $
                </Typography>
                <Typography variant="h4" sx={{ paddingBottom: '10px' }}>
                  {data?.title}
                </Typography>

                <Typography sx={{ paddingBottom: '20px' }}>{data?.description}</Typography>
                <Typography
                  variant="h5"
                  sx={{ paddingBottom: '30px' }}
                  style={{ position: 'relative' }}
                >
                  <label htmlFor="rating">Rating</label>
                  <input
                    {...register('rating', {
                      required: true,
                      pattern: /^[1-5]+$/,
                    })}
                    name="rating"
                    id="rating"
                    className={style.input}
                    type="number"
                    disabled={!isRated}
                    autoComplete="off"
                  />
                  {errors?.rating?.type === 'required' && (
                    <p className={style.errorText}>This field is required</p>
                  )}
                  {errors?.rating?.type === 'pattern' && (
                    <p className={style.errorText}>Only nubmers from 0 to 5</p>
                  )}
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  style={isRated ? { pointerEvents: 'none', marginRight: '30px' } : {}}
                  onClick={() => setRated((prev) => !prev)}
                >
                  Set rating
                </Button>

                <Button
                  variant="outlined"
                  type="submit"
                  style={!isRated ? { display: 'none' } : {}}
                  onClick={tobbleButton}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
export default ItemPage
