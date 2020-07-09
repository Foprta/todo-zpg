import React, { Component, Fragment } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { changeTodoState, deleteTodo } from "../../../store/tasks/actions/todo";
import { connect } from "react-redux";
import { withStyles, createStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

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

export interface ITodo {
  IsDone: boolean;
  Text: string;
  ID: number;
  changeTodoState: Function;
}

export interface Props {
  todo: ITodo;
  changeTodoState: Function;
  deleteTodo: Function;
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

  deleteTodo = (event) => {
    const {
      todo: { ID },
    } = this.props;

    this.props.deleteTodo(ID);
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
        <CloseIcon onClick={this.deleteTodo} className={classes.deleteButton} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  changeTodoState,
  deleteTodo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Todo));
