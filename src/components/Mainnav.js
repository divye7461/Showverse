import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('trending');
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 'trending') navigate('/');
    else if (value === 'movies') navigate('/movies');
    else if (value === 'tv') navigate('/series');
    else if (value === 'search') navigate('/search');
  }, [value, navigate]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#2d313a',
        zIndex: 100,
      }}
    >
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Trending"
        value="trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Movies"
        value="movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="TV Series"
        value="tv"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Search"
        value="search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
