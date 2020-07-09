import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, createStyles } from "@material-ui/core";
import Game from "./game/header/Game";
import Tasks from "../pages/tasks";
import { Router } from "next/router";
import Link from "next/link";

const styles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "stretch",
      alignItems: "stretch",
      height: "100vh",
    },
    menu: {
      padding: "10px",
      width: "15%",
      borderRight: "1px solid black",
    },
    game: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "stretch",
      alignItems: "stretch",
      width: "100%",
    },
    header: {
      height: "30%",
    },
    view: {
      padding: "10px",
      width: "85%",
    },
  });

interface Props {
  classes: Record<string, any>;
  children: Component;
}

export class Layout extends Component<Props> {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.menu}>
          <Link href="/tasks">
            <a>Home</a>
          </Link>
          <br />
          <Link href="/weapons">
            <a>Weapons</a>
          </Link>
        </div>
        <div className={classes.game}>
          <div className={classes.header}>
            <Game />
          </div>
          <div className={classes.view}>{children}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Layout));
