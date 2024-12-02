import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Update = () => {
  const { id } = useParams();
  console.log(id);
  const singleUser = useLoaderData();
  // console.log(singleUser);
  const [selectedDate, setSelectedDate] = useState(singleUser?.date);
  console.log(selectedDate);
  const [selectedTime, setSelectedTime] = useState(singleUser?.time);
  console.log(selectedTime);
  const [day, setDay] = useState(singleUser?.day);
  const [title, setTitle] = useState(singleUser?.title);
  console.log(day);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const handleSchudleUpadte = () => {
    console.log('hi');
  };
  console.log(title);
  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-sky-600 my-10">
        User Gym Schedule Update
      </h1>
      <div className="p-4 max-w-sm mx-auto bg-gray-100 rounded-lg shadow-lg">
        <form onSubmit={handleSchudleUpadte}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Date Picker */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Time Picker */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Time</label>
            <DatePicker
              selected={selectedTime}
              onChange={time => setSelectedTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Day Selector */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Day</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={day}
              onChange={e => setDay(e.target.value)}
            >
              <option value="" disabled>
                Select a Day
              </option>
              {daysOfWeek.map(dayName => (
                <option key={dayName} value={dayName}>
                  {dayName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
