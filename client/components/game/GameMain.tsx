import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodos, createTodo } from "../../store/tasks/actions/todo";
import { logOut } from "../../store/users/actions/auth";
import Todo, { ITodo } from "../Todo";
import { withStyles, createStyles, Input } from "@material-ui/core";
import Player from "./Player";
import Enemy from "./Enemy";

const styles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "stretch",
      alignItems: "stretch",
      height: "100vh",
    },
    game: {
      height: "30%",
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid black",
    },
    divider: {
      width: "100%",
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
}

export class GameMain extends Component<Props> {
  state = {
    newTodo: "",
    ws: null,
    gui: null,
  };

  componentDidMount() {
    this.props.getTodos();
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

  logout = () => {
    this.props.logOut();
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
    const { newTodo, gui } = this.state;

    const { player, enemy } = Object(gui);

    const todosMarkup = todos.length
      ? todos.map((todo) => <Todo key={todo.ID} todo={todo} />)
      : null;

    return (
      <div className={classes.root}>
        <div className={classes.game}>
          <div>{player ? <Player player={player} /> : null}</div>
          <div className={classes.divider}></div>
          <div>{enemy ? <Enemy enemy={enemy} /> : null}</div>
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GameMain));
