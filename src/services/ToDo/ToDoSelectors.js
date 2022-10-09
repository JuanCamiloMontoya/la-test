import { useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"

export const useToDoSelectors = () => {

  const toDoList = useSelector(createSelector(
    state => state.toDo.toDoList,
    toDoList => toDoList
  ))

  const status = useSelector(createSelector(
    state => state.toDo.status,
    status => status
  ))

  const error = useSelector(createSelector(
    state => state.toDo.error,
    error => error
  ))


  return {
    toDoList,
    status,
    error
  }
}