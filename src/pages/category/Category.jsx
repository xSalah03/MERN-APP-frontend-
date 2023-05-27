import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useDispatch, useSelector } from 'react-redux';
import "./category.css";
import { getPostsByCategory } from "../../redux/api/postApi";

const Category = () => {
  const dispatch = useDispatch();
  const { postsCate } = useSelector(state => state.post);
  const { category } = useParams();

  useEffect(() => {
    dispatch(getPostsByCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="category">
      {postsCate.length === 0 ?
        <>
          <h1 className='category-not-found'>Post with <span>{category}</span> category not found</h1>
          <Link to='/posts' className="category-not-found-link">Go to posts page</Link>
        </> :
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCate} />
        </>
      }
    </section>);
}

export default Category;