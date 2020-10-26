import React from 'react'
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../store/ducks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

const PageNavigation = () => {
  const history = useHistory()
  const navigationHistory = useSelector(
    (state: RootState) => state?.main.travelHistory
  )

  const currentRick = useSelector((state: RootState) => state?.main.currentRick)

  let historyOfNavigationRick = []
  navigationHistory.map(rick => {
    if (rick.name == currentRick.name) {
      historyOfNavigationRick.push(rick)
    }
  })

  const [page, setPage] = React.useState(0)
  const emptyRows = 6 - Math.min(8, historyOfNavigationRick.length - page * 6)
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  return (
    <>
      <Box className="containerPage">
        <Box>
          <Typography className="textLogo">Rick and Morty Cards</Typography>
          <Button
            variant="contained"
            className="buttonBackHome"
            onClick={() => history.push('/information')}
          >
            <FontAwesomeIcon style={{ paddingRight: 10 }} icon={faArrowLeft} />
            Back to information
          </Button>
        </Box>
        <Box className="containerList">
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="tableHead">
                <TableRow>
                  <TableCell className="tableCellHeadFirst">Name</TableCell>
                  <TableCell className="tableCellHead">Origin</TableCell>
                  <TableCell className="tableCellHead">Destine</TableCell>
                  <TableCell className="tableCellHead">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(6 > 0
                  ? historyOfNavigationRick.slice(page * 6, page * 6 + 6)
                  : historyOfNavigationRick
                ).map(navigation => (
                  <TableRow key={navigation?.name}>
                    <TableCell component="th" scope="row">
                      {navigation?.name}
                    </TableCell>
                    <TableCell align="center">
                      {navigation?.origin?.name}
                    </TableCell>
                    <TableCell align="center">
                      {navigation?.destine?.name}
                    </TableCell>
                    <TableCell align="center">{navigation?.time}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={historyOfNavigationRick.length}
                    rowsPerPageOptions={[0]}
                    rowsPerPage={6}
                    page={page}
                    SelectProps={{
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}
export default PageNavigation
