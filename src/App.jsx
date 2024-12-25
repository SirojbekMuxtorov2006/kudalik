import React, { useState } from 'react';

const App = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newTask, setNewTask] = useState('');
  const [editStudentId, setEditStudentId] = useState(null);

  const addStudent = () => {
    if (newStudent.trim() !== '' && newGrade.trim() !== '' && newSubject.trim() !== '') {
      setStudents([
        ...students,
        { id: Date.now(), name: newStudent, grade: newGrade, subject: newSubject, tasks: [] },
      ]);
      setNewStudent('');
      setNewGrade('');
      setNewSubject('');
    }
  };

  const addTaskToStudent = (id) => {
    if (newTask.trim() !== '') {
      setStudents(
        students.map((student) =>
          student.id === id
            ? { ...student, tasks: [...student.tasks, { id: Date.now(), text: newTask }] }
            : student
        )
      );
      setNewTask('');
    }
  };

  const deleteTask = (studentId, taskId) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, tasks: student.tasks.filter((task) => task.id !== taskId) }
          : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">O'quvchilar Ro'yxati</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
          <input
            type="text"
            value={newStudent}
            onChange={(e) => setNewStudent(e.target.value)}
            placeholder="O'quvchi ismini kiriting"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
            placeholder="Bahosini kiriting"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Fanini kiriting"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addStudent}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Qo'shish
          </button>
        </div>
        <ul className="space-y-3">
          {students.map((student) => (
            <li
              key={student.id}
              className="p-3 rounded border bg-gray-100 border-gray-300"
            >
              <div className="flex flex-wrap justify-between items-center">
                <span className="flex-1 text-gray-800">
                  {student.name} - <span className="text-blue-600">{student.grade}</span> (<span className="text-green-600">{student.subject}</span>)
                </span>
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="text-red-500 hover:text-red-600 ml-2"
                >
                  O'chirish
                </button>
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-gray-700">Kundalik vazifalar</h3>
                <ul className="mt-2 space-y-1">
                  {student.tasks.map((task) => (
                    <li key={task.id} className="flex justify-between items-center bg-gray-200 p-2 rounded">
                      <span className="text-gray-800">{task.text}</span>
                      <button
                        onClick={() => deleteTask(student.id, task.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        O'chirish
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap mt-2 space-x-2">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Vazifa qo'shing"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => addTaskToStudent(student.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Qo'shish
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {students.length === 0 && (
          <p className="text-gray-500 text-center mt-4">Hozircha o'quvchilar yo'q!</p>
        )}
      </div>
    </div>
  );
};

export default App;
