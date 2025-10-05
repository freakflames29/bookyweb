import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import type { Book } from "../hooks/useBooks";
import "./BookAddStyle.css";
import useBooks from "../hooks/useBooks";
export default function BookAddForm() {
  const {addBook} = useBooks();
  const addBookSchema = yup.object({
    title: yup.string().required("Book name is required"),
    author: yup.string().required("Author name is required"),
    image: yup.string().required("Image is required"),
    status: yup.string().required("Status is required"),
    totalPages: yup.number().required("Total pages is required"),
    currentPage: yup.number().required("Current page is required"),
  });

  const [bookloading, setBookloading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      image: "",
      status: "reading",
      totalPages: "",
      currentPage: "",
    },
    validationSchema: addBookSchema,
    onSubmit: (values) => {
      const payload: Book = {
        ...values,
        currentPage: parseInt(values.currentPage),
        totalPages: parseInt(values.totalPages),
      };
      setBookloading(true);
      addBook(payload).then(() => {
        console.log("Book added successfully");
        formik.resetForm();
      }).catch((error) => {
        console.error("Error adding book:", error);
      }).finally(()=>{
        setBookloading(false);
      })
    //   console.log("payload", payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {formik.errors.title && <p>{formik.errors.title}</p>}
        <br />
      </div>

      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
        />
        {formik.errors.author && <p>{formik.errors.author}</p>}
        <br />
      </div>

      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
        />
        {formik.errors.image && <p>{formik.errors.image}</p>}
        <br />
      </div>

      <div>
        <label>Status:</label>
        <select
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
        >
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
          <option value="wishlist">Wishlist</option>
        </select>
        {formik.errors.status && <p>{formik.errors.status}</p>}
        <br />
      </div>

      <div>
        <label>Total Pages:</label>
        <input
          type="number"
          name="totalPages"
          value={formik.values.totalPages}
          onChange={formik.handleChange}
        />
        {formik.errors.totalPages && <p>{formik.errors.totalPages}</p>}
        <br />
      </div>

      <div>
        <label>Current Page:</label>
        <input
          type="number"
          name="currentPage"
          value={formik.values.currentPage}
          onChange={formik.handleChange}
        />
        {formik.errors.currentPage && <p>{formik.errors.currentPage}</p>}
        <br />
      </div>

      <button type="submit">{bookloading ? "Adding..." : "Add Book"}</button>
    </form>
  );
}
