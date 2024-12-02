import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddSchedule = () => {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [day, setDay] = useState('');

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const handleAddSchedule = e => {
    e.preventDefault();

    const scheduleData = {
      title,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      day,
    };

    console.log('Schedule Data:', scheduleData);

    // Send the data
    fetch('http://localhost:5000/addSchedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Server Response:', data);
      });
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Add Gym Schedule</h1>

      <form onSubmit={handleAddSchedule}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
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
  );
};

export default AddSchedule;
