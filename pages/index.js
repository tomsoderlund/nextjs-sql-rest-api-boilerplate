import React, { Component } from 'react'

export default class IndexPage extends Component {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
  }

  render () {
    return <div>
      IndexPage: {this.state.isLoading}
    </div>
  }
}
