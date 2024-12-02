import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import AddSchudale from '../Pages/AddSchudale';
import Schedule from '../Pages/Schedule';
import Update from '../Pages/update';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <AddSchudale />,
      },
      {
        path: '/schudale',
        element: <Schedule />,
        loader: () => fetch('http://localhost:5000/addSchedule'),
      },
      {
        path: '/update/:id',
        element: <Update />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/addSchedule/${params.id}`),
      },
    ],
  },
]);

export default router;
