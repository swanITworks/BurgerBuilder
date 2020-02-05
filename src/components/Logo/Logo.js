import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css"

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="My Burger Logo"/>
        </div>
    )
};

export default Logo;