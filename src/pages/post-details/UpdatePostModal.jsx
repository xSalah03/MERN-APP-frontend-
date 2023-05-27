import "./update-post-modal.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from "../../redux/api/postApi";
import { getAllCategories } from "../../redux/api/categoryApi";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);
  const { categories } = useSelector(state => state.category);
  const dispatch = useDispatch();

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === '') return toast.error('Please write something');
    if (description.trim() === '') return toast.error('Please write something');
    if (category.trim() === '') return toast.error('Please write something');
    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };

  useEffect(() => {
    getAllCategories();
  }, [])
  

  return (
    <div className="update-post">
      <ToastContainer theme="colored" position="top-center" />
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setUpdatePost(false)}
            className="bi bi-x-circle-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="update-post-input"
        />
        <select
          className="update-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map(category => <option key={category?._id} value={category?.title}>{category?.title}</option>)}
        </select>
        <textarea
          className="update-post-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        ></textarea>
        <button type="submit" className="update-post-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
