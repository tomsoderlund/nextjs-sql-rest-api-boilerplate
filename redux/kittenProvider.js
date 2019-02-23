import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { connect } from 'react-redux'
import reduxApi from './reduxApi.js'

const createStoreWithThunkMiddleware = applyMiddleware(thunkMiddleware)(createStore)
export const makeStore = (reduxState, enhancer) => createStoreWithThunkMiddleware(combineReducers(reduxApi.reducers), reduxState)
const mapStateToProps = (reduxState) => ({ kittens: reduxState.kittens }) // Use reduxApi endpoint names here

export const withKittens = (PageComponent) => connect(mapStateToProps)(PageComponent)
