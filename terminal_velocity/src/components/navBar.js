import React , {Component}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

import AccountCircle from '@material-ui/icons/AccountCircle';
const useStyles = theme => ({
    root: {
        flexGrow: 1,
      },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
    },
    AppBar: {
        margin: 0
    },
    Avatar: {
      marginLeft:2
    }
});
class NavBar extends Component{
    

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Terminal Velocity
                </Typography>
                {
                  sessionStorage.getItem('pnr-detail')?
                  (<div>
                    <IconButton color="inherit" ><AccountCircle /></IconButton>
                  </div>)
                  
                  :(<IconButton color="inherit" ><AccountCircle /></IconButton>)
                }
                

               
                </Toolbar>
                
                
            </AppBar>
      </div>
        )
    }
}

export default withStyles(useStyles)(NavBar);
