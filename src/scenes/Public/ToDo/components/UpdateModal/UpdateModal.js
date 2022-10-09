import { Button, Form, Input, Modal } from "antd"
import { useDispatch } from "react-redux"
import { toDoActions } from "../../../../../services/ToDo/ToDoSlice"

const UpdateModal = ({ updateToDo, setUpdateToDo }) => {


  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(toDoActions.updateToDo({
      description: values.todo,
      key: updateToDo?.key
    }))
    setUpdateToDo()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <Modal
      title="Update To Do"
      visible={updateToDo}
      onCancel={() => setUpdateToDo()}
      footer={null}
      key={updateToDo?.key}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ todo: updateToDo?.description }}
      >
        <Form.Item
          label="To Do"
          name="todo"
          rules={[{ required: true, message: 'Please input your to do!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update ToDo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateModal