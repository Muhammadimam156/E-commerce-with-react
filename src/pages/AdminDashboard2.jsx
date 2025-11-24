import React, { useState, useEffect, useMemo } from 'react';

// --- CONFIGURATION ---
// Base URL for your Node.js backend API calls
const BACKEND_URL = 'http://localhost:5000';
// Theme constants
const PRIMARY_COLOR_CLASS = 'bg-gray-900';
const ACCENT_COLOR_CLASS = 'text-indigo-500';

// --- ICON MOCK (Using simple text/emojis) ---
const Icon = ({ children, className = '' }) => <span className={`mr-2 ${className}`}>{children}</span>;



const api = {
    fetch: async (endpoint) => {
        console.log(`FETCHING data from: ${BACKEND_URL}${endpoint}`);
        
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 500)); 

        // Mock data response
        if (endpoint.includes('products')) {
            return [
                { id: 'p1', name: 'Premium Gaming Keyboard', price: 129.99, stock: 35, category: 'Electronics' },
                { id: 'p2', name: 'Organic Coffee Beans', price: 14.50, stock: 210, category: 'Groceries' },
                { id: 'p3', name: 'Noise Cancelling Headphones', price: 349.00, stock: 15, category: 'Electronics' },
                { id: 'p4', name: 'Leather Wallet', price: 49.99, stock: 180, category: 'Accessories' },
            ];
        } else if (endpoint.includes('reviews')) {
             return [
                { id: 'r1', product: 'Keyboard', user: 'Ali Khan', rating: 5, comment: 'Very responsive keys.', status: 'Pending' },
                { id: 'r2', product: 'Coffee Beans', user: 'Sara Ahmed', rating: 4, comment: 'Fresh and aromatic.', status: 'Approved' },
            ];
        }
        return [];
    },

    action: async (method, endpoint, body) => {
        console.log(`ACTION: ${method} to ${BACKEND_URL}${endpoint} with body:`, body);
        
        // Simulating network delay for action (for a realistic loading state)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // --- This is where your actual Node.js fetch call will go ---
        /*
        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error(`API Action failed with status: ${response.status}`);
        return await response.json();
        */
        
        // Mock response
        if (method === 'DELETE') {
            return { success: true, message: `Deletion successful (Simulated)` };
        } else if (method === 'POST') {
             return { success: true, message: `Creation successful (Simulated)`, id: `new_${Date.now()}` };
        } else {
            return { success: true, message: `Update successful (Simulated)` };
        }
    }
};

//// statcard 
const StatCard = ({ title, value, iconText, color, trend }) => (
    <div className="p-5 bg-white rounded-xl shadow-lg border-t-4 transition duration-300 hover:shadow-2xl" style={{ borderColor: color }}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
                <p className="text-3xl font-extrabold text-gray-800 mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-full bg-opacity-20`} style={{ backgroundColor: `${color}1A` }}>
                <span className={`w-6 h-6 text-xl`} style={{ color: color }}>{iconText}</span>
            </div>
        </div>
        <p className={`text-xs mt-3 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}% vs Last Month
        </p>
    </div>
);

const NavItem = ({ iconText, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full p-3 rounded-xl transition duration-200 ease-in-out ${
            isActive
                ? 'bg-indigo-600 text-white font-semibold shadow-lg'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`}
    >
        <Icon className="text-xl">{iconText}</Icon>
        {label}
    </button>
);

// ----------------------------------------------------------------------------------
// PRODUCT FORM MODAL (Handles Add and Edit)
// ----------------------------------------------------------------------------------
const ProductFormModal = ({ product = {}, onClose, onSave, setUIMessage }) => {
    const CATEGORIES = [
        'Electronics','Cameras','Laptops','Accessories','Headphones','Food','Books',
        'Clothes/Shoes','Beauty/Health','Sports','Outdoor','Home'
    ];

    const isEdit = !!product.id;
    const [formData, setFormData] = useState({
        name: product.name || '',
        price: product.price != null ? product.price : 0.0,
        stock: product.stock != null ? product.stock : 0,
        description: product.description || '',
        ratings: product.ratings != null ? product.ratings : 0,
        images: product.images ? product.images.map(img => (typeof img === 'string' ? { public_id: '', url: img } : img)) : [],
        category: product.category || '',
        seller: product.seller || ''
    });
    const [saving, setSaving] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' || name === 'ratings' ? Number(value) : value
        }));
        setValidationError('');
    };

    const addImage = (url = '') => {
        setFormData(prev => ({ ...prev, images: [...prev.images, { public_id: '', url }] }));
    };
    const updateImage = (index, url) => {
        setFormData(prev => {
            const images = [...prev.images];
            images[index] = { ...images[index], url };
            return { ...prev, images };
        });
    };
    const removeImage = (index) => {
        setFormData(prev => {
            const images = prev.images.filter((_, i) => i !== index);
            return { ...prev, images };
        });
    };

    const validate = () => {
        if (!formData.name || formData.name.trim().length === 0) return 'Product name is required.';
        if (formData.name.length > 100) return 'Product name cannot exceed 100 characters.';
        if (formData.price == null || formData.price <= 0) return 'Product price must be greater than 0.';
        if (!formData.description || formData.description.trim().length === 0) return 'Product description is required.';
        if (!formData.seller || formData.seller.trim().length === 0) return 'Product seller is required.';
        if (formData.stock == null || formData.stock < 0) return 'Product stock must be 0 or greater.';
        if (!formData.category || !CATEGORIES.includes(formData.category)) return 'Please select a valid category.';
        // images optional but if present must have url
        for (let img of formData.images) {
            if (!img || !img.url || img.url.trim() === '') return 'All images must have a valid URL or be removed.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            setValidationError(err);
            return;
        }

        setSaving(true);
        const apiMethod = isEdit ? 'PUT' : 'POST';
        const apiEndpoint = isEdit ? `/api/admin/products/${product.id}` : '/api/admin/products';
        const successMessage = isEdit
            ? `Product '<strong>${formData.name}</strong>' updated successfully.`
            : `New product '<strong>${formData.name}</strong>' added successfully.`;

        // Normalize images to { public_id, url }
        const imagesPayload = formData.images.map((img, idx) => {
            // if img already has public_id keep it, otherwise generate a lightweight id for demo
            const public_id = img.public_id && img.public_id.length ? img.public_id : `img_${Date.now()}_${idx}`;
            return { public_id, url: img.url };
        });

        const payload = {
            name: formData.name.trim(),
            price: Number(formData.price),
            stock: Number(formData.stock),
            description: formData.description.trim(),
            ratings: Number(formData.ratings || 0),
            images: imagesPayload,
            category: formData.category,
            seller: formData.seller.trim()
        };

        try {
            setUIMessage({ type: 'info', text: isEdit ? 'Updating product...' : 'Adding new product...' });
            await api.action(apiMethod, apiEndpoint, payload);
            setUIMessage({ type: 'success', text: successMessage });
            onSave();
            onClose();
        } catch (error) {
            setUIMessage({ type: 'error', text: `Error: ${error.message}` });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
                            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700 text-3xl transition">&times;</button>
                        </div>

                        {validationError && (
                            <div className="p-3 mb-3 text-sm bg-red-100 border border-red-300 text-red-700 rounded-lg">{validationError}</div>
                        )}

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Product Name</label>
                                <input id="name" name="name" value={formData.name} onChange={handleChange} required maxLength={100}
                                       placeholder="e.g., Smart Watch Pro"
                                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">Price ($)</label>
                                    <input id="price" name="price" type="number" value={formData.price} onChange={handleChange} min="0.01" step="0.01" required
                                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="stock">Stock Quantity</label>
                                    <input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} min="0" required
                                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">Category</label>
                                <select id="category" name="category" value={formData.category} onChange={handleChange} required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">-- Select Category --</option>
                                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="seller">Seller</label>
                                <input id="seller" name="seller" value={formData.seller} onChange={handleChange} required
                                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Description</label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4}
                                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Images (URLs)</label>
                                <div className="space-y-2">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="flex items-center space-x-2">
                                            <input
                                                type="url"
                                                placeholder="https://example.com/image.jpg"
                                                value={img.url}
                                                onChange={(e) => updateImage(idx, e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            <button type="button" onClick={() => removeImage(idx)} className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button>
                                        </div>
                                    ))}
                                    <div>
                                        <button type="button" onClick={() => addImage('')} className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Add Image</button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ratings (readonly)</label>
                                <input type="number" name="ratings" value={formData.ratings} onChange={handleChange} min="0" max="5"
                                       className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                <p className="text-xs text-gray-500 mt-1">Ratings default/current value. Usually updated from reviews.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 pt-0 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition" disabled={saving}>Cancel</button>
                        <button type="submit" disabled={saving} className={`px-5 py-2.5 text-sm font-medium text-white rounded-xl transition shadow-lg ${saving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                            {saving ? 'Processing...' : (isEdit ? 'Save Changes' : 'Add Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------------------
// PRODUCT MANAGER (Handles CRUD UI)
// ----------------------------------------------------------------------------------

const ProductsManager = ({ products, refreshData, setUIMessage }) => {
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null); 
    
    // Handlers for Add/Edit
    const handleOpenFormModal = (product = {}) => {
        setCurrentProduct(product); 
        setIsFormModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsFormModalOpen(false);
        setCurrentProduct(null);
    }

    // Handlers for Delete
    const handleDeleteProduct = (id, name) => {
        setCurrentProduct({ id, name });
        setIsConfirmingDelete(true);
    };

    const confirmDelete = async () => {
        setIsConfirmingDelete(false);
        if (!currentProduct || !currentProduct.id) return;

        const { id, name } = currentProduct;
        
        try {
            setUIMessage({ type: 'info', text: `Deleting '<strong>${name}</strong>'...` });
            await api.action('DELETE', `/api/admin/products/${id}`);
            setUIMessage({ type: 'success', text: `Product '<strong>${name}</strong>' deleted successfully.` });
            refreshData();
        } catch (error) {
            setUIMessage({ type: 'error', text: `Error deleting product: ${error.message}` });
        } finally {
            setCurrentProduct(null);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
                <button
                    onClick={() => handleOpenFormModal()}
                    className="flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition duration-150 shadow-md"
                >
                    <Icon>➕</Icon>
                    Add New Product
                </button>
            </div>
            
            {/* Custom Delete Confirmation UI */}
            {isConfirmingDelete && currentProduct && (
                <div className="p-4 mb-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm font-medium text-yellow-800 mb-2 md:mb-0">
                        Are you sure you want to delete **{currentProduct.name}**? This action cannot be undone.
                    </p>
                    <div className="flex space-x-3 flex-shrink-0">
                        <button 
                            onClick={confirmDelete} 
                            className="text-sm font-semibold text-white bg-red-600 px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
                        >
                            Confirm Delete
                        </button>
                        <button 
                            onClick={() => setIsConfirmingDelete(false)} 
                            className="text-sm font-semibold text-gray-700 bg-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="overflow-x-auto rounded
