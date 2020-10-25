import React, { useEffect, useState } from 'react'
import {
  getAllMorty,
  getAllRick,
  getInfoMorty,
  getInfoRick,
  setRickEdit,
} from '../../actions/main-actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { RootState } from '../../store/ducks'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import logoImage from '../../assets/images/logoImage.jpg'
import defaultImg from '../../assets/images/defaultImg.jpeg'
import ICharacter from '../../models/character'
import './style.scss'

const PageGridInitial = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const allRick = useSelector((state: RootState) => state?.main.allRick)
  const allMorty = useSelector((state: RootState) => state?.main.allMorty)
  const infoMorty = useSelector((state: RootState) => state?.main.infoMorty)
  const infoRick = useSelector((state: RootState) => state?.main.infoRick)

  const [concatenatedMortys, setConcatenatedMortys] = useState([])
  const [page, setPage] = useState(1)

  const handleChangePage = (event, value) => {
    setPage(value)
  }
  const handleChangeToPageInformation = (characther: ICharacter) => {
    dispatch(setRickEdit(characther))
    history.push('/information')
  }
  useEffect(() => {
    dispatch(getAllRick('rick', page))
    dispatch(getInfoMorty('Morty'))
    dispatch(getInfoRick('Rick'))
  }, [])

  useEffect(() => {
    dispatch(getAllRick('Rick', page))
  }, [page])

  useEffect(() => {
    let page = 1
    while (page <= infoMorty.pages) {
      dispatch(getAllMorty('Morty', page))
      page++
    }
  }, [infoMorty])

  useEffect(() => {
    concatenatedMortys.push(...allMorty)
  }, [allMorty])

  return (
    <>
      <Box className={'containerLogo'}>
        <img alt="Logo" className={'imageLogo'} src={logoImage} />
        <Typography className="textLogo">Rick and Morty Cards</Typography>
      </Box>
      <Box className={'containerPagination'}>
        <Pagination
          count={infoRick.pages}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <Grid container spacing={0} justify="center">
        {allRick.map((characther: ICharacter) => (
          <Box
            className="cardContainer"
            key={characther.id}
            onClick={() => handleChangeToPageInformation(characther)}
          >
            <Grid item xs>
              <>
                <img
                  className="containerImage"
                  alt={characther.name}
                  key={characther.id}
                  src={characther.image}
                />
                <Typography className="textoPrincipal">
                  Name: <p className="textoSecundario">{characther.name}</p>
                </Typography>
                <Typography className="textoPrincipal">
                  Dimension:
                  <p className="textoSecundario">{characther.origin.name}</p>
                </Typography>
              </>
            </Grid>
            <Grid style={{ paddingLeft: 5 }} key={characther.id} item xs>
              <>
                <img
                  className="containerImage"
                  key={
                    concatenatedMortys.find(
                      currentMorty =>
                        currentMorty.name ==
                        characther.name.replace('Rick', 'Morty')
                    )?.id
                  }
                  src={
                    concatenatedMortys.find(
                      currentMorty =>
                        currentMorty.name ==
                        characther.name.replace('Rick', 'Morty')
                    )?.image || defaultImg
                  }
                />
                <Typography className="textoPrincipal">
                  Nome:
                  <p className="textoSecundario">
                    {concatenatedMortys.find(
                      currentMorty =>
                        currentMorty.name ==
                        characther.name.replace('Rick', 'Morty')
                    )?.name || characther.name.replace('Rick', 'Morty')}
                  </p>
                </Typography>
                <Typography className="textoPrincipal">
                  Dimensão:
                  <p className="textoSecundario">{characther.origin.name}</p>
                </Typography>
              </>
            </Grid>
          </Box>
        ))}
      </Grid>
      <Box className={'containerPagination'}>
        <Pagination
          count={infoRick.pages}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </>
  )
}

export default PageGridInitial
