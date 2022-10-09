import { Alert, Button, Checkbox, Form, Input, InputNumber } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useToDoSelectors } from '../../../../../services/ToDo/ToDoSelectors'
import { toDoActions } from '../../../../../services/ToDo/ToDoSlice'

const ToDoInput = () => {

  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { status, error } = useToDoSelectors()

  const [randomTodo, setRandomTodo] = useState(false)

  const onFinish = (values) => {
    if (randomTodo)
      dispatch(toDoActions.getFacts({ limit: values.number }))
    else
      dispatch(toDoActions.addToDo(values.todo))

    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <Form
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ width: '100%' }}
    >
      {randomTodo ? (
        <>
          <Form.Item
            label={"Enter the number of To Do"}
            name="number"
            rules={[{ required: true, message: 'Please enter the number on To Do!' }]}
          >
            <InputNumber max={10} min={1} />
          </Form.Item>
          {status.getFacts === 'error' && (
            <Alert
              message={error.getFacts}
              type="error"
              showIcon
              closable
              onClose={() => dispatch(toDoActions.resetStatus('getFacts'))}
            />
          )}
        </>
      ) : (
        <Form.Item
          label={"To Do"}
          name="todo"
          rules={[{ required: true, message: 'Please input your to do!' }]}
        >
          <Input.TextArea />
        </Form.Item>
      )}
      <Checkbox onChange={(value) => { setRandomTodo(value.target.checked) }}>Random To Do's</Checkbox>
      <Form.Item className='text-center'>
        <Button type="primary" htmlType="submit" loading={status.getFacts === 'loading'}>
          Add ToDo
        </Button>
      </Form.Item>
    </Form >
  )
}

export default ToDoInput