import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mock login for " + form.username);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Login</h2>
      <input className="w-full border mb-2 p-2" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" className="w-full border mb-2 p-2" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
