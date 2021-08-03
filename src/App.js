import './App.css';
import { HashRouter as Router , Switch , Route, Redirect} from 'react-router-dom';
import { bookingRoutes,adminRoutes, userRoutes } from './routes'
import Frame from './components/Frame/index'
import { isLogined } from './utils/auth';
import React from 'react'


function App() {
  return isLogined()?(
    <Frame>
      <Switch>
        {bookingRoutes.map(route=>{
          return(
            <Route 
              key={route.path} 
              exact={route.exact} 
              path={route.path} 
              render={routeProps=>{
                return <route.component{...routeProps} />
              }}
            />
          )
        })}
        {adminRoutes.map(route=>{
          return(
            <Route 
              key={route.path} 
              exact={route.exact} 
              path={route.path} 
              render={routeProps=>{
                return <route.component{...routeProps} />
              }}
            />
          )
        })}
        {userRoutes.map(route=>{
          return(
            <Route 
              key={route.path} 
              exact={route.exact} 
              path={route.path} 
              render={routeProps=>{
                return <route.component{...routeProps} />
              }}
            />
          )
        })}
        <Redirect to='/404' />
      </Switch>
    </Frame>
  ) : (
    <Redirect to='/login' />
  )
}

export default App;
