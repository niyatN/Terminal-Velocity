import React , {Component}from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
      },
      square:{
          width: 15,
          height: 15,
        //   backgroundColor: '#dcedf2',
          margin:0.1,
          border:'solid white 2px',
          
      },
      table:{
          marginBottom:10,
          border:'solid black 2px'
      }
});
// %
class GridClass extends Component{
    constructor(props){
        console.log(props)
        super(props);
        this.state = {
            matrix:null,
            airport_nav_detail:this.props.airport_nav_detail
        }

    }

    isPresent =(arr,e)=>{
        for(let i = 0; i<arr.length; i++){
            if(arr[i][0]==e[0]&&arr[i][1]==e[1]){
                return true
            }
        }
        return false
    }

    createGrid=(matrix)=>{
        let p1 = this.state.airport_nav_detail.path1[0].path
        let p2 = this.state.airport_nav_detail.path1[1].path
        let p3 = this.state.airport_nav_detail.path1[2].path
        console.log(p1)
        const { classes } = this.props;
        let r = 10//matrix.length
        let c = 20//matrix[0].length
        let g = []
        for(let i = 9; i>=0; i--){
            let children = []
            for(let j = 0; j<c; j++){
                
                if(matrix[i][j]==2){
                    children.push(<td className={classes.square} style={{backgroundColor:'#d1e024'}}></td>)
                }
                else if(matrix[i][j]=="S"){
                    children.push(<td className={classes.square} style={{backgroundColor:'black'}}></td>)
                }
                else if(matrix[i][j]=="G"){
                    children.push(<td className={classes.square} style={{backgroundColor:'#fc6060'}}></td>)
                }
                else if(matrix[i][j]=="E"){
                    children.push(<td className={classes.square} style={{backgroundColor:'#c542f5'}}></td>)
                }
                else if(matrix[i][j]=="C"){
                    children.push(<td className={classes.square} style={{backgroundColor:'#57de54'}}></td>)
                }
                else if(this.isPresent(p1,[i,j]) || this.isPresent(p2,[i,j]) ||this.isPresent(p3,[i,j]) ){
                    console.log("1111");
                    
                    children.push(<td className={classes.square} style={{backgroundColor:'blue'}}></td>)
                }
                else if(matrix[i][j]==0){
                    children.push(<td className={classes.square} style={{backgroundColor:'white'}}></td>)
                }
                
            }
            g.push(<tr key={i}>{children}</tr>)
        }
        return g;
    }
    componentDidMount=()=>{
        axios({
            url: "http://10.64.31.59:8000/airport-map",
            method:'get',
        })
        .then((res)=>{
            console.log(res.data);
            this.setState({matrix:res.data})
    
        })
        .catch((err)=>{
            alert('Something went wrong.....') ;
            throw err;
        })
    }
    render(){
        const { classes } = this.props;
        return(
            <div>
            <Grid container direction="row" justify="center" alignItems="center" style={{marginTop:25,marginBottom:10}}>
                
               {
                
                   this.state.matrix?(
                    <table className={classes.table}>
                        {/* {this.createGrid(this.state.matrix)} */}
                        {
                            this.createGrid(this.state.matrix.airportMatrix)
                            
                        }
                    </table>):null
               }
               
               <Grid item xs={12}>
                    <span style={{backgroundColor: '#d1e024'}}>Wall/Shop</span>
               </Grid>
               <Grid item xs={12}>
                    <span style={{backgroundColor: 'black',color:'white'}}>Security Checkin</span>
                </Grid>
               <Grid item xs={12}>
                        <span style={{backgroundColor: '#fc6060'}}>Boarding Gate</span>
                        
               </Grid>
               <Grid item xs={12}>
                        <span style={{backgroundColor: '#c542f5'}}>Entrance Gate</span>
                        
               </Grid>
               <Grid item xs={12}>
                        <span style={{backgroundColor: 'white'}}>Empty Space</span>
                        
               </Grid>
               <Grid item xs={12}>
                        <span style={{backgroundColor: '#57de54'}}>Check-in Desk</span>
                        
               </Grid>
               <Grid item xs={12}>
                        <span style={{backgroundColor: 'blue'}}>Path</span>
                        
               </Grid>
               
               
               
                
            </Grid>
            
            
            
       </div>
        )
    }


}

export default withStyles(useStyles)(GridClass)