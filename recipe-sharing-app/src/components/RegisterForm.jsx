import { useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mock registration for " + form.username);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Register</h2>
      <input className="w-full border mb-2 p-2" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input className="w-full border mb-2 p-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" className="w-full border mb-2 p-2" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
