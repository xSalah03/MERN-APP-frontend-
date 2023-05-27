import { toast } from 'react-toastify';
import request from "../../utils/request";
import { categoryActions } from "../slices/categorySlice";


export function getAllCategories(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.get('/api/categories', user);
            dispatch(categoryActions.setCategories(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export function createCategory(newCategory) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post('/api/categories', newCategory, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token
                }
            });
            dispatch(categoryActions.addCategories(data));
            toast.success('Category created successfully');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export function deleteCategory(categoryId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/categories/${categoryId}`, {
                headers: {
                    Authorization: 'Bearer ' + getState().auth.user.token
                }
            });
            dispatch(categoryActions.deleteCategories(data.categoryId));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}