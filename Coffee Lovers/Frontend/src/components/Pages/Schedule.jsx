import { Link, useLoaderData } from 'react-router-dom';
import { CiTrash } from 'react-icons/ci';
import { FaPenToSquare } from 'react-icons/fa6';
import { useState } from 'react';

const Schedule = () => {
  const users = useLoaderData();
  console.log(users);
  const [user, setUser] = useState(users);

  const handleUserDelete = id => {
    console.log(id);
    fetch(`http://localhost:5000/addSchedule/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          const updatedUsers = user.filter(u => u._id !== id);
          setUser(updatedUsers);
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="mx-auto text-center w-11/12">
      <h2 className="text-center text-3xl text-sky-600 font-bold my-8">
        All Saved Schedules: {user.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead className="bg-sky-100">
            <tr>
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Time</th>
              <th className="border border-gray-300 p-2">Day</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr key={user._id} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{user.title}</td>
                <td className="border border-gray-300 p-2">{user.date}</td>
                <td className="border border-gray-300 p-2">{user.time}</td>
                <td className="border border-gray-300 p-2">{user.day}</td>
                <td className="border border-gray-300 p-2">
                  <div className="relative group flex items-center justify-center gap-4">
                    <CiTrash
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleUserDelete(user._id)}
                    />
                    <Link to={`/update/${user._id}`}>
                      <FaPenToSquare className="text-blue-500 cursor-pointer hover:text-blue-700 ml-2" />
                    </Link>
                    {/* Hovered Content */}
                    <div className="absolute top-full mt-2 w-40 p-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p>{user.title}</p>
                      <p>{user.date}</p>
                      <p>{user.time}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
