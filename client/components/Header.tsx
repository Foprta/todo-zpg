import React, { Component } from "react";
import { getText } from "../store/actions/api";
import { connect } from "react-redux";

export interface Props {
  text: string;
  getText: Function;
}

export class Header extends Component<Props> {
  componentDidMount() {
    // this.props.getText();
  }
  render() {
    const { text } = this.props;
    return <div>This is text {text}</div>;
  }
}

const mapStateToProps = (state) => ({
  text: state.api.text,
});

const mapDispatchToProps = { getText };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
