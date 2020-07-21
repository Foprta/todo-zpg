import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodos, createTodo } from "../../store/tasks/actions/todo";
import { logOut } from "../../store/users/actions/auth";
import Todo, { ITodo } from "../../components/game/tasks/Todo";
import Input from "@material-ui/core/Input";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import { NextRouter, withRouter } from "next/router";

const styles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "stretch",
      alignItems: "stretch",
    },
    todos: {
      width: "300px",
      height: "70%",
    },
    todoList: {
      display: "flex",
      flexDirection: "column",
    },
  });

interface Props {
  getTodos: Function;
  todos: ITodo[];
  logOut: Function;
  classes: Record<string, any>;
  createTodo: Function;
  router: NextRouter;
}

export class Tasks extends Component<Props> {
  state = {
    newTodo: "",
  };

  componentDidMount() {
    this.props.getTodos();
  }

  componentWillUnmount() {}

  logout = () => {
    this.props.logOut(this.props.router);
  };

  create = () => {
    this.props.createTodo(this.state.newTodo);
    this.setState({
      newTodo: "",
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { todos, classes } = this.props;
    const { newTodo } = this.state;

    const todosMarkup = todos.length
      ? todos.map((todo) => <Todo key={todo.ID} todo={todo} />)
      : null;

    return (
      <div className={classes.root}>
        <div className={classes.todos}>
          <Input name="newTodo" value={newTodo} onChange={this.handleChange} />
          <button onClick={this.create}>Create</button>
          <div className={classes.todoList}>{todosMarkup}</div>
        </div>
        <button onClick={this.logout}>Logout</button>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.tasks.todo.todos,
});

const mapDispatchToProps = { getTodos, logOut, createTodo };

const Page = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Tasks)));

Page["getLayout"] = (page) => <Layout>{page}</Layout>;

export default Page;
