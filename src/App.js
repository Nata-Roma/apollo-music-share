import { Grid } from "@material-ui/core";
import React from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";


function App() {
  return (
    <div>
    <Header />
    <Grid container spacing={3}>
    <Grid item xs={12} md={7} style={{paddingTop: 80}}>
    <AddSong />
        <SongList />
    </Grid>
    <Grid item xs={12} md={5} style={{top: 70, right: 0, position: 'fixed', width: '100%'}}>
    <SongPlayer />
    </Grid>
      
    </Grid>
 
    
    </div>
  );
}

export default App;
