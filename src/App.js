import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Headr from "./components/Headr";
import SimpleBottomNavigation from './components/Mainnav';
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";
import Trending from "./Pages/Trending";
import Search from "./Pages/Search";
import Container from '@mui/material/Container';

function App() {
  return (
    <BrowserRouter>
      <Headr />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
