import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Blog from './pages/Blog.tsx'
import Signin from './pages/Signin.tsx'
import Signup from './pages/Signup.tsx'
import Create from './pages/Create.tsx'
import Post from './pages/Post.tsx'

const router = createBrowserRouter([{
  path : "/",
  element : <App />
},{
  path : "/blog",
  element : <Blog/>
}, {
  path : "/signin",
  element : <Signin/>
},{
  path : "/signup",
  element : <Signup/>
}, {
  path : "/create",
  element : <Create />
}, {
  path : "/post",
  element : <Post />
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
