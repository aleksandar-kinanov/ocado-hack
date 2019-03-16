import React from 'react';
import Header from './Header';
import Card from './Card';

const App = () => {
  return (
    <>
      <Header />
      <Card text='oranges' image='https://capitaltrick.com/wp-content/uploads/2018/12/Orange.jpg' />
      <Card text='apples' image='https://i0.wp.com/www.healthline.com/hlcmsresource/images/News/021417_gmofood_THUMB_LARGE.jpg?w=1155' />
    </>
  );
};

export default App;
