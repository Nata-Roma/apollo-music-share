import { Grid, Hidden, useMediaQuery  } from "@material-ui/core";
import React from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";


function App() {
  const greaterThanMD = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const greaterThanSM = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <div>
    <Hidden only='xs'>
      <Header />
    </Hidden>
    
    <Grid container spacing={3}>
    <Grid 
      item xs={12} 
      md={7} 
      style={{paddingTop: greaterThanSM ? 80 : 10}}
    >
    <AddSong />
        <SongList />
    </Grid>
    <Grid 
      item xs={12} 
      md={5} 
      style={ 
        greaterThanMD ? {top: 70, right: 0, position: 'fixed', width: '100%'} :
        {bottom: 0, left: 0, position: 'fixed', width: '100%'}
        }
      >
    <SongPlayer />
    </Grid>
      
    </Grid>
 
    
    </div>
  );
}

export default App;
