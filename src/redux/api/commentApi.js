import { toast } from 'react-toastify';
import request from "../../utils/request";
import { postActions } from '../slices/postSlice';
import { commentActions } from '../slices/commentSlice';


export function createComment(newComment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post('/api/comments', newComment, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token
                }
            });
            dispatch(postActions.addComment(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export function updateComment(newComment, commentId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/comments/${commentId}`, newComment, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(postActions.updateComment(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export function deleteComment(commentId) {
    return async (dispatch, getState) => {
        try {
            await request.delete(`/api/comments/${commentId}`, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(commentActions.deleteComment(commentId));
            dispatch(postActions.deleteComment(commentId));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export function getAllComments() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/comments`, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token,
                }
            });
            dispatch(commentActions.setComment(data));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}