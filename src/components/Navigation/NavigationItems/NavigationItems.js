import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css"

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            { props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null };
            { props.isAuth
                ? <NavigationItem link="/logout">LogOut</NavigationItem>
                : <NavigationItem link="/auth">Authentication</NavigationItem>
            }
        </ul>
    );
};

export default NavigationItems;