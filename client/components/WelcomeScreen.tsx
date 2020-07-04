import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import CheckboxLink from "./CheckboxLink";

const styles = ({ palette, breakpoints }) =>
  createStyles({
    main: {
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      [breakpoints.only("xs")]: {
        flexDirection: "column",
      },
    },
    welcomeText: {
      color: palette.primary.main,
      textAlign: "right",
      fontSize: 70,
      [breakpoints.only("xs")]: {
        textAlign: "center",
        fontSize: 60,
      },
    },
    divider: {
      width: 1,
      margin: 10,
      height: 400,
      backgroundColor: palette.primary.main,
      borderRadius: "50%",
      [breakpoints.only("xs")]: {
        width: 300,
        height: 1,
      },
    },
    actionsBlock: {
      textAlign: "left",
      fontSize: 70,
      display: "flex",
      flexDirection: "column",
      [breakpoints.only("xs")]: {
        fontSize: 70,
      },
    },
  });

interface Props {
  classes: Record<string, any>;
}

export class WelcomeScreen extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <div className={classes.welcomeText}>
          Welcome to
          <br />
          my ToDo
        </div>
        <div className={classes.divider}></div>
        <div className={classes.actionsBlock}>
          <div>
            <CheckboxLink text="login" link="/authorization" />
          </div>
          <div>
            <CheckboxLink text="register" link="/authorization/register" />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WelcomeScreen);
