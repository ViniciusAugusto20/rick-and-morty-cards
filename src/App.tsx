import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PageGridInitial from './pages/grid-list'
import PageInformation from './pages/information'
import PageNavigation from './pages/navigation-history'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import 'moment/locale/pt-br'
import './App.scss'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={'pt-br'}>
          <BrowserRouter>
            <Switch>
              <Route exact={true} path="/" component={PageGridInitial} />
              <Route
                exact={true}
                path="/information"
                component={PageInformation}
              />
              <Route path="/navigation" component={PageNavigation} />
            </Switch>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </Provider>
    )
  }
}

export default App
