import React from 'react';
import { useForm } from "react-hook-form";

const patterns = {
  number:   /^-?[0-9]*$/,
  decimal:  /^(\d+\.?\d*|\.\d+)$/,
  email:    /^[+-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]{2,6}$/,
  url:      /^(https?)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/,
  phone:    /^[0-9]*$/,
}

const HookForm = () => {
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      <div style={{ padding: "30px", border: "4px solid #ececec", margin: "30px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-group">
            <label htmlFor="full_name">Full name</label>
            <input
              ref={register({
                required: true,
              })}
              type="text"
              className="form-control"
              id="full_name"
              name="full_name"
              aria-describedby="emailHelp"
            />
            {errors.full_name && errors.full_name['type'] === 'required' && <small className="form-text text-muted">This is required.</small> }
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              ref={register({
                required: true,
                pattern: patterns.email
              })}
              type="text"
              className="form-control"
              id="email"
              name="email"
            />
            {errors.email && errors.email['type'] === 'required' && <small className="form-text text-muted">This is required.</small> }
            {errors.email && errors.email['type'] === 'pattern' && <small className="form-text text-muted">Invalid email address.</small> }
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={register}
              className="form-control"
              id="password"
              name="password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm password</label>
            <input
              ref={register({
                required: true,
                validate: {
                  match: (value) => value == watch('password')
                }
              })}
              type="password"
              className="form-control"
              id="confirm_password"
              name="confirm_password"
              aria-describedby="emailHelp"
            />
            {errors.confirm_password && errors.confirm_password['type'] === 'match' && <small className="form-text text-muted">Both password must be same.</small> }
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              ref={register({
                required: true,
                pattern: patterns.number
              })}
              type="text"
              className="form-control"
              id="age"
              name="age"
            />
            {errors.age && errors.age['type'] === 'required' && <small className="form-text text-muted">This is required.</small> }
            {errors.age && errors.age['type'] === 'pattern' && <small className="form-text text-muted">value is not a number.</small> }
          </div>

          <div className="form-group">
            <label>Job</label>
            <br />
            <div className="form-check form-check-inline">
              <input ref={register({ required: true })} className="form-check-input" type="radio" id="radio1" name="job" value="Frontend"/>
              <label className="form-check-label" htmlFor="radio1">Frontend</label>
            </div>
            <div className="form-check form-check-inline">
              <input ref={register({ required: true })} className="form-check-input" type="radio" id="radio2" name="job" value="Backend"/>
              <label className="form-check-label" htmlFor="radio2">Backend</label>
            </div>
            <div className="form-check form-check-inline">
              <input ref={register({ required: true })} className="form-check-input" type="radio" id="radio3" name="job" value="QA" />
              <label className="form-check-label" htmlFor="radio3">QA</label>
            </div>
            <div className="form-check form-check-inline">
              <input ref={register({ required: true })} className="form-check-input" type="radio" id="radio4" name="job" value="Infrastructure" />
              <label className="form-check-label" htmlFor="radio4">Infrastructure</label>
            </div>
            {errors.job && errors.job['type'] === 'required' && <small className="form-text text-muted">This is required.</small> }
          </div>

          <div className="form-group">
            <label>Demands</label>
            <br />
            <div className="form-check form-check-inline">
              <input ref={register({ required: true })} className="form-check-input" type="checkbox" id="checkbox1" name="demands" value="High Salary"/>
              <label className="form-check-label" htmlFor="checkbox1">High Salary</label>
            </div>
            <div className="form-check form-check-inline">
              <input ref={register({ required: true })} className="form-check-input" type="checkbox" id="checkbox2" name="demands" value="Latest Technology"/>
              <label className="form-check-label" htmlFor="checkbox2">Latest Technology</label>
            </div>
            <div className="form-check form-check-inline">
              <input ref={register({ required: true })} className="form-check-input" type="checkbox" id="checkbox3" name="demands" value="Fun Working Environment" />
              <label className="form-check-label" htmlFor="checkbox3">Fun Working Environment</label>
            </div>
            <div className="form-check form-check-inline">
              <input ref={register({ required: true })} className="form-check-input" type="checkbox" id="checkbox4" name="demands" value="Good Food" />
              <label className="form-check-label" htmlFor="checkbox4">Good Food</label>
            </div>
            {errors.demands && errors.demands['type'] === 'required' && <small className="form-text text-muted">This is required.</small> }
          </div>

          <div className="form-group">
            <label htmlFor="password">State</label>
            <select id="state" name="state" ref={register({ required: true })} className="form-control">
              <option>Happy</option>
              <option>Semi-Happy</option>
              <option>Sad</option>
            </select>
            {errors.state && errors.state['type'] === 'required' && <small className="form-text text-muted">This is required.</small> }
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default HookForm;
