import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { showToast } from '../../components/toast'

import portalTravel from '../../assets/images/portal.gif'

import './style.scss'

const PortalPage = () => {
  const history = useHistory()
  const [counter, setCounter] = useState(3)

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    if (counter === 0) {
      history.push('/')
      showToast({ type: 'success', message: 'Adventure started!' })
    }
  }, [counter])
  return (
    <Box className="containerPortal">
      <img className="imagePortal" src={portalTravel} />
      <Typography className="textPortal">Starting Adventure... </Typography>
    </Box>
  )
}
export default PortalPage
