// import "./App.css";
import BlogList from "./views/BlogList";
// import Navbar from "./components/NavBar";
import Navbar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./views/LoginView";
import RegisterForm from "./views/RegisterView";


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;