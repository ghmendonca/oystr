import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import Main from './pages/Main'
import './css/tailwind.css'

const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.REACT_APP_API_URL || 'http://localhost/graphql'
    }),
    cache: new InMemoryCache()
})

ReactDOM.render(<div style={{backgroundColor: '#e2e8f0'}} className="min-h-screen">
    <ApolloProvider client={client}>
        <Main />
    </ApolloProvider>
</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
