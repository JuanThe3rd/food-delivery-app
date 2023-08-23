import React from "react";
import { Switch, Route } from "react-router-dom";
import Account from './Account';
import Checkout from './Checkout';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Restaurant from './Restaurant';


function App() {
  return (
    <Switch>
      <Route exact path='/'>
        {<Login />}
      </Route>
      <Route path='/register'>
        {<Register />}
      </Route>
      <Route path='/home'>
        {<Home />}
      </Route>
      <Route path='/restaurant'>
        {<Restaurant />} 
      </Route>
      <Route path='/account'>
        {<Account />}
      </Route>
      <Route path='/checkout'>
        {<Checkout />}
      </Route>
    </Switch>
  );
}

export default App;
