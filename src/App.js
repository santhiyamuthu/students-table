import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const addStudent = () => {

    if (!name || !email || !age) {
      alert("All fields are required");
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;

    if (!emailPattern.test(email)) {
      alert("Enter valid email");
      return;
    }

    if (editingId) {

      const updatedStudents = students.map((s) =>
        s.id === editingId ? { ...s, name, email, age } : s
      );

      setStudents(updatedStudents);
      setEditingId(null);

    } else {

      const newStudent = {
        id: Date.now(),
        name,
        email,
        age
      };

      setStudents([...students, newStudent]);
    }

    setName("");
    setEmail("");
    setAge("");
  };

  const editStudent = (student) => {
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
    setEditingId(student.id);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "students.xlsx");
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading students...</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>

      <h2>Students Table</h2>

      <h3>{editingId ? "Edit Student" : "Add Student"}</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={addStudent}>
        {editingId ? "Update" : "Add"}
      </button>

      <hr />

      <button onClick={downloadExcel}>Download Excel</button>

      <br /><br />

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>
                <button onClick={() => editStudent(s)}>Edit</button>
                <button onClick={() => deleteStudent(s.id)}>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;