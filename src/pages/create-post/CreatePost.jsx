import "./create-post.css";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createPost } from "../../redux/api/postApi";
import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { getAllCategories } from "../../redux/api/categoryApi";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector(state => state.post);
  const { categories } = useSelector(state => state.category);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPostCreated) {
      navigate('/');
    }
  }, [isPostCreated, navigate])

  useEffect(() => {
    getAllCategories();
  }, [])

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "") return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };

  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Post Title"
          className="create-post-input"
        />
        <select
          className="create-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map(category => <option key={category?._id} value={category?.title}>{category?.title}</option>)}
        </select>
        <textarea
          className="create-post-textarea"
          placeholder="Post Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        ></textarea>
        <input
          className="create-post-upload"
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          {
            loading ?
              <div className="spinner">
                <ThreeDots
                  height="28"
                  width="80"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
              : 'Create'
          }
        </button>
        <ToastContainer theme="colored" position="top-center" />
      </form>
    </section>
  );
};

export default CreatePost;
