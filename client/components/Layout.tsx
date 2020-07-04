import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getTodos, createTodo } from "../store/tasks/actions/todo";
import { logOut } from "../store/users/actions/auth";
import Todo, { ITodo } from "./Todo";
import { withStyles, createStyles, Input } from "@material-ui/core";
import GameMain from "./game/GameMain";

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
    view: {
      padding: "10px",
      width: "85%",
    },
  });

interface Props {
  classes: Record<string, any>;
}

export class Layout extends Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.menu}> Menu</div>
        <div className={classes.view}>
          <GameMain />
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
