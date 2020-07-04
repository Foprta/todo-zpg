import React, { Component } from "react";
import { connect } from "react-redux";
import {
  withStyles,
  InputLabel,
  FormControl,
  createStyles,
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import CheckboxButton from "../../components/CheckboxButton";
import { createUser } from "../../store/users/actions/auth";

const styles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    },
    main: {
      width: 300,
      display: "flex",
      flexDirection: "column",
      "& > :not(:last-child)": {
        marginBottom: 20,
      },
    },
    actionsBlock: {
      textAlign: "left",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
  });

interface Props {
  classes: Record<string, any>;
  createUser: Function;
  loading: boolean;
  errors: any;
}

export class Register extends Component<Props> {
  state = {
    email: "",
    password: "",
  };

  handleRegisterClick = () => {
    const { email, password } = this.state;

    this.props.createUser(email, password);
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { classes, loading } = this.props;
    const { email, password } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.main}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input
              required
              value={email}
              name="email"
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input
              required
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </FormControl>
          <div className={classes.actionsBlock}>
            <CheckboxButton
              text="register"
              onClick={this.handleRegisterClick}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.users.auth.loading,
  errors: state.users.auth.errors,
});

const mapDispatchToProps = { createUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Register));
