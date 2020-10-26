import React, { useEffect, useState } from 'react'
import {
  getAllMorty,
  getAllRick,
  getInfoMorty,
  getInfoRick,
  setRickEdit,
  setLastPage,
} from '../../actions/main-actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../store/ducks'
import { Box, Grid, Typography } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import ICharacter from '../../models/character'

import logoImage from '../../assets/images/logoImage.jpg'
import defaultImgMorty from '../../assets/images/defaultImgMorty.png'

import './style.scss'

const PageGridInitial = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const allRick = useSelector((state: RootState) => state?.main.allRick)
  const allMorty = useSelector((state: RootState) => state?.main.allMorty)
  const infoMorty = useSelector((state: RootState) => state?.main.infoMorty)
  const infoRick = useSelector((state: RootState) => state?.main.infoRick)

  const lastpageRender = useSelector(
    (state: RootState) => state?.main.lastPageRander
  )

  const [concatenatedMortys] = useState([])
  const [page, setPage] = useState(lastpageRender)

  const handleChangePage = (event, value) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setPage(value)
    dispatch(setLastPage(value))
  }

  const handleChangeToPageInformation = (characther: ICharacter) => {
    dispatch(setRickEdit(characther))
    history.push('/information')
  }

  useEffect(() => {
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
      <Box className="containerLogo">
        <img alt="Logo" className="imageLogo" src={logoImage} />
        <Typography className="textLogo">Rick and Morty Cards</Typography>
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
                <Typography className="primaryText">
                  Name:
                  <Typography className="secondaryText">
                    {characther.name}
                  </Typography>
                </Typography>
                <Typography className="primaryText">
                  Dimension:
                  <Typography className="secondaryText">
                    {characther.origin.name}
                  </Typography>
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
                    )?.image || defaultImgMorty
                  }
                />
                <Typography className="primaryText">
                  Name:
                  <Typography className="secondaryText">
                    {concatenatedMortys.find(
                      currentMorty =>
                        currentMorty.name ==
                        characther.name.replace('Rick', 'Morty')
                    )?.name || characther.name.replace('Rick', 'Morty')}
                  </Typography>
                </Typography>
                <Typography className="primaryText">
                  Dimension:
                  <Typography className="secondaryText">
                    {characther.origin.name}
                  </Typography>
                </Typography>
              </>
            </Grid>
          </Box>
        ))}
      </Grid>
      <Box className="containerPagination">
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
