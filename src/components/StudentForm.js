function StudentForm({ addStudent }) {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [age,setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name || !email || !age){
      alert("All fields required");
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;

    if(!emailPattern.test(email)){
      alert("Invalid email");
      return;
    }

    addStudent({name,email,age});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Age" onChange={(e)=>setAge(e.target.value)} />

      <button type="submit">Add Student</button>
    </form>
  );
}