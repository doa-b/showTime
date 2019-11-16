import {withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import React from "react";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolBar: {
        alignContent: 'space-around' // TODO werkt nog niet
    },
    avatar: {
        marginLeft: 10
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    }
});

const MyToolbar = withStyles(styles)(
    ({classes, title, onMenuClick, isLive, showName}) => (
        <>
            <AppBar className={classes.aboveDrawer}>
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        onClick={onMenuClick}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h5"
                        color="inherit"
                        className={classes.flex}
                    >
                        {(isLive) ? 'LIVE ' + showName : title}
                    </Typography>
                    <Avatar
                        className={classes.avatar}
                        alt='logged in user'
                        src='https://image.tmdb.org/t/p/original/i5kxTQ9GSGKY6CaI8F3cdwoF3KD.jpg'/>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}/>
        </>
    )
);

export default MyToolbar;