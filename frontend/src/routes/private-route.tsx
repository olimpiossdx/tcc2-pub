import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../components/hooks/authentication';

interface IRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

//TODO: Remover quando tiver o serviço de auth
const PrivateRoute: React.FC<IRouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();
  return (<Route {...rest}
    render={({ location }) => {
      return isPrivate === !!user ? (<Component />) :
        (<Redirect to={{ pathname: isPrivate ? '/' : '/menu', state: { from: location } }} />)
    }} />)
}

export default PrivateRoute
