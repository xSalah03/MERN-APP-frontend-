import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProfile, getAllUsers } from "../../redux/api/profileApi";
import { ThreeDots } from "react-loader-spinner";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted, loading } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [isProfileDeleted]);

  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(userId));
      }
    });
  };

  if (loading) {
    return (
      <div className="profile-spinner">
        <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="gray"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    )
  }

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((profile, index) => (
              <tr key={profile?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={profile?.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{profile?.username}</span>
                  </div>
                </td>
                <td>
                  <b className="user-email">{profile?.email}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${profile?._id}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(profile?._id)}>Delete User</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
