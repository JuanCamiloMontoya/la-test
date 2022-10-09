import { createAsyncThunk } from "@reduxjs/toolkit"
import Api from "../../common/api/Api"

export const toDoThunks = () => {

  const getFacts = createAsyncThunk(
    'facts',
    async ({ limit }, { rejectWithValue }) => {
      try {
        const numberPages = Math.floor(332 / limit)
        const page = Math.floor(Math.random() * (numberPages - 0 + 1) + 0)
        const resp = await Api.get(`/facts?limit=${limit}&page=${page}`)
        return resp.data
      } catch (error) {
        return rejectWithValue(error.toString())
      }
    }
  )

  return {
    getFacts
  }
}