import React, {Component} from "react";
import { connect } from "react-redux"

import Aux from "../Aux/Aux";
import classes from "./Layout.module.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    sideDrawerToggleHandler={ this.sideDrawerToggleHandler }
                    isAuth={ this.props.isAuthenticate }
                />
                <SideDrawer
                    open={ this.state.showSideDrawer }
                    sideDrawerCloseHandler={ this.sideDrawerCloseHandler }
                    isAuth={ this.props.isAuthenticate }
                />
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
  return {
      isAuthenticate: state.auth.token !== null
  }
};

export default connect( mapStateToProps )( Layout );