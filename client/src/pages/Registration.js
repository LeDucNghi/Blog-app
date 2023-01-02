import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import React from "react";
import axios from "axios";

function Registration() {
  const onSubmit = async (values, { setSubmitting }) => {
    console.log("🚀 ~ file: Login.js:9 ~ onSubmit ~ data", values);
    const body = {
      username: values.username,
      password: values.password,
    };
    try {
      const res = await axios.post(`http://localhost:3001/auth`, body);
      console.log("🚀 ~ file: Login.js:18 ~ onSubmit ~ res", res);
      if (res.status === 200) {
        console.log("registration success🥳");
      }
    } catch (error) {
      console.log("🚀 ~ file: Login.js:13 ~ onSubmit ~ error", error);
    }
  };

  return (
    <div>
      {" "}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) =>
          onSubmit(values, { setSubmitting })
        }
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          const { values, isSubmitting } = formikProps;
          return (
            <Form className="formContainer">
              <label htmlFor="">Username : </label>
              <ErrorMessage name="username" component="span" />
              <Field
                value={values.username}
                autoComplete="off"
                id="inputCreatePost"
                name="username"
                placeholder="(Ex. Username... )"
              />

              <label htmlFor="">Password : </label>
              <ErrorMessage name="password" component="span" />
              <Field
                value={values.password}
                type="password"
                autoComplete="off"
                id="inputCreatePost"
                name="password"
                placeholder="Your password"
              />

              <button type="submit">
                {isSubmitting ? "Logging..." : "Login"}{" "}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too short!")
    .max(15, "Too long!")
    .required("You must input the username!"),
  password: Yup.string()
    .min(4, "Too short!")
    .max(20, "Too long!")
    .required("You must input the password!"),
});

export default Registration;
