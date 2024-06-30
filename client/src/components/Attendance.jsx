import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Attendance.css';  // Import the CSS file

const Attendance = ({ subjectId, facultyId }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hour, setHour] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`/api/students/year/3`, { timeout: 5000 });
        if (Array.isArray(response.data)) {
          setStudents(response.data);
          setAttendance(response.data.map(student => ({ student: student._id, present: false })));
        } else {
          setError('Unexpected response format');
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        setError('Error fetching students');
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleAttendanceChange = (studentId) => {
    setAttendance(prev => prev.map(att => att.student === studentId ? { ...att, present: !att.present } : att));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/attendance/mark', { date, hour, subjectId, facultyId, students: attendance });
      alert('Attendance marked successfully');
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h1>Mark Attendance</h1>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="attendance-controls">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="number" value={hour} onChange={(e) => setHour(e.target.value)} min="1" max="8" />
      </div>
      {Array.isArray(students) ? (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Student ID</th>
              <th>Date</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Late</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.username}</td>
                <td>{student.registernumber}</td>
                <td>{date}</td>
                <td>
                  <input
                    type="radio"
                    name={`attendance-${student._id}`}
                    checked={attendance.find(att => att.student === student._id)?.present === true}
                    onChange={() => handleAttendanceChange(student._id)}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`attendance-${student._id}`}
                    checked={attendance.find(att => att.student === student._id)?.present === false}
                    onChange={() => handleAttendanceChange(student._id)}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`attendance-${student._id}-late`}
                    checked={attendance.find(att => att.student === student._id)?.late === true}
                    onChange={() => handleAttendanceChange(student._id, 'late')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No students found</div>
      )}
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Attendance;
