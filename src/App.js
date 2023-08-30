import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MoviesAdd from "./MoviesAdd";
import MoviesEdit from "./MoviesEdit";
import TvshowsAdd from "./TvshowsAdd";
import TvshowsEdit from "./TvshowsEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies_add" element={<MoviesAdd />} />
        <Route path="/movies/:id" element={<MoviesEdit />} />
        <Route path="/tvshows_add" element={<TvshowsAdd />} />
        <Route path="/tvshows/:id" element={<TvshowsEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
