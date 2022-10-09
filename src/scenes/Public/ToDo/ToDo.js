import { Row } from "antd"
import ToDoInput from "./components/ToDoInput/ToDoInput"
import ToDoList from "./components/ToDoList/ToDoList"

const ToDo = () => {

  return (
    <div>
      <Row>
        <ToDoInput />
      </Row>
      <Row>
        <ToDoList />
      </Row>
    </div>
  )
}

export default ToDo