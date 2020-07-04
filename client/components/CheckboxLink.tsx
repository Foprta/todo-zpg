import React, { Component } from "react";
import { withStyles, createStyles, FormControlLabel } from "@material-ui/core";
import Link from "next/link";
import Checkbox from "@material-ui/core/Checkbox";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const styles = ({ palette }) =>
  createStyles({
    checkbox: {
      width: 50,
      height: 50,
    },
    iconStyle: {
      color: palette.primary.main,
      fontSize: 50,
    },
    formControl: {
      color: palette.primary.main,
      position: "relative",
      overflow: "hidden",
      "& .MuiFormControlLabel-label": {
        fontSize: 50,
        paddingBottom: 3,
      },
      "&::after": {
        content: "''",
        top: 63,
        position: "absolute",
        width: "100%",
        backgroundColor: palette.primary.main,
        height: 1,
        transform: "translateX(-100%)",
        transition: "all 0.2s ease-in",
      },
      "&:hover": {
        "&::after": {
          transform: "translateX(0)",
          transition: "all 0.2s ease-out",
        },
      },
    },
  });

interface Props {
  text: string;
  link: string;
  linkAs?: string;
  classes: Record<string, any>;
  // TODO: add {size} to control size from outside
}

export class CheckboxLink extends Component<Props> {
  state = {
    checked: false,
    pressed: false,
  };

  handleMouseEnter = () => {
    if (this.state.pressed) return;
    this.setState({
      checked: true,
    });
  };

  handleMouseLeave = () => {
    if (this.state.pressed) return;
    this.setState({
      checked: false,
    });
  };

  handleClick = () => {
    this.setState({
      checked: true,
      pressed: true,
    });
  };

  render() {
    const { link, text, classes, linkAs } = this.props;
    const { checked } = this.state;

    return (
      <Link href={link} as={linkAs ? linkAs : link}>
        <FormControlLabel
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          className={classes.formControl}
          control={
            <Checkbox
              size="small"
              className={classes.checkbox}
              checked={checked}
              icon={<CheckBoxOutlineBlankIcon className={classes.iconStyle} />}
              checkedIcon={<CheckBoxIcon className={classes.iconStyle} />}
            />
          }
          label={text}
        />
      </Link>
    );
  }
}

export default withStyles(styles)(CheckboxLink);
