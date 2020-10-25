import React, { useEffect, useState } from 'react'
import {
  getAllMorty,
  getAllRick,
  getInfoMorty,
  getInfoRick,
} from '../../actions/main-actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { RootState } from '../../store/ducks'
import { Box, Button, Grid, Typography } from '@material-ui/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import Character from '../../models/character'
import './style.scss'

const PageInformation = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const currentRick: Character = useSelector(
    (state: RootState) => state?.main.currentRick
  )

  return (
    <>
      <Box className={'containerTop'}>
        <Typography className="textLogo">Rick and Morty Cards</Typography>
        <Button
          variant="contained"
          className="buttorBackHome"
          onClick={() => history.push('/')}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </Button>
      </Box>
      <Grid container spacing={0} justify="center" alignContent="center">
        <Box className="informationContainer" key={currentRick?.id}>
          <Grid item xs>
            <img
              className="containerImage"
              alt={currentRick?.name}
              key={currentRick?.id}
              src={currentRick?.image}
            />
          </Grid>
          <Grid item xs style={{ paddingRight: 40 }}>
            <Typography className="textoPrincipal">
              Name: <p className="textoSecundario">{currentRick?.name}</p>
            </Typography>
            <Typography className="textoPrincipal">
              Dimension:
              <p className="textoSecundario">{currentRick?.origin?.name}</p>
            </Typography>
            <Typography className="textoPrincipal">
              Status: <p className="textoSecundario">{currentRick?.status}</p>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography className="textoPrincipal">
              Species:
              <p className="textoSecundario">{currentRick?.species}</p>
            </Typography>
            <Typography className="textoPrincipal">
              Gender: <p className="textoSecundario">{currentRick?.gender}</p>
            </Typography>
            <Typography className="textoPrincipal">
              Location:
              <p className="textoSecundario">{currentRick?.location?.name}</p>
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            xs
          >
            <Box className="buttonContainerInfo">
              <Button variant="contained" className="buttorHistory">
                History
              </Button>
              <Button variant="contained" className="buttorNewTravel">
                New Travel
              </Button>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export default PageInformation
