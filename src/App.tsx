import { FC } from 'react';
import GlobalStyle from './styles/globalStyle';
import Articles from './components/Articles';

const App: FC = () => {
  return (
    <>
      <GlobalStyle />
      <Articles />
    </>
  );
};

export default App;
