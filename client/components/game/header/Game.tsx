import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, createStyles } from "@material-ui/core";
import Player from "./Player";
import Enemy from "./Enemy";

const styles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
    },
    divider: {
      width: "100%",
    },
  });

interface Props {
  classes: Record<string, any>;
}

export class Game extends Component<Props> {
  state = {
    ws: null,
    gui: null,
  };

  componentDidMount() {
    const ws = new WebSocket("ws://api.todo-zpg.com/ws");
    ws.onmessage = (evt) => {
      let gui = JSON.parse(evt.data);
      this.setState({ gui });
    };
    this.setState({ ws });
  }

  componentWillUnmount() {
    this.state.ws.close();
  }

  render() {
    const { classes } = this.props;
    const { gui } = this.state;

    const { player, enemy } = Object(gui);

    return (
      <div className={classes.root}>
        <div>{player ? <Player player={player} /> : null}</div>
        <div className={classes.divider}></div>
        <div>{enemy ? <Enemy enemy={enemy} /> : null}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Game));
