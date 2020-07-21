import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { makeStore } from "../store";
import { Store } from "redux";
import { ThemeProvider, withStyles } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import globalStyles, { themeColors } from "../utils/theme";
import { parseCookies } from "nookies";
import { getCurrentUser } from "../store/users/actions/user";
import { addAuthHeader } from "../utils/axios";

const theme = createMuiTheme(themeColors);

interface Props {
  store: Store;
}

export class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }) {
    if (ctx.isServer) {
      const { token } = parseCookies(ctx);
      if (token) {
        addAuthHeader(token);
        await ctx.store.dispatch(getCurrentUser());
      }
      if (!token && ctx.req.url != "/") {
        ctx.res.writeHead(302, { Location: "/" });
        ctx.res.end();
      }
    }

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  UNSAFE_componentWillMount() {
    // FIXME: how to addAuthToken properly?

    const { token } = parseCookies();
    if (token) {
      addAuthHeader(token);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    const getLayout = Component["getLayout"] || ((page) => page);

    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {getLayout(<Component {...pageProps}></Component>)}
        </Provider>
      </ThemeProvider>
    );
  }
}

export default withRedux(makeStore)(withStyles(globalStyles)(MyApp));
