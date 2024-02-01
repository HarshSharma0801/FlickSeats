import React from "react"
import Display from "./Components/Display/Display"
import DisplayItem from "./Components/Display/DisplayItem"
import { Route , Routes } from "react-router"
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Display/>} />
      <Route path="/shows/:id" element={<DisplayItem/>} />

    </Routes>
    </>
  )
}

export default App
