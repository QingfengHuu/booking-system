import './App.css';
import { HashRouter as Router , Switch , Route} from 'react-router-dom';
import { bookingRoutes } from './routes'
import Frame from './components/Frame/index'

function App() {
  return (
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
      </Switch>
    </Frame>
      
  );
}

export default App;
