import Header from './components/header/Header';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/forms/Register';
import Login from './pages/forms/Login';
import ForgotPassword from './pages/forms/ForgotPassword';
import ResetPassword from './pages/forms/ResetPassword';
import CreatePost from './pages/create-post/CreatePost';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostsPage from './pages/posts/PostsPage';
import PostDetails from './pages/post-details/PostDetails';
import Category from './pages/category/Category';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/profile/Profile';
import UsersTable from './pages/admin/UsersTable';
import PostsTable from './pages/admin/PostsTable';
import CategoriesTable from './pages/admin/CategoriesTable';
import CommentsTable from './pages/admin/CommentsTable';
import Footer from './components/footer/Footer';
import NotFound from './pages/not-found/NotFound';
import { useSelector } from 'react-redux';
import VerifyEmail from './pages/verify-email/VerifyEmail';

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <ToastContainer theme='colored' position='top-center' />
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/register'
          element={!user ? <Register /> : <Navigate to='/' />}
        />
          <Route
          path='/users/:userId/verify/:token'
          element={!user ? <VerifyEmail /> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/forgot-password'
          element={<ForgotPassword />}
        />
        <Route
          path='/reset-password/:userId/:token'
          element={<ResetPassword />}
        />
        <Route
          path='/profile/:id'
          element={<Profile />}
        />
        <Route
          path='posts'
        >
          <Route
            index
            element={<PostsPage />}
          />
          <Route
            path='create'
            element={user ? <CreatePost /> : <Navigate to='/' />}
          />
          <Route
            path='details/:id'
            element={<PostDetails />}
          />
          <Route
            path='categories/:category'
            element={<Category />}
          />
        </Route>
        <Route
          path='admin-dashboard'
        >
          <Route
            index
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to='/' />}
          />
          <Route
            path='users-table'
            element={user?.isAdmin ? <UsersTable /> : <Navigate to='/' />}
          />
          <Route
            path='posts-table'
            element={user?.isAdmin ? <PostsTable /> : <Navigate to='/' />}
          />
          <Route
            path='categories-table'
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to='/' />}
          />
          <Route
            path='comments-table'
            element={user?.isAdmin ? <CommentsTable /> : <Navigate to='/' />}
          />
        </Route>
        <Route
          path='*'
          element={<NotFound />}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
