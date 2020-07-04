import React, { Component } from "react";
import { connect } from "react-redux";
import WelcomeScreen from "../components/WelcomeScreen";
import { IUser } from "../store/users/reducers/user";
import Layout from "../components/Layout";

interface Props {
  classes: Record<string, any>;
  token: string;
  user: IUser;
  getTasks: Function;
}

export class Index extends Component<Props> {
  static async getInitialProps(ctx) {}

  render() {
    const { user } = this.props;

    return user ? <Layout /> : <WelcomeScreen />;
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (state: any) => ({
  user: state.users.user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
