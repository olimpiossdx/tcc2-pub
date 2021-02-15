import React from 'react';
import Content from '../content';
import Footer from '../footer';
import Header from '../header';

const Main: React.FC = ({ children }) => {
  return (<>
    <Header />
    <Content>
      {children}
    </Content>
    <Footer />
  </>)
}

export default Main;
