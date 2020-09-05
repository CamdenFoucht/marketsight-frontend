import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Watchlist from './screens/Watchlist';
import { useAuth } from './Provider/Auth';
import Landing from './screens/Landing/Landing';
import Auth from './screens/Auth/Auth';
import StockProfile from './screens/StockProfile';
import Movers from './screens/Movers/Movers';
import News from './screens/News/News';
import Account from './screens/Account/Account';

const Routes = (props: any) => {
  const { token } = useAuth();

  const protectedRoutes = (
    <Switch>
      <Route path='/account'>
        <Account setIsDark={props.setIsDark} isDark={props.isDark} />
      </Route>
      <Route path='/watchlist'>
        <Watchlist />
      </Route>
      <Route path='/news' exact>
        <News />
      </Route>
      <Route path='/movers' exact>
        <Movers />
      </Route>
      <Route path='/stocks/:ticker'>
        <StockProfile />
      </Route>
      <Redirect to='/watchlist' />
    </Switch>
  );

  const unprotectedRoutes = (
    <Switch>
      <Route path='/landing'>
        <Landing />
      </Route>
      <Route path='/login'>
        <Auth />
      </Route>
      <Route path='/signup'>
        <Auth />
      </Route>
      <Redirect to='/landing' />
    </Switch>
  );

  return token ? protectedRoutes : unprotectedRoutes;
};

export default Routes;
