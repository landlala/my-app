import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path = "/" element = {<Home />}>
          <Route path = "movies/:id" element = {<Home />} />
        </Route>
        <Route path = "/search" element = {<Search />}></Route>
        <Route path = "tv" element = {<Tv />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;