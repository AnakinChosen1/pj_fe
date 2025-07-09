import { useState, useEffect } from 'react';

export default function RecipeForm({ editing, onSave }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    cookingTime: '',
    servings: '',
    category: 'Dinner'
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...form.ingredients];
    updated[index] = value;
    setForm({ ...form, ingredients: updated });
  };

  const addIngredient = () => setForm({ ...form, ingredients: [...form.ingredients, ''] });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(form);
    } else {
      fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }).then(() => alert('Recipe added!'));
    }
    setForm({ title: '', description: '', ingredients: [''], instructions: '', cookingTime: '', servings: '', category: 'Dinner' });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Recipe' : 'Add Recipe'}</h2>
      <input name="title" value={form.title} onChange={handleChange} className="w-full border mb-2 p-2" placeholder="Title" required />
      <textarea name="description" value={form.description} onChange={handleChange} className="w-full border mb-2 p-2" placeholder="Description" />
      {form.ingredients.map((ing, i) => (
        <input key={i} value={ing} onChange={e => handleIngredientChange(i, e.target.value)} className="w-full border mb-2 p-2" placeholder={`Ingredient ${i + 1}`} />
      ))}
      <button type="button" onClick={addIngredient} className="text-blue-500 text-sm mb-2">+ Add Ingredient</button>
      <textarea name="instructions" value={form.instructions} onChange={handleChange} className="w-full border mb-2 p-2" placeholder="Instructions" />
      <input name="cookingTime" value={form.cookingTime} onChange={handleChange} type="number" className="w-full border mb-2 p-2" placeholder="Cooking Time (mins)" />
      <input name="servings" value={form.servings} onChange={handleChange} type="number" className="w-full border mb-2 p-2" placeholder="Servings" />
      <select name="category" value={form.category} onChange={handleChange} className="w-full border mb-4 p-2">
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Dessert</option>
      </select>
      <button className="bg-green-500 text-white px-4 py-2 rounded">{editing ? 'Update' : 'Submit'}</button>
    </form>
  );
}