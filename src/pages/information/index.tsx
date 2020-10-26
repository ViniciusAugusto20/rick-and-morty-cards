import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../store/ducks'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import ICharacter from '../../models/character'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import ModalNavigation from './modal-navigation'

import './style.scss'

const PageInformation = () => {
  const history = useHistory()

  const currentRick: ICharacter = useSelector(
    (state: RootState) => state?.main.currentRick
  )
  const [openModalTravel, setOpenModalTravel] = useState(false)

  const closeModalNavigation = () => {
    setOpenModalTravel(false)
  }

  return (
    <>
      <Box className="containerTop">
        <ModalNavigation
          visible={openModalTravel}
          onCancel={closeModalNavigation}
        />
        <Typography className="textLogo">Rick and Morty Cards</Typography>
        <Button
          variant="contained"
          className="buttorBackHome"
          onClick={() => history.push('/')}
        >
          <FontAwesomeIcon style={{ paddingRight: 10 }} icon={faArrowLeft} />
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
            <Typography className="primaryText">
              Name:
              <Typography className="secondaryText">
                {currentRick?.name}
              </Typography>
            </Typography>
            <Typography className="primaryText">
              Dimension:
              <Typography className="secondaryText">
                {currentRick?.origin?.name}
              </Typography>
            </Typography>
            <Typography className="primaryText">
              Status:
              <Typography className="secondaryText">
                {currentRick?.status}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography className="primaryText">
              Species:
              <Typography className="secondaryText">
                {currentRick?.species}
              </Typography>
            </Typography>
            <Typography className="primaryText">
              Gender:
              <Typography className="secondaryText">
                {currentRick?.gender}
              </Typography>
            </Typography>
            <Typography className="primaryText">
              Location:
              <Typography className="secondaryText">
                {currentRick?.location?.name}
              </Typography>
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Box className="buttonContainerInfo">
              <Button
                variant="contained"
                className="buttorHistory"
                onClick={() => history.push('/navigation')}
              >
                History
              </Button>
              <Button
                variant="contained"
                className="buttorNewTravel"
                onClick={() => setOpenModalTravel(true)}
              >
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
