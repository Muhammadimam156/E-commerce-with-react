import React, { useEffect, useState } from "react";
import axios from "axios";

/*
    Admin Products page (CRUD)
    Place in: src/pages/admin/products.jsx

    Notes:
    - Adjust API_BASE to match your backend endpoints.
    - This component implements:
        - Read: fetch list of products
        - Create: add a new product
        - Update: edit an existing product
        - Delete: remove a product
*/

const API_BASE = "https://e-commerce-api-nine-navy.vercel.app/api/products";


 // change as needed

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form state (used for both create & edit)
    const emptyForm = {
        id: null,
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        imageUrl: "",
    };
    const [form, setForm] = useState(emptyForm);
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(API_BASE);
            setProducts(res.data || []);
        } catch (err) {
            setError(err.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    }

    function openCreate() {
        setForm(emptyForm);
        setIsEditing(false);
        setShowForm(true);
    }

    function openEdit(product) {
        setForm({
            id: product._id || product.id || null,
            name: product.name || "",
            price: product.price || "",
            description: product.description || "",
            category: product.category || "",
            stock: product.stock || "",
            imageUrl: product.imageUrl || "",
        });
        setIsEditing(true);
        setShowForm(true);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const payload = {
                name: form.name,
                price: parseFloat(form.price) || 0,
                description: form.description,
                category: form.category,
                stock: parseInt(form.stock, 10) || 0,
                imageUrl: form.imageUrl,
            };

            if (isEditing && form.id) {
                // UPDATE
                const res = await axios.put(`${API_BASE}/${form.id}`, payload);
                // update state
                setProducts((prev) =>
                    prev.map((p) => ((p._id || p.id) === form.id ? res.data : p))
                );
            } else {
                // CREATE
                const res = await axios.post(API_BASE, payload);
                setProducts((prev) => [res.data, ...prev]);
            }

            setShowForm(false);
            setForm(emptyForm);
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Save failed");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(product) {
        const id = product._id || product.id;
        if (!id) return;
        if (!window.confirm(`Delete "${product.name}"?`)) return;
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_BASE}/${id}`);
            setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Delete failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: 16, maxWidth: 1100, margin: "0 auto" }}>
            <h2>Admin — Products</h2>

            <div style={{ marginBottom: 12 }}>
                <button onClick={openCreate} style={{ marginRight: 8 }}>
                    + New product
                </button>
                <button onClick={fetchProducts}>Refresh</button>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}

            {showForm && (
                <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                    <h3>{isEditing ? "Edit product" : "Create product"}</h3>
                    <div style={{ display: "grid", gap: 8, maxWidth: 600 }}>
                        <input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="price"
                            placeholder="Price"
                            type="number"
                            step="0.01"
                            value={form.price}
                            onChange={handleChange}
                        />
                        <input
                            name="category"
                            placeholder="Category"
                            value={form.category}
                            onChange={handleChange}
                        />
                        <input
                            name="stock"
                            placeholder="Stock"
                            type="number"
                            value={form.stock}
                            onChange={handleChange}
                        />
                        <input
                            name="imageUrl"
                            placeholder="Image URL"
                            value={form.imageUrl}
                            onChange={handleChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                        />
                        <div>
                            <button type="submit" disabled={loading}>
                                {isEditing ? "Update" : "Create"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setForm(emptyForm);
                                    setIsEditing(false);
                                }}
                                style={{ marginLeft: 8 }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                }}
            >
                <thead>
                    <tr>
                        <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>#</th>
                        <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>Name</th>
                        <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>Price</th>
                        <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
                            Category
                        </th>
                        <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>Stock</th>
                        <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 && (
                        <tr>
                            <td colSpan="6" style={{ padding: 12 }}>
                                No products
                            </td>
                        </tr>
                    )}
                    {products.map((p, idx) => {
                        const id = p._id || p.id;
                        return (
                            <tr key={id || idx}>
                                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                                    {idx + 1}
                                </td>
                                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                        {p.imageUrl ? (
                                            <img
                                                src={p.imageUrl}
                                                alt=""
                                                style={{ width: 40, height: 40, objectFit: "cover" }}
                                            />
                                        ) : null}
                                        <span>{p.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                                    ${p.price?.toFixed ? p.price.toFixed(2) : p.price}
                                </td>
                                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                                    {p.category}
                                </td>
                                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                                    {p.stock}
                                </td>
                                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                                    <button onClick={() => openEdit(p)} style={{ marginRight: 8 }}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(p)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}