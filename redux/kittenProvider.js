import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { connect } from 'react-redux'
import reduxApi, { createStoreWithThunkMiddleware } from './reduxApi.js'

const mapStateToProps = (reduxState) => ({ kittens: reduxState.kittens }) // Use reduxApi endpoint names here

export const withKittens = (PageComponent) => connect(mapStateToProps)(PageComponent)
