import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct, logout } from '../services/api';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: '', price: 0 });

  useEffect(()=>{ (async ()=>{ const p = await fetchProducts(); setProducts(p || []); })(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    await createProduct(form);
    const p = await fetchProducts();
    setProducts(p || []);
  }

  async function handleLogout() {
    await logout();
    window.location.href = '/login';
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleCreate}>
        <input placeholder="Title" onChange={e=>setForm({...form, title: e.target.value})} required />
        <input placeholder="Price" type="number" onChange={e=>setForm({...form, price: Number(e.target.value)})} required />
        <button type="submit">Create Product</button>
      </form>

      <ul>{products.map(p => <li key={p._id}>{p.title} — ${p.price}</li>)}</ul>
    </div>
  );
}
