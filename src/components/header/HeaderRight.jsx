import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { logoutUser } from "../../redux/api/authApi";

const HeaderRight = () => {
  const { user } = useSelector((state) => state.auth);
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    setDropDown(false);
    dispatch(logoutUser());
  }

  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span onClick={() => setDropDown(prev => !prev)} className="header-right-username">
              {user?.username}
            </span>
            <img onClick={() => navigate(`/profile/${user?._id}`)} src={user.profilePhoto.url} alt="user photo" className="header-right-user-photo" />
            {dropDown && (
              <div className="header-right-dropdown">
                <Link onClick={() => setDropDown(false)} to={`/profile/${user?._id}`} className='header-dropdown-item'>
                  <i className="bi bi-file-person"></i>
                  <span>profile</span>
                </Link>
                <div onClick={logoutHandler} className='header-dropdown-item'>
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>) : <>
        <Link className="header-right-link" to="/login">
          <i className="bi bi-box-arrow-in-right"></i>
          <span>Login</span>
        </Link>
        <Link className="header-right-link" to="/register">
          <i className="bi bi-person-plus"></i>
          <span>Register</span>
        </Link>
      </>
      }
    </div>
  );
};

export default HeaderRight;
