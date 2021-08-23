import './App.css';
import { HashRouter as Router , Switch , Route, Redirect} from 'react-router-dom';
import { bookingRoutes,adminRoutes, userRoutes, DashboardRoutes } from './routes'
import Frame from './components/Frame/index'
import React from 'react'


function App() {
  return (
    <Frame>
      <Switch>
      {DashboardRoutes.map(route=>{
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
  ) 
}

export default App;
