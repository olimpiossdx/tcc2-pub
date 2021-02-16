import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface IRouteProps extends RouteProps {
  isPrivate: boolean;
  component: React.ComponentType;
}

//TODO: Remover quando tiver o serviço de auth
const PrivateRoute: React.FC<IRouteProps> = ({ isPrivate = true, component: Component, ...rest }) => {
  return (<Route {...rest}
    render={({ location }) => {
      return isPrivate ?
        <Component /> :
        <Redirect to={{ pathname: isPrivate ? '/' : '/menu', state: { from: location } }} />
    }}/>)
}

export default PrivateRoute
