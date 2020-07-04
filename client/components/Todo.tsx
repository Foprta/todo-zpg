import React, { Component, Fragment } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { changeTodoState } from "../store/tasks/actions/todo";
import { connect } from "react-redux";
import { withStyles, createStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const styles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      position: "relative",
    },
    deleteButton: {
      position: "absolute",
      right: -10,
    },
  });

export interface ITodo {
  IsDone: boolean;
  Text: string;
  ID: number;
  changeTodoState: Function;
}

export interface Props {
  todo: ITodo;
  changeTodoState: Function;
  classes: any;
}

export class Todo extends Component<Props> {
  state = {
    checked: this.props.todo.IsDone,
  };

  handleClick = (event) => {
    const {
      todo: { ID },
    } = this.props;

    this.setState({
      checked: event.target.checked,
    });

    this.props.changeTodoState(ID, event.target.checked);
  };

  render() {
    const {
      todo: { Text, ID },
      classes,
    } = this.props;

    const { checked } = this.state;

    return (
      <div className={classes.root}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              onClick={this.handleClick}
              checked={checked}
            />
          }
          label={Text}
        />
        <CloseIcon className={classes.deleteButton} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  changeTodoState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Todo));
