import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { darkModeVar, isLoggedInVar, client } from './apollo';
import Layout from './components/Layout';
import routes from './routes';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import Profile from './screens/Profile';
import Signup from './screens/Signup';
import { darkTheme, GlogalStyles, lightTheme } from './styles';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlogalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn
                  ? <Layout><Home /></Layout>
                  : <Login />}
              </Route>
              {!isLoggedIn
                ? (
                  <Route path={routes.signUp}>
                    <Signup />
                  </Route>
                )
                : null
              }
              <Route path={`/users/:username`}>
                <Profile />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
