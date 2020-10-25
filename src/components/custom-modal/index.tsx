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
} from '../../actions/main-actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/ducks'
import CustomTextField from '../custom-text-field'
import INavigation from '../../models/navigation'
import ICharacter from '../../models/character'
import Autocomplete from '@material-ui/lab/Autocomplete'
import moment from 'moment'
interface ICustomModal {
  visible?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

interface ITravelLocation {
  id: number
  name: string
  type: string
  dimension: string
}

const CustomModal = (props: ICustomModal) => {
  const { visible, onCancel } = props
  const infoLocation = useSelector(
    (state: RootState) => state?.main.infoLocation
  )
  const allLocation = useSelector((state: RootState) => state?.main.allLocation)
  const currentRick: ICharacter = useSelector(
    (state: RootState) => state?.main.currentRick
  )
  const [newTravel, setNewTravel] = useState<INavigation>()

  const [concatenatedLocations, setConcatenatedLocations] = useState([])
  const dispatch = useDispatch()

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
  const createPortalToTravel = () => {
    dispatch(setTravelHistory(newTravel))
    onCancel()
  }
  return (
    <Dialog className={'teste'} open={visible}>
      <DialogTitle>
        <Typography className={'DialogTitleUploadFile'}>
          Starting Trip
        </Typography>
      </DialogTitle>
      <DialogContent className={'ContainerUploadFile'}>
        <Autocomplete
          id="combo-box-demo"
          options={concatenatedLocations}
          getOptionLabel={option => option.name}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField {...params} variant="outlined" label="Origin" />
          )}
          onChange={(event: any, value: string | null) => {
            setNewTravel({ ...newTravel, origin: value })
          }}
        />
        <Autocomplete
          id="combo-box-demo"
          options={concatenatedLocations}
          getOptionLabel={option => option.name}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField {...params} variant="outlined" label="Origin" />
          )}
          onChange={(event: any, value: string | null) => {
            setNewTravel({ ...newTravel, destine: value })
          }}
        />
      </DialogContent>
      <DialogActions>
        <Box display="flex" flexDirection="column">
          <Button
            variant="contained"
            size="medium"
            className={'ButtonCancelUploadFile'}
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </Box>
        <Box display="flex" flex={2} flexDirection="row-reverse">
          <Button
            size="medium"
            variant="contained"
            className={'ButtonSendUploadFile'}
            onClick={createPortalToTravel}
          >
            Enviar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
export default CustomModal
