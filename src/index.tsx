import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from "miragejs"
import { App } from './App';
import { GlobalStyle } from './styles/global';

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions:[
        {
          id: 1,
          title: 'Freelancer website',
          amount: 400,
          type: 'deposit',
          category: 'Dev',
          createdAt: new Date()
        },
        {
          id: 2,
          title: 'Comida',
          amount: 200,
          type: 'withdraw',
          category: 'Food',
          createdAt: new Date()
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      data.createdAt = new Date()

      return schema.create('transaction', data)
    })
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);