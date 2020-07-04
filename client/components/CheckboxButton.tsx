import React, { Component } from "react";
import { withStyles, createStyles, FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = ({ palette }) =>
  createStyles({
    checkbox: {
      width: 30,
      height: 30,
    },
    iconStyle: {
      color: palette.primary.main,
      fontSize: 30,
    },
    formControl: {
      color: palette.primary.main,
      position: "relative",
      overflow: "hidden",
      "& .MuiFormControlLabel-label": {
        fontSize: 30,
        paddingBottom: 3,
      },
      "& .MuiCircularProgress-root": {
        height: "30px !important",
      },
    },
  });

interface Props {
  text: string;
  onClick: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  isCancel?: boolean;
  isLoading?: boolean;
  classes: Record<string, any>;
  // TODO: add {size} to control size from outside
}

export class CheckboxButton extends Component<Props> {
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

  handleClick = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    event.preventDefault();

    this.setState({
      checked: true,
      pressed: true,
    });

    this.props.onClick(event);
  };

  render() {
    const { isCancel, text, classes, isLoading } = this.props;
    const { checked } = this.state;

    return (
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
            checkedIcon={
              isLoading ? (
                <CircularProgress className={classes.iconStyle} />
              ) : isCancel ? (
                <CloseIcon className={classes.iconStyle} />
              ) : (
                <CheckBoxIcon className={classes.iconStyle} />
              )
            }
          />
        }
        label={text}
      />
    );
  }
}

export default withStyles(styles)(CheckboxButton);
