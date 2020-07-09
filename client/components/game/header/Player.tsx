import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles<Theme, Props>(({ palette, breakpoints }) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    alignItems: "stretch",
    height: "100vh",
  },
  avatar: {
    width: 200,
    heigth: 200,
    borderRadius: "50%",
  },
  healthBar: {
    width: 200,
    height: 8,
    borderRadius: 5,
    border: "1px solid grey",
    backgroundColor: "white",
    overflow: "hidden",
  },
  expBar: {
    width: 200,
    height: 8,
    borderRadius: 5,
    border: "1px solid grey",
    backgroundColor: "white",
    overflow: "hidden",
  },
  health: (props) => {
    let health = 100 * (props.player.Health / props.player.MaxHealth);

    health = health > 0 ? health : 0;

    return {
      width: `${health}%`,
      height: "100%",
      backgroundColor: "green",
    };
  },
  exp: (props) => {
    const maxExp = 100 + 50 * Math.pow(props.player.Level - 1, 1.5);
    const exp = 100 * (props.player.Experience / maxExp);

    return {
      width: `${exp}%`,
      height: "100%",
      backgroundColor: "lightgrey",
    };
  },
}));

interface Props {
  player: any;
}

export const Player = (props: Props) => {
  const classes = useStyles(props);
  return (
    <div>
      <img
        className={classes.avatar}
        src="/assets/images/player.jpg"
        alt="No player image"
      />
      <div className={classes.healthBar}>
        <div className={classes.health}></div>
      </div>
      <div className={classes.expBar}>
        <div className={classes.exp}></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
