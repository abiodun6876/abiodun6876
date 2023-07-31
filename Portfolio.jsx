
  import React, { useState } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { addFormData, getAllFormData, updateFormData, deleteFormData } from './db';

const App = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submittedData, setSubmittedData] = useState(getAllFormData()); // Initialize with data from local storage
  const [editIndex, setEditIndex] = useState(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fullName,
      email,
      date,
      time,
    };

    await addFormData(formData);
    setFullName('');
    setEmail('');
    setDate('');
    setTime('');

    // Update the state with the latest data from local storage
    setSubmittedData(getAllFormData());
  };

  const handleEdit = (index) => {
    const formDataToEdit = submittedData[index];
    setFullName(formDataToEdit.fullName);
    setEmail(formDataToEdit.email);
    setDate(formDataToEdit.date);
    setTime(formDataToEdit.time);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
  await deleteFormData(index);
  setSubmittedData(getAllFormData());
};


  
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Book an Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <div className="input-group">
                <span className="input-group-text"><FaCalendarAlt /></span>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">Time</label>
              <div className="input-group">
                <span className="input-group-text"><FaClock /></span>
                <input
                  type="time"
                  className="form-control"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Book Appointment</button>
            </div>
          </form>
              
  
 {/* Display submitted form data */}
          {submittedData.length > 0 && (
            <div className="mt-4">
              <h3>Submitted Form Data:</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.fullName}</td>
                      <td>{data.email}</td>
                      <td>{data.date}</td>
                      <td>{data.time}</td>
                      <td><button className="btn btn-primary" onClick={() => handleEdit(index)}>Edit</button></td>
                      <td><button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
