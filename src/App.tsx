import { useReactiveVar } from '@apollo/client';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';
import { darkModeVar, isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { darkTheme, GlogalStyles, lightTheme } from './styles';

interface IThemeProviderProps {
  theme: boolean
}

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlogalStyles />
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn
              ? <Home />
              : <Login />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
