import { get } from 'lodash'
import fetch from 'isomorphic-fetch'

import reduxApi, { transformers } from 'redux-api'
import adapterFetch from 'redux-api/lib/adapters/fetch'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { connect } from 'react-redux'

const { config } = require('../config/config')

const jsonOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
}

const apiTransformer = function (newItem, oldItems, action) {
  const actionMethod = get(action, 'request.params.method')
  switch (actionMethod) {
    case 'POST':
      return [...oldItems, newItem]
    case 'PUT':
      return oldItems.map(oldItem => oldItem.id === newItem.id ? Object.assign({}, oldItem, newItem) : oldItem)
    case 'DELETE':
      return oldItems.filter(oldItem => oldItem.id !== newItem.id)
    default:
      return transformers.array.call(this, newItem, oldItems, action)
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

const createStoreWithThunkMiddleware = applyMiddleware(thunkMiddleware)(createStore)
export const makeStore = (reduxState, enhancer) => createStoreWithThunkMiddleware(combineReducers(thisReduxApi.reducers), reduxState)

// endpointNames: Use reduxApi endpoint names here
const mapStateToProps = (endpointNames, reduxState) => {
  let props = {}
  for (let i in endpointNames) {
    props[endpointNames[i]] = reduxState[endpointNames[i]]
    props[`${endpointNames[i]}Actions`] = thisReduxApi.actions[endpointNames[i]]
  }
  return props
}

export const withReduxEndpoints = (PageComponent, endpointNames) => connect(mapStateToProps.bind(undefined, endpointNames))(PageComponent)
// Define custom endpoints/providers here:
export const withKittens = PageComponent => withReduxEndpoints(PageComponent, ['kittens'])
