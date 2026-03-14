import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Main from "./pages/Main"
import UploadLecture from "./pages/UploadLecture"
import LecturePage from "./pages/LecturePage"

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Main /> }/>
      <Route path="/upload" element={ <UploadLecture /> }/>
      <Route path="/lecture/:id" element={<LecturePage />} />
      <Route path="/register" element={ <Register /> }/>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
