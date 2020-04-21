import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { makeStore } from "../store";
import { Store } from "redux";
import Axios from "axios";

Axios.defaults.baseURL = "http://172.18.0.3:80";

interface Props {
  store: Store;
}

export class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(makeStore)(MyApp);
