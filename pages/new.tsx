import { ErrorMessage, Field, Form, Formik } from "formik";
import type { GetStaticProps, NextPage } from "next";
import * as Yup from "yup";

const Home: NextPage = () => {
  return (
    <Formik
      initialValues={{ title: "", url: "" }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        setSubmitting(true);
        fetch("/api/rockets/new", {
          method: "post",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) setFieldError("url", "Please add a valid URL");
          })
          .then(() => setSubmitting(false))
          .catch(() => setFieldError("url", "Please add a valid URL"));
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Please add a title"),
        url: Yup.string()
          .url("Must be a valid URL")
          .required("Please enter a URL"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="title">Title</label>
          <Field type="text" name="title" id="title" />
          <ErrorMessage name="title" />

          <label htmlFor="url">Url</label>
          <Field type="text" name="url" id="url" />
          <ErrorMessage name="url" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default Home;
