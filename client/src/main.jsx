import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import EditorPage from "./Editor";
import LoginPage from "./login";
import RegisterPage from "./register";
import Projects from "./projects";
import AddSheet from "./addsheet";
import ViewPage from "./view";
import SharePage from "./share";
import AddPage from "./addpage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="editor" element={<EditorPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="add_sheet" element={<AddSheet />} />
          <Route path="view" element={<ViewPage />} />
          <Route path="share" element={<SharePage />} />
          <Route path="add_page" element={<AddPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);