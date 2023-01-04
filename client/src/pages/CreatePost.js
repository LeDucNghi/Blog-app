import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    const body = {
      title: values.title,
      postText: values.postText,
      username: values.username,
    };

    const config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };

    try {
      const res = await axios.post(`http://localhost:3001/posts`, body, config);
      if (!res.data.error) {
        setSubmitting(false);
        await alert("post successful 🥳");
        await navigate(`/`);
      } else alert("something went wrong 😢");
    } catch (error) {
      console.log("🚀 ~ file: CreatePost.js:20 ~ onSubmit ~ error", error);
    }
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) =>
          onSubmit(values, { setSubmitting })
        }
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          const { isSubmitting } = formikProps;
          return (
            <Form className="formContainer">
              <label htmlFor="">Title : </label>
              <ErrorMessage name="title" component="span" />
              <Field
                autocomplete="off"
                id="inputCreatePost"
                name="title"
                placeholder="(Ex. Title... )"
              />

              <label htmlFor="">Post : </label>
              <ErrorMessage name="postText" component="span" />
              <Field
                autocomplete="off"
                id="inputCreatePost"
                name="postText"
                placeholder="(Ex. Post... )"
              />

              <button type="submit">
                {isSubmitting ? "Posting..." : "Create post"}{" "}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

const initialValues = {
  title: "",
  postText: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("You must input the title!"),
  postText: Yup.string().required("You must input the post"),
});

export default CreatePost;
