import React, { Component } from "react";
import { connect } from "react-redux";
import { getWeapons } from "../../store/players/actions/player";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Weapon from "../../components/game/weapons/Weapon";

const styles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "stretch",
      alignItems: "stretch",
    },
  });

interface Props {
  getWeapons: Function;
  classes: Record<string, any>;
  weapons: any[];
}

export class Weapons extends Component<Props> {
  componentDidMount() {
    this.props.getWeapons();
  }

  static getLayout = (page) => <Layout>{page}</Layout>;

  render() {
    const { weapons } = this.props;

    const weaponsMarkup = weapons
      ? weapons.map((weapon) => <Weapon weapon={weapon}></Weapon>)
      : "Оружий нет";

    return <div>{weaponsMarkup}</div>;
  }
}

const mapStateToProps = (state) => ({
  weapons: state.players.player.weapons,
});

const mapDispatchToProps = { getWeapons };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Weapons));
