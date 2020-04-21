import React, { Component } from "react";
import { getText } from "../store/actions/api";
import { connect } from "react-redux";
import Header from "../components/Header";

interface Props {
  text?: string;
}

export class Index extends Component<Props> {
  static async getInitialProps({ store }) {
    const { text } = await store.dispatch(getText());
    return { text };
  }

  render() {
    return (
      <div>
        Hello Next.js {this.props.text}
        <Header />
      </div>
    );
  }
}

const mapDispatchToProps = { getText };

const mapStateToProps = (state: any) => ({
  text: state.api.text,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
