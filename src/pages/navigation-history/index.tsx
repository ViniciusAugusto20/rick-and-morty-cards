import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import { RootState } from '../../store/ducks'
import './style.scss'
import 'react-toastify/dist/ReactToastify.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
const PageNavigation = () => {
  const dispatch = useDispatch()
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

  // Parte responsável pelo controle da tabela
  const [page, setPage] = React.useState(0)
  const emptyRows = 6 - Math.min(8, historyOfNavigationRick.length - page * 6)
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }
  //Notificações para o usuário
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <Box className="containerPagina">
        <Box className={'containerTop'}>
          <Typography className="textLogo">Rick and Morty Cards</Typography>
          <Button
            variant="contained"
            className="buttorBackHome"
            onClick={() => history.push('/information')}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to information
          </Button>
        </Box>
        <Box className="containerListagem">
          <TableContainer component={Paper}>
            <Table>
              <TableHead className={'tableHead'}>
                <TableRow>
                  <TableCell className={'tableCellHeadFirst'}>Name</TableCell>
                  <TableCell className={'tableCellHead'}>Origin</TableCell>
                  <TableCell className={'tableCellHead'}>Destine</TableCell>
                  <TableCell className={'tableCellHead'}>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(6 > 0
                  ? historyOfNavigationRick.slice(page * 6, page * 6 + 6)
                  : historyOfNavigationRick
                ).map(navigation => (
                  <TableRow key={navigation.name}>
                    <TableCell component="th" scope="row">
                      {navigation.name}
                    </TableCell>
                    <TableCell align="center">
                      {navigation.origin.name || 'Vazia'}
                    </TableCell>
                    <TableCell align="center">
                      {navigation.destine.name || 'Vazio'}
                    </TableCell>
                    <TableCell align="center">
                      {navigation.time || 'Vazio'}
                    </TableCell>
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
