import React, { Component, Fragment, useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { changeTodoState, deleteTodo } from "../../../store/tasks/actions/todo";
import { connect } from "react-redux";
import { withStyles, createStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { selectWeapon } from "../../../store/players/actions/player";

const styles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      position: "relative",
    },
    deleteButton: {
      cursor: "pointer",
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.1)",
      },
    },
  });

export interface IWeapon {
  IsActive: boolean;
  Damage: number;
  ID: number;
}

export interface Props {
  weapon: IWeapon;
  classes: any;
  selectWeapon: Function;
}

export const Weapon = (props: Props) => {
  const {
    classes,
    weapon: { Damage, ID },
  } = props;

  const handleClick = () => {
    props.selectWeapon(ID);
  };

  return (
    <div onClick={handleClick} className={classes.root}>
      {Damage}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  selectWeapon,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Weapon));
