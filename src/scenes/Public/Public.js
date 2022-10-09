import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Row } from "antd"
import ToDo from "./ToDo/ToDo"

const Public = () => {

  return (
    <Row className='public'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDo />} />
        </Routes>
      </BrowserRouter>
    </Row>
  )
}

export default Public