export const toDoInitialState = () => ({
  toDoList: [],
  error: {
    getFacts: null
  },
  status: {
    getFacts: 'idle'
  }
})