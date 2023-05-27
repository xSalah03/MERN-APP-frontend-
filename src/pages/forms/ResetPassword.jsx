import "./form.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getResetPassword, resetPassword } from "../../redux/api/passwordApi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isError } = useSelector(state => state.password);
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(resetPassword(password, { userId, token }));
  };

  return (
    <section className="form-container">
      {isError
        ? (
          <h1  > Not found</h1>) : (
          <>
            <h1 className="form-title">Reset Password</h1>
            <form onSubmit={formSubmitHandler} className="form">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  id="password"
                  placeholder="Enter your new password"
                  className="form-input"
                />
              </div>
              <button type="submit" className="form-btn">
                Submit
              </button>
            </form>
          </>
        )}
    </section >
  );
};

export default ResetPassword;
