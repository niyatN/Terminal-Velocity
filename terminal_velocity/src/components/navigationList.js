import React , {Component}from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import GridClass from './grid'
import axios from'axios'
const useStyles = theme => ({
  root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: 10,
      padding: theme.spacing(2),
      textAlign: 'center',
      border: 'solid #3f51b5 2px',
      innerHeight:50,
      flexDirection: "column",
      justifyContent: "center",
      fontSize:15
    },
});

class NavigationList extends Component {
    constructor(props){
      super(props)
      this.state = {
          airport_nav_detail:null
      }
    }
    
    componentDidMount(){
      // console.log("http://10.64.31.59:8000/nav-details?airport=sdds&airline="+JSON.parse(sessionStorage.getItem('nav-detail')).airline+"&gateno="+JSON.parse(sessionStorage.getItem('nav-detail')).boardingGateNo)
        
      axios({
        url:"http://10.64.31.59:8000/nav-details?airport=sdds&airline="+JSON.parse(sessionStorage.getItem('nav-detail')).airline+"&gateno="+JSON.parse(sessionStorage.getItem('nav-detail')).boardingGateNo,
        method:'get'
      })
      .then((res)=>{
          console.log(res.data);
          this.setState({entry_gate_no:res.data.entryGateNo})
          sessionStorage.setItem('airport-nav-detail',JSON.stringify(res.data))
          this.setState({airport_nav_detail:res.data},()=>console.log(this.state.airport_nav_detail.path1[0].time)
          )
      })
      .catch((err)=>{
          alert('Something went wrong.....') ;
          throw err;
      })
  }


  createList = (arr)=>{

    let g = []
    let l = arr.length
    for(let i = 0; i<l; i++){
      g.push(<li>{arr[i]}</li>)
    }
    console.log(g)
    return g;
  }
    render(){
      const { classes } = this.props; 
      const nav_detatil = JSON.parse(sessionStorage.getItem('nav-detail'))
      // const airport_nav_detail = JSON.parse(sessionStorage.getItem('-airport-nav-detail')).path
      // this.ss()
      return (
        <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center" >
                    <Grid item xs={10} spacing={3}>
                        <Paper className={classes.paper} variant="outlined">
                          <b>Terminal Gate: {nav_detatil.entryGateNo}</b><ArrowRightAltIcon fontSize="medium" /><b>Check-in gate </b>
                          <Typography variant="subtitle1" gutterBottom>
                            time:{ this.state.airport_nav_detail?<b>{this.state.airport_nav_detail.path1[0].time}mins </b>:null}
                            Distance:{ this.state.airport_nav_detail?<b>{this.state.airport_nav_detail.path1[0].dist}m </b>:null}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            Instructions:
                          </Typography>

                          {
                            this.state.airport_nav_detail?(
                              <ol>
                                {this.createList(this.state.airport_nav_detail.path1[0].instructions)}
                              </ol>
                            ):null
                          }
                        </Paper>

                    </Grid>

                    <Grid item xs={10} spacing={3}>
                        <Paper className={classes.paper} variant="outlined">
                          <b>Check-in Gate: </b><ArrowRightAltIcon fontSize="medium" /><b>Security Check-in</b>
                          <Typography variant="subtitle1" gutterBottom>
                          time:{ this.state.airport_nav_detail?<b>{this.state.airport_nav_detail.path1[1].time}mins </b>:null}
                            Distance:{ this.state.airport_nav_detail?<b>{this.state.airport_nav_detail.path1[1].dist}m </b>:null}
                          </Typography>

                          <Typography variant="subtitle1" gutterBottom>
                            Instructions:
                          </Typography>

                          {
                            this.state.airport_nav_detail?(
                              <ol>
                                {this.createList(this.state.airport_nav_detail.path1[1].instructions)}
                              </ol>
                            ):null
                          }

                        </Paper>
                    </Grid>
                    <Grid item xs={10} spacing={3}>
                        <Paper className={classes.paper} variant="outlined">
                          <b>Security Check-in</b><ArrowRightAltIcon fontSize="medium" /><b>Boarding Gate:{nav_detatil.boardingGateNo} </b>
                          <Typography variant="subtitle1" gutterBottom>
                          time:{ this.state.airport_nav_detail?<b>{this.state.airport_nav_detail.path1[2].time}mins </b>:null}
                            Distance:{ this.state.airport_nav_detail?<b>{this.state.airport_nav_detail.path1[2].dist}m </b>:null}
                          </Typography>

                          <Typography variant="subtitle1" gutterBottom>
                            Instructions:
                          </Typography>

                          {
                            this.state.airport_nav_detail?(
                              <ol>
                                {this.createList(this.state.airport_nav_detail.path1[2].instructions)}
                              </ol>
                            ):null
                          }

                        </Paper>
                    </Grid>
                    
                </Grid>
                {
                  this.state.airport_nav_detail?(
                    <GridClass airport_nav_detail={this.state.airport_nav_detail} />
                  ):null
                }

                
            </div>
      );
    }
    
  }
  
export default withStyles(useStyles)(NavigationList);
