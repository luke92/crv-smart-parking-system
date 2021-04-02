import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { Switch, Route, Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import store from './store'
import theme from './config/theme'
import ROUTES from './constants/routes'
import initStyles from './styles/init'
import {
  Home,
  Audit,
  Parkings,
  Camera,
  CameraView,
  CameraViewStatesPark,
  CameraAdd,
  CameraEdit,
  CameraHomography,
  CameraSort,
  CameraPatent,
  CameraPatentView,
  CameraPatentAdd,
  CameraPatentEdit,
  CameraPatentHomography,
  ConfigureParkings,
  ConfigureParking,
  ConfigurePatents,
  ReportsCubes,
  ReportCubeEdit,
  ReportCubeView,
  ReportCubeAdd,
  Users
} from './pages'
import { createBrowserHistory } from 'history'
import Login from "./pages/Login";

const history = createBrowserHistory()

initStyles()
if (!localStorage.getItem('token')) {
  history.push('/Login')
}

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <Router history={history}>
          <Switch>
            <Route exact path={ROUTES.DEFAULT} component={Home} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.AUDIT} component={Audit} />
            <Route path={ROUTES.PARKINGS} component={Parkings} />
            <Route path={ROUTES.CAMERA} component={Camera} />
            <Route path={ROUTES.CAMERAVIEW} component={CameraView} />
            <Route path={ROUTES.CAMERAVIEWSTATESPARK} component={CameraViewStatesPark} />
            <Route path={ROUTES.CAMERAADD} component={CameraAdd} />
            <Route path={ROUTES.CAMERAEDIT} component={CameraEdit} />
            <Route path={ROUTES.CAMERAHOMOGRAPHY} component={CameraHomography} />
            <Route path={ROUTES.CAMERASORT} component={CameraSort} />
            <Route path={ROUTES.CAMERAPATENT} component={CameraPatent} />
            <Route path={ROUTES.CAMERAPATENTVIEW} component={CameraPatentView} />
            <Route path={ROUTES.CAMERAPATENTEDIT} component={CameraPatentEdit} />
            <Route path={ROUTES.CAMERAPATENTADD} component={CameraPatentAdd} />
            <Route path={ROUTES.CAMERAPATENTHOMOGRAPHY} component={CameraPatentHomography} />
            <Route path={ROUTES.CONFIGUREPARKINGS} component={ConfigureParkings} />
            <Route path={ROUTES.CONFIGUREPARKING} component={ConfigureParking} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.CONFIGUREPATENTS} component={ConfigurePatents} />
            <Route path={ROUTES.REPORTSCUBES} component={ReportsCubes} />
            <Route path={ROUTES.REPORTCUBEADD} component={ReportCubeAdd} />
            <Route path={ROUTES.REPORTCUBEEDIT} component={ReportCubeEdit} />
            <Route path={ROUTES.REPORTCUBEVIEW} component={ReportCubeView} />
            <Route path={ROUTES.USERS} component={Users} />
          </Switch>
        </Router>
      </Fragment>
    </ThemeProvider>
  </Provider>
)

export default App