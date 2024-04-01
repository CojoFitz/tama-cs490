import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    petName: "",
    personality: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("You must input a username."),
    email: Yup.string().required(),
    password: Yup.string().min(8).max(15).required("Please enter a password that meets the required length."),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth/register", data).then((response) => {
      console.log("User Registered");
    });
  };
  return (
    <div className="centeredContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label htmlFor="username">Username: </label>
          <ErrorMessage name="username" component="span" className="error" />
          <Field
            autoComplete="off"
            id="username"
            name="username"
            placeholder="Alphanumerical Only"
            type="text"
          />
          <label htmlFor="email">E-mail: </label>
          <ErrorMessage name="email" component="span" className="error" />
          <Field
            autoComplete="off"
            id="email"
            name="email"
            placeholder="Enter Valid E-mail"
            type="email"
          />
          <label htmlFor="password">Password: </label>
          <ErrorMessage name="password" component="span" className="error" />
          <Field
            autoComplete="off"
            id="password"
            name="password"
            placeholder="Enter a password"
            type="password"
          />
          <label htmlFor="petName">Pet Name: </label> {}
          <ErrorMessage name="petName" component="span" className="error" />
          <Field
            autoComplete="off"
            id="petName"
            name="petName"
            placeholder="Enter Pet's Name"
            type="text"
          />
          <label htmlFor="personality">Pet Personality: </label>
          <ErrorMessage name="personality" component="span" className="error" />
          <Field as="select" id="personality" name="personality">
            <option value="">Select Pet Personality</option>
            <option value="1">Normal</option>
            <option value="2">Cranky</option>
            <option value="3">Playful</option>
            <option value="4">Lazy</option>
            <option value="5">Calm</option>
          </Field>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
  
}

export default Register;