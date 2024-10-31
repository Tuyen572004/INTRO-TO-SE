import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index';
import "./index.css"

const app = () => {
  return <>
    <RouterProvider router={router} />
  </>
}

export default app;