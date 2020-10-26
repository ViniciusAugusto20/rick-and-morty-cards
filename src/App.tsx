import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PageGridInitial from './pages/grid-list'
import PageInformation from './pages/information'
import PageNavigation from './pages/navigation-history'
import PagePortal from './pages/portal'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import './App.scss'
import Toast from './components/toast'
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Toast />
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
              <Route path="/portal" component={PagePortal} />
            </Switch>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </Provider>
    )
  }
}

export default App
