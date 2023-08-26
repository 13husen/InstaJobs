import "./App.css";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Jobs />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/job/:id" element={<Detail />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
