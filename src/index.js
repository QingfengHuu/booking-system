import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import 'antd/dist/antd.css'
import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import { mainRoutes } from './routes';

ReactDOM.render(
      <Router>
        <Switch>
          <Route path='/booking' render={routeProps=><App {...routeProps} />} />
          <Route path='/dashboard' render={routeProps=><App {...routeProps} />} />
          <Route path='/admin' render={routeProps=><App {...routeProps} />} />
          {/* <Route path='/admin/terminal/edit/:id' render={routeProps=><App {...routeProps} />} />
          <Route path='/admin/user' render={routeProps=><App {...routeProps} />} />
          <Route path='/admin/order' render={routeProps=><App {...routeProps} />} /> */}
          <Route path='/user/account' render={routeProps=><App {...routeProps} />} />
          {mainRoutes.map(route=>{
            return <Route key={route.path} {...route} />
          })}
          <Redirect to='/dashboard' from='/' />
          <Redirect to='/404' />
        </Switch>
      </Router>
      ,document.getElementById('root')
)
