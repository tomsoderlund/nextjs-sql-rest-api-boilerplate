import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import reduxApi, { transformers } from 'redux-api'
import adapterFetch from 'redux-api/lib/adapters/fetch'
// import { Provider, connect } from 'react-redux'

const { config } = require('../config/config')

const jsonOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
}

const apiTransformer = function (data, prevData, action) {
  const actionMethod = _.get(action, 'request.params.method')
  switch (actionMethod) {
    case 'POST':
      return [...prevData, data]
    case 'PUT':
      return prevData.map(oldData => oldData.id === data.id ? data : oldData)
    case 'DELETE':
      return _(prevData).filter(oldData => oldData.id === data.id ? undefined : oldData).compact().value()
    default:
      return transformers.array.call(this, data, prevData, action)
  }
}

// redux-api documentation: https://github.com/lexich/redux-api/blob/master/docs/DOCS.md
const thisReduxApi = reduxApi({

  // Simple endpoint description
  // oneKitten: '/api/kittens/:id',

  // Complex endpoint description
  kittens: {
    url: '/api/kittens/:id',
    crud: true, // Make CRUD actions: https://github.com/lexich/redux-api/blob/master/docs/DOCS.md#crud

    // base endpoint options `fetch(url, options)`
    options: jsonOptions,

    // reducer (state, action) {
    //  console.log('reducer', action);
    //  return state;
    // },

    // postfetch: [
    //  function ({data, actions, dispatch, getState, request}) {
    //    console.log('postfetch', {data, actions, dispatch, getState, request});
    //    dispatch(actions.kittens.sync());
    //  }
    // ],

    // Reimplement default `transformers.object`
    // transformer: transformers.array,
    transformer: apiTransformer

  }

})
  .use('fetch', adapterFetch(fetch))
  .use('rootUrl', config.appUrl)

export default thisReduxApi
