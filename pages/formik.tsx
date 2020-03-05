import React from 'react';
import { Formik, FieldArray, getIn } from "formik";
import * as Yup from "yup";

const patterns = {
  number:   /^-?[0-9]*$/,
  decimal:  /^(\d+\.?\d*|\.\d+)$/,
  email:    /^[+-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]{2,6}$/,
  url:      /^(https?)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/,
  phone:    /^[0-9]*$/,
}

const yupValidationSchema = Yup.object({
  full_name: Yup.string()
    .max(15,'max')
    .required('required'),
  email: Yup.string()
    .email('pattern')
    .required('required'),
  password: Yup.string()
    .required('required'),
  confirm_password: Yup.string()
    .required('required')
    .oneOf([Yup.ref('password'), null], 'match'),
  age: Yup.number()
    .typeError('type')
    .required('required'),
  job: Yup.string()
    .required('required'),
  demands: Yup.array()
    .of(Yup.string())
    .required('required'),
  state: Yup.string()
    .required('required'),
  addresses: Yup.array().of(
    Yup.object().shape({
      address1: Yup.string().required('Address 1 is required'),
      address2: Yup.string().when('address1', {
        is: (address1) => Boolean(address1),
        then: Yup.string().required('Address 2 is required')
      })
    })
  )
})

const FormikForm = () => {
  return (
    <>
      <div style={{ padding: "30px", border: "4px solid #ececec", margin: "30px" }}>
        <Formik
        initialValues={{
          full_name: '',
          email: '',
          password: '',
          confirm_password: '',
          age: '',
          job: '',
          demands: [],
          state: '',
          addresses: [
            {
              address1: '',
              address2: ''
            }
          ]
        }}
        validationSchema= {yupValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values)
        }}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            dirty,
            handleSubmit,
            isValid
        }) => {
          return (
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="full_name">Full name</label>
              <input
                type="text"
                className="form-control"
                id="full_name"
                name="full_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.full_name}
              />
              {touched?.full_name && errors?.full_name === 'required' && <small className="form-text text-muted">This is required.</small> }
              {touched?.full_name && errors?.full_name === 'max' && <small className="form-text text-muted">Full name should be 15 characters or less.</small> }
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched?.email && errors?.email === 'required' && <small className="form-text text-muted">This is required.</small> }
              {touched?.email && errors?.email === 'pattern' && <small className="form-text text-muted">Invalid email address.</small> }
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched?.password && errors?.password === 'required' && <small className="form-text text-muted">This is required.</small> }
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password">Confirm password</label>
              <input
                type="password"
                className="form-control"
                id="confirm_password"
                name="confirm_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirm_password}
              />
              {touched?.confirm_password && errors?.confirm_password === 'required' && <small className="form-text text-muted">This is required.</small> }
              {touched?.confirm_password && errors?.confirm_password === 'match' && <small className="form-text text-muted">Passwords must match.</small> }
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                name="age"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.age}
              />
              {touched?.age && errors?.age === 'required' && <small className="form-text text-muted">This is required.</small> }
              {touched?.age && errors?.age === 'type' && <small className="form-text text-muted">The value must be a number.</small> }
            </div>

            <div className="form-group">
              <label>Job</label>
              <br />
              <div className="form-check form-check-inline">
                <input className="form-check-input"
                type="radio"
                id="radio1"
                name="job"
                value="Frontend"
                checked={values.job == 'Frontend'}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <label className="form-check-label" htmlFor="radio1">Frontend</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input"
                type="radio"
                id="radio2"
                name="job"
                value="Backend"
                checked={values.job == 'Backend'}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <label className="form-check-label" htmlFor="radio2">Backend</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input"
                type="radio"
                id="radio3"
                name="job"
                value="QA"
                checked={values.job == 'QA'}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <label className="form-check-label" htmlFor="radio3">QA</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input"
                type="radio"
                id="radio4"
                name="job"
                value="Infrastructure"
                checked={values.job == 'Infrastructure'}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <label className="form-check-label" htmlFor="radio4">Infrastructure</label>
              </div>
              {touched?.job && errors?.job === 'required' && <small className="form-text text-muted">This is required.</small> }
            </div>

            <div className="form-group">
              <label>Demands</label>
              <br />
              <div className="form-check form-check-inline">
                <input className="form-check-input"
                 type="checkbox"
                 id="checkbox1"
                 name="demands"
                 value="High Salary"
                 checked={values.demands.includes('High Salary')}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 />
                <label className="form-check-label" htmlFor="checkbox1">High Salary</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input"
                type="checkbox"
                id="checkbox2"
                name="demands"
                value="Latest Technology"
                checked={values.demands.includes('Latest Technology')}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <label className="form-check-label" htmlFor="checkbox2">Latest Technology</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input"
                type="checkbox"
                id="checkbox3"
                name="demands"
                value="Fun Working Environment"
                checked={values.demands.includes('Fun Working Environment')}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <label className="form-check-label" htmlFor="checkbox3">Fun Working Environment</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input"
                type="checkbox"
                id="checkbox4"
                name="demands"
                value="Good Food"
                checked={values.demands.includes('Good Food')}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <label className="form-check-label" htmlFor="checkbox4">Good Food</label>
              </div>
              {touched?.demands && errors?.demands === 'required' && <small className="form-text text-muted">This is required.</small> }
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <select id="state" name="state" onChange={handleChange}
                onBlur={handleBlur} value={values.state} className="form-control" >
                <option disabled value="">Select state</option>
                <option value="Happy">Happy</option>
                <option value="Semi-Happy">Semi-Happy</option>
                <option value="Sad">Sad</option>
              </select>
              {touched?.state && errors?.state === 'required' && <small className="form-text text-muted">This is required.</small> }
            </div>

            <FieldArray name='addresses'
              render={ arrayHelpers => (
                <div className="mb-3">
                  {values.addresses.map((addressObj, index) => {
                    const address1 = `addresses[${index}].address1`;
                    const touchedAddress1 = getIn(touched, address1);
                    const errorAddress1 = getIn(errors, address1);

                    const address2 = `addresses[${index}].address2`;
                    const touchedAddress2 = getIn(touched, address2);
                    const errorAddress2 = getIn(errors, address2);

                    return (
                      <div className="row" key={index}>
                        <div className="col">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id={address1}
                              name={address1}
                              onChange={handleChange}
                              placeholder="address 1"
                              onBlur={handleBlur}
                              value={addressObj.address1}
                            />
                            {touchedAddress1 && errorAddress1 }
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id={address2}
                              name={address2}
                              onChange={handleChange}
                              placeholder="address 2"
                              onBlur={handleBlur}
                              value={addressObj.address2}
                            />
                            {touchedAddress2 && errorAddress2 }
                          </div>
                        </div>
                        <div className="col">
                          <button type="button" onClick={() => arrayHelpers.remove(index)} className="btn btn-danger">Delete</button>
                        </div>
                      </div>
                    )
                  })}
                  <div>
                    <button type="button" onClick={() => arrayHelpers.push({address1: '', address2: ''})} className="btn btn-primary">Add</button>
                  </div>
                </div>
              )}
            />

            <button disabled={!(dirty && isValid)} className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        )}}
        </Formik>
      </div>
    </>
  );
};

export default FormikForm;
