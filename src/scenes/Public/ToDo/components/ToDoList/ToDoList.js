import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Checkbox, Col, Divider, Input, List, Skeleton } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useToDoSelectors } from '../../../../../services/ToDo/ToDoSelectors'
import { toDoActions } from '../../../../../services/ToDo/ToDoSlice'
import UpdateModal from '../UpdateModal/UpdateModal'

const { Search } = Input

const ToDoList = () => {

  const { toDoList } = useToDoSelectors()

  const dispatch = useDispatch()

  const [updateToDo, setUpdateToDo] = useState()
  const [filter, setFilter] = useState('')

  const onUpdateStatus = (key, status) => {
    dispatch(toDoActions.updateStatus({ key, status }))
  }

  const onDelete = (key) => {
    dispatch(toDoActions.deleteToDo(key))
  }

  return (
    <Col>
      <List
        className="to-do-list"
        itemLayout="horizontal"
        dataSource={filter ? toDoList.filter((value) => value.description.includes(filter)) : toDoList}
        header={
          <Search
            placeholder="Search To Do"
            onSearch={setFilter}
            allowClear={true}
          />
        }
        renderItem={(item) => (
          <List.Item
            actions={[
              <EditOutlined style={{ color: "#1890ff" }} onClick={() => setUpdateToDo(item)} />,
              <DeleteOutlined style={{ color: "#FF4444" }} onClick={() => onDelete(item.key)} />
            ]}
          >
            <Checkbox
              onChange={(e) => onUpdateStatus(item.key, e.target.checked)}
              checked={item.complete}
            />
            <Divider type='vertical' />
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta description={item.description} />
            </Skeleton>
          </List.Item>
        )}
      />
      <UpdateModal updateToDo={updateToDo} setUpdateToDo={setUpdateToDo} />
    </Col>
  )
}

export default ToDoList