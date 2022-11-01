import Vue from 'vue';
import App from './App.vue';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import VueApollo from 'vue-apollo';

Vue.config.productionTip = false;

const getHeaders = () => {
  const headers = {'x-hasura-admin-secret': '3tEQC7H1lvDTtscJwdCnjQJ5jE2veFZARP5nwSA5a8N90kTJWkPGR8lf4CzsG0Rh'};
   const token = window.localStorage.getItem('apollo-token');
   if (token) {
     headers.authorization = `Bearer ${token}`;
   }
   return headers;
 };

const httpLink = new HttpLink({
  uri: 'https://thankful-loon-65.hasura.app/v1/graphql',
  headers: getHeaders()
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App)
});
