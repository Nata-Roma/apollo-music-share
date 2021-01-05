import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import theme from './theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://appolo-music-share.hasura.app/v1/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

