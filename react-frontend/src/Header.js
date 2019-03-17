import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    paddingTop: 70
  },
};

const Header = ({ classes }) => (
  <div className={classes.root}>
    <AppBar>
      <Toolbar>
        <Typography variant="h5" color="inherit">
          Les Waste
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(Header);
