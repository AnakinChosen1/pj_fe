import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'; // ✅ Đúng

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
      <Link to="/mealplan">Meal Planner</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <ThemeToggle />
    </nav>
  );
}
