import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APP_LINK from "../../config.js";
import axios from "axios";

const initialState = {
  loading: false,
  libraryBooks: [],
  error: null,
  currentPage:1,
  totalPage:1
};

export const fetchAllBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await axios.get(`${APP_LINK}/api/getbooks`,);
    console.log("Data from Thunk Middelware", response.data);
    return{
        books: response.data.fetchedData,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
    }
  } catch (error) {
    console.error("error from thunk", error.message);
    throw error;
  }
});

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooks.pending, (state) => {
      state.loading = true;

    });
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.libraryBooks = action.payload.books;
      state.currentPage = action.payload.currentPage;
      state.totalPage = action.payload.totalPages
    });
    builder.addCase(fetchAllBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default bookSlice.reducer;
