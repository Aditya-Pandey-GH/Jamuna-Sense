import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import KnowYourYamuna from "./pages/KnowYourYamuna";
import Impact from "./pages/Impact";
import Navbar from "./components/Home/Navbar";
import YamunaSenseForm from "./pages/YamunaSenseForm";

function App() {

  return(
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/knowyouryamuna" element={<KnowYourYamuna />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/reportForm" element={<YamunaSenseForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
