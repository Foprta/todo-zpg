import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  withStyles,
  makeStyles,
  Theme,
  Hidden,
} from "@material-ui/core";
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
  health: (props) => {
    let health = 100 * (props.enemy.Health / props.enemy.MaxHealth);

    health = health > 0 ? health : 0;

    return {
      transition: "width 0.2s ease-in-out",
      width: `${health}%`,
      height: "100%",
      backgroundColor: "green",
    };
  },
}));

interface Props {
  enemy: any;
}

export const Enemy = (props: Props) => {
  const classes = useStyles(props);
  return (
    <div>
      <img
        className={classes.avatar}
        src="/assets/images/enemy.jpg"
        alt="No enemy image"
      />
      <div className={classes.healthBar}>
        <div className={classes.health}></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
