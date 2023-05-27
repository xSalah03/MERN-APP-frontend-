import { toast } from 'react-toastify';
import request from "../../utils/request";
import { authActions } from '../slices/authSlice';
import { profileActions } from '../slices/profileSlice';

export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/users/profile/${userId}`);
            dispatch(profileActions.setProfile(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export function uploadProfilePhoto(newPhoto) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post('/api/users/profile/profile-photo-upload', newPhoto, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            dispatch(profileActions.setProfilePhoto(data.profilePhoto));
            dispatch(authActions.setUserProfilePhoto(data.profilePhoto));
            toast.success(data.message);
            const user = JSON.parse(localStorage.getItem('userInfo'));
            user.profilePhoto = data?.profilePhoto;
            localStorage.setItem('userInfo', JSON.stringify(user));
        } catch (error) {
            console.log(getState().auth.user.token);
            toast.error(error.response.data.message);
        }
    }
}

export function updateProfile(userId, profile) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/users/profile/${userId}`, profile, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(profileActions.updateProfile(data));
            dispatch(authActions.setUsername(data.username));

            const user = JSON.parse(localStorage.getItem('userInfo'));
            user.username = data?.username;
            localStorage.setItem('userInfo', JSON.stringify(user));
        } catch (error) {
            console.log(getState().auth.user.token);
            toast.error(error.response.data.message);
        }
    }
}

export function deleteProfile(userId) {
    return async (dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading());
            const { data } = await request.delete(`/api/users/profile/${userId}`, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(profileActions.setIsProfileDeleted());
            toast.success(data?.message);
            setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(profileActions.clearloading());
        }
    }
}

export function getUsersCount() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/users/count/`, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(profileActions.setUsersCount(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export function getAllUsers() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/users/profile`, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(profileActions.setProfiles(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

