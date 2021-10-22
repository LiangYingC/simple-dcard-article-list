import { useEffect } from 'react';
import GlobalStyle from './styles/globalStyle';

const App = () => {
  useEffect(() => {
    fetch('http://localhost:3000/v2/posts')
      .then(data => {
        return data.json();
      })
      .then(data => console.log(data));
  });
  return (
    <>
      <GlobalStyle />
      <div>Hello World !</div>
    </>
  );
};

export default App;
