import {Tooltip, withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import {NavLink} from "react-router-dom";
import trinityLogo from '../../../assets/images/trinity-haircare-circles.png'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';


const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolBar: {
       alignItems: 'center'
    },
    avatar: {
        marginLeft: 'auto'
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    },
    logo: {
        height: 35,
        marginTop: 5,
        marginRight: 10
    }
});

const MyToolbar = withStyles(styles)(
    ({classes, title, onMenuClick, isLive, showName, showAllScenes, setShowAllScenes}) => (
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

                    <NavLink to='/'>
                        <img className={classes.logo} src={trinityLogo} alt='trinity logo'/>
                    </NavLink>
                    <Typography
                        variant="h5"
                        color="inherit"
                        className={classes.flex}
                    >
                        {(isLive) ? 'LIVE ' + showName : title}
                    </Typography>
                    <IconButton
                        className={classes.fold}
                        color="inherit"
                        aria-label="Fold"
                        onClick={() => setShowAllScenes(!showAllScenes)}
                    > <Tooltip title='show/hide scenes' placement='left-end'>
                        {(showAllScenes) ? <UnfoldLessIcon/>: <UnfoldMoreIcon/>}
                    </Tooltip>
                    </IconButton>
                    <Avatar
                        className={classes.avatar}
                        alt='logged in user'
                        src='http://djdoa.nl/DJDoa_WebPages/__Old_Website/doa_avatar_small.jpg'/>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}/>
        </>
    )
);

export default MyToolbar;