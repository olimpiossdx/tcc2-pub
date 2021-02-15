import React from 'react';
import Content from '../content';
import Header from '../header';

const Main: React.FC = ({ children }) => {
  return (<>
    <Header />
    <Content>
      {children}
    </Content>
  </>)
}

export default Main;
