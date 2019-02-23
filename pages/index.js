import React, { Component } from 'react'
import { Link } from '../server/routes.js'

export default class IndexPage extends Component {
  static getInitialProps ({ pathname, asPath, query }) {
    return { pathname, asPath, query }
  }

  render () {
    return <main>

      <h1>IndexPage: /{this.props.query.slug}</h1>

      <ul>
        <li><Link route='/about'><a>About</a></Link></li>
        <li><Link route='/more/contact'><a>Contact</a></Link></li>
      </ul>

      <style jsx>{`
        main {
          font-family: sans-serif;
          font-size: 20px;
        }
      `}</style>

    </main>
  }
}
