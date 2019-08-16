import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'//高阶组件
import { Provider } from 'react-redux'
@withReduxStore
class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default MyApp;