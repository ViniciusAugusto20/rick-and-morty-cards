import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
} from '@material-ui/core'

import {
  getInfoLocation,
  getAllLocation,
  setTravelHistory,
} from '../../../actions/main-actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/ducks'
import { useHistory } from 'react-router-dom'
import INavigation from '../../../models/navigation'
import ICharacter from '../../../models/character'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { showToast } from '../../../components/toast'
import moment from 'moment'
import './style.scss'

interface IModalNavigation {
  visible?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

const ModalNavigation = (props: IModalNavigation) => {
  const { visible, onCancel } = props

  const history = useHistory()
  const dispatch = useDispatch()

  const infoLocation = useSelector(
    (state: RootState) => state?.main.infoLocation
  )
  const allLocation = useSelector((state: RootState) => state?.main.allLocation)
  const currentRick: ICharacter = useSelector(
    (state: RootState) => state?.main.currentRick
  )

  const [newTravel, setNewTravel] = useState<INavigation>()
  const [concatenatedLocations] = useState([])

  const createPortalToTravel = () => {
    if (newTravel.destine !== undefined && newTravel.origin !== undefined) {
      dispatch(setTravelHistory(newTravel))
      onCancel()
      history.push('/portal')
    } else {
      showToast({
        type: 'error',
        message: 'Portal Gun Fail! Origin or Destine not defined.',
      })
    }
  }

  useEffect(() => {
    dispatch(getInfoLocation())
  }, [])

  useEffect(() => {
    let page = 1
    while (page <= infoLocation.pages) {
      dispatch(getAllLocation(page))
      page++
    }
  }, [infoLocation])

  useEffect(() => {
    concatenatedLocations.push(...allLocation)
  }, [allLocation])

  useEffect(() => {
    setNewTravel({
      ...newTravel,
      name: currentRick.name,
      time: moment().format('LLL'),
    })
  }, [])

  return (
    <>
      <Dialog open={visible}>
        <DialogTitle>
          <Typography className="TextModal">New Travel</Typography>
        </DialogTitle>
        <DialogContent className="containerModal">
          <Autocomplete
            id="combo-box-orgin"
            options={concatenatedLocations}
            getOptionLabel={option => option.name}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Origin"
              />
            )}
            onChange={(event: any, value: string | null) => {
              setNewTravel({ ...newTravel, origin: value })
            }}
          />
          <Autocomplete
            id="combo-box-destine"
            options={concatenatedLocations}
            getOptionLabel={option => option.name}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Destine"
              />
            )}
            onChange={(event: any, value: string | null) => {
              setNewTravel({ ...newTravel, destine: value })
            }}
          />
        </DialogContent>
        <DialogActions className="buttonContainerModal">
          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              size="medium"
              className="buttorCancel"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Box>
          <Box display="flex" flex={2} flexDirection="row-reverse">
            <Button
              size="medium"
              variant="contained"
              className="buttorStartTravel"
              onClick={createPortalToTravel}
            >
              Start Travel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default ModalNavigation
