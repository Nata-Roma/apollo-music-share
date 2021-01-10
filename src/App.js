import { Grid, Hidden, useMediaQuery  } from "@material-ui/core";
import React, { createContext, useContext, useReducer } from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import songReducer from "./reducer";

export const SongContext = createContext({
  song: {
    id: '636e3e04-65d5-435c-8c88-4d8a8db2da17',
    title: 'Sweet Home Alabama',
    artist: 'Lynyrd Skynyrd',
    thumbnail: 'https://i.ytimg.com/vi/IwWUOmk7wO0/hqdefault.jpg',
    url: 'https://youtu.be/ye5BuYf8q4o',
    duration: 300,
  },
  isPlaying: false,
});


function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const greaterThanMD = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const greaterThanSM = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <SongContext.Provider value={{state, dispatch}}>
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
 
    
    </SongContext.Provider>
  );
}

export default App;
