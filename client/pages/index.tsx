import React, { Component } from "react";
import { connect } from "react-redux";
import WelcomeScreen from "../components/WelcomeScreen";
import { IUser } from "../store/users/reducers/user";
import Layout from "../components/Layout";
import Tasks from "./tasks";
import { Router, useRouter } from "next/router";
import App from "next/app";
import { getCurrentUser } from "../store/users/actions/user";

interface Props {
  classes: Record<string, any>;
  token: string;
  user: IUser;
}

export const Index = (props: Props) => {
  const router = useRouter();

  const { user } = props;

  if (user) router.push("/tasks");

  return <WelcomeScreen />;
};

Index.getInitialProps = async (ctx) => {
  const { user } = ctx.store.getState().users.user;

  if (user) {
    ctx.res.writeHead(302, { Location: "/tasks" });
    ctx.res.end();
  }
};

const mapDispatchToProps = {};

const mapStateToProps = (state: any) => ({
  user: state.users.user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
