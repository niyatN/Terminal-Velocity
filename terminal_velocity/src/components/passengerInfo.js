import React , {Component}from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles , withStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import axios from 'axios'
const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: 20,
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: '#d7eff7'
    },
    button:{
        padding: theme.spacing(2),
        textAlign:'center',
        marginTop:5,
        justify:"left" 
    }

  });
  

class PassengerInfo extends Component{
    constructor(props){
        super(props);
        this.state ={
            entry_gate_no:""
        }
    }
    componentDidMount(){
        
        axios({
            url: "http://10.64.31.59:8000/entry-gate-detail/"+JSON.parse(sessionStorage.getItem('pnr-detail')).flightno,
            method:'get',
        })
        .then((res)=>{
            console.log(res.data);
            this.setState({entry_gate_no:res.data.entryGateNo})
            sessionStorage.setItem('nav-detail', JSON.stringify(res.data))
            
        })
        .catch((err)=>{
            alert('Something went wrong') ;
            throw err;
        })
    }

    render(){
        const { classes } = this.props;
        const pnr_detail = JSON.parse(sessionStorage.getItem('pnr-detail'))
        return(
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center" >
                    <Grid item xs={10} spacing={3}>
                        <Paper className={classes.paper} variant="outlined">Hi {pnr_detail.name}</Paper>
                    </Grid>
                    <Grid item xs={10} spacing={3}>
                        <Paper className={classes.paper} variant="outlined">Your flight no is {pnr_detail.flightno}</Paper>
                    </Grid>

                    <Grid item xs={10} spacing={3}>
                        <Paper className={classes.paper} variant="outlined">Drop off at gate no: {this.state.entry_gate_no}</Paper>
                    </Grid>
                    <Grid item xs={10} spacing={3}>
                        <Button className={classes.button} variant="contained" color="primary" onClick={this.props.changeDiv}>Navigate...</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(PassengerInfo);