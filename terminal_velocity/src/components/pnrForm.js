import React , {Component}from 'react';
import Grid from '@material-ui/core/Grid';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import PassengerInfo from './passengerInfo';
import NavigationList from './navigationList'
// const useStyles = makeStyles(theme => ({
//     margin: {
//       margin: theme.spacing(1),
//     },
//   }));
  

class PnrForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            pnr:"",
            divFlag:0
        }

    }
    onSubmitHandler = (e)=>{
        e.preventDefault();
        console.log(this.state.pnr)
        if(this.state.pnr.length>=6){
            axios({
                url: "http://10.64.31.59:8000/pnr-detail/"+this.state.pnr,
                method:'get',
            })
            .then((res)=>{
                console.log(res.data);
                sessionStorage.setItem('pnr-detail',JSON.stringify(res.data));
                var test = sessionStorage.getItem('pnr-detail');
                console.log(JSON.parse(test).name);
                console.log(res.data.destination);
                this.setState({divFlag:1})
                
            })
            .catch((err)=>{
                alert('Something went wrong') ;
                throw err;
            })
        }
        else{
            console.log("Invalid PNR");
            
        }
        

    }
    onChangeHandler = (e)=>{
        this.setState({[e.target.id]:e.target.value})
    }
    changeDiv = (e)=>{
        this.setState({divFlag:2})
    }
    render(){

        return(
            <div>
                {
                    this.state.divFlag===0?(
                        <div style={{marginTop:150}}>
                            <Grid xs={12} sm={12} justify="space-around" alignItems="center"  container>
                                <form onSubmit={this.onSubmitHandler}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <AirlineSeatReclineExtraIcon />
                                        </Grid>
                                        <Grid item>
                                            <TextField id="pnr" label="Enter your pnr" onChange={this.onChangeHandler}/>
                                        </Grid>
                                    
                                    </Grid>
                                    <Grid container spacing={1} alignItems="center" justify="flex-end" style={{marginTop:15}}>
                                        <Button variant="contained" color="primary" type="submit">
                                            Get Details
                                        </Button>
                                    </Grid>
                                </form>
                                
                            </Grid>
                            </div>
                    ):(null                    )
                }
                {
                    this.state.divFlag===1?(<PassengerInfo changeDiv={this.changeDiv}/>):(null)
                }
                {
                    this.state.divFlag===2?(<NavigationList />):(null)
                }


            </div>
            
        )
    }
}
export default PnrForm;





{/* <Grid container  >
                            <Grid item xs={12} spacing={12}>
                                <Button variant="contained" color="primary">
                                    Get Details
                                </Button>
                            </Grid>
                        </Grid> */}