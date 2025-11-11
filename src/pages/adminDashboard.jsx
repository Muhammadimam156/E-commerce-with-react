import React, { useState, useEffect, useMemo } from 'react';

// --- CONFIGURATION ---
// Base URL for your Node.js backend API calls
const BACKEND_URL = 'http://localhost:5000';
// Theme constants
const PRIMARY_COLOR_CLASS = 'bg-gray-900';
const ACCENT_COLOR_CLASS = 'text-indigo-500';

// --- ICON MOCK (Using simple text/emojis) ---
const Icon = ({ children, className = '' }) => <span className={`mr-2 ${className}`}>{children}</span>;

// ----------------------------------------------------------------------------------
// API CONNECTION LOGIC (MOCKING FOR NODE.JS INTEGRATION)
// ----------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------
// UTILITY COMPONENTS 
// ----------------------------------------------------------------------------------

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

const ProductFormModal = ({ product, onClose, onSave, setUIMessage }) => {
    const isEdit = !!product.id;
    const [formData, setFormData] = useState({
        name: product.name || '',
        price: product.price || 0,
        stock: product.stock || 0,
    });
    const [saving, setSaving] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }));
        setValidationError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || formData.price <= 0 || formData.stock < 0) {
            setValidationError('Please ensure all fields are valid. Price must be greater than 0.');
            return;
        }

        setSaving(true);
        const apiMethod = isEdit ? 'PUT' : 'POST';
        const apiEndpoint = isEdit ? `/api/admin/products/${product.id}` : '/api/admin/products';
        const successMessage = isEdit 
            ? `Product '<strong>${formData.name}</strong>' updated successfully.` 
            : `New product '<strong>${formData.name}</strong>' added successfully.`;
        
        try {
            setUIMessage({ type: 'info', text: isEdit ? 'Updating product...' : 'Adding new product...' });
            await api.action(apiMethod, apiEndpoint, formData);
            setUIMessage({ type: 'success', text: successMessage });
            onSave(); // Trigger data refresh
            onClose();
        } catch (error) {
            setUIMessage({ type: 'error', text: `Error: ${error.message}` });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
                            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700 text-3xl transition">&times;</button>
                        </div>
                        
                        {validationError && (
                            <div className="p-3 mb-3 text-sm bg-red-100 border border-red-300 text-red-700 rounded-lg">{validationError}</div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Product Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Smart Watch Pro"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">Price ($)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0.01"
                                    step="0.01"
                                    required
                                    placeholder="199.99"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="stock">Stock Quantity</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    placeholder="50"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 pt-0 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-5 py-2.5 text-sm font-medium text-white rounded-xl transition shadow-lg ${saving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            disabled={saving}
                        >
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
            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition duration-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${product.price?.toFixed(2) || '0.00'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        product.stock < 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                        {product.stock || 0} In Stock
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-4">
                                    <button onClick={() => handleOpenFormModal(product)} className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id, product.name)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Render the Product Form Modal if open */}
            {isFormModalOpen && currentProduct && (
                <ProductFormModal 
                    product={currentProduct} 
                    onClose={handleCloseModal}
                    onSave={refreshData}
                    setUIMessage={setUIMessage}
                />
            )}
        </div>
    );
};

const ReviewsManager = ({ reviews, refreshData, setUIMessage }) => {
    
    // Mock action to approve a review
    const handleAction = async (id, action) => {
        const newStatus = action === 'approve' ? 'Approved' : 'Rejected';
        try {
            setUIMessage({ type: 'info', text: `Review ID ${id} is being processed...` });
            await api.action('PUT', `/api/admin/reviews/${id}`, { status: newStatus });
            setUIMessage({ type: 'success', text: `Review ID ${id} set to ${newStatus}.` });
            refreshData();
        } catch (error) {
            setUIMessage({ type: 'error', text: `Error updating review: ${error.message}` });
        }
    };
    
    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Moderation</h2>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="p-4 border border-gray-100 rounded-lg flex justify-between items-start hover:bg-gray-50 transition duration-150">
                        <div>
                            <p className="text-md font-semibold text-gray-900">{review.product} 
                                <span className="text-sm font-normal text-gray-500 ml-2">by {review.user}</span>
                            </p>
                            <div className="flex items-center my-1">
                                <span className="flex text-yellow-500 text-lg">
                                    {'⭐'.repeat(review.rating)}
                                </span>
                                <span className={`ml-4 text-xs font-semibold px-3 py-1 rounded-full ${
                                    review.status === 'Approved' ? 'bg-green-100 text-green-800' : (review.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800')
                                }`}>
                                    {review.status}
                                </span>
                            </div>
                            <p className="text-sm italic text-gray-600 mt-2 line-clamp-2">"{review.comment}"</p>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0 mt-2">
                            {review.status === 'Pending' && (
                                <>
                                    <button onClick={() => handleAction(review.id, 'approve')} className="text-sm font-medium text-white bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600 transition">Approve</button>
                                    <button onClick={() => handleAction(review.id, 'reject')} className="text-sm font-medium text-gray-700 bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition">Reject</button>
                                </>
                            )}
                            {review.status !== 'Pending' && (
                                <button onClick={() => handleAction(review.id, 'delete')} className="text-sm font-medium text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition">Delete</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// ----------------------------------------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------------------------------------

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    // State for non-blocking UI messages (like success/error messages)
    const [uiMessage, setUIMessage] = useState(null); 

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [productData, reviewData] = await Promise.all([
                api.fetch('/api/admin/products'),
                api.fetch('/api/admin/reviews'),
            ]);

            setProducts(productData);
            setReviews(reviewData);

            // Stats calculation
            setStats({
                totalProducts: productData.length,
                totalRevenue: '$320,000',
                pendingReviews: reviewData.filter(r => r.status === 'Pending').length,
                lowStock: productData.filter(p => p.stock < 50).length,
            });

        } catch (error) {
            console.error("Error fetching admin data:", error);
            setUIMessage({ type: 'error', text: 'Failed to load data from the server. Check console.' });
        }
        setLoading(false);
    };

    // Initial data fetch and cleanup
    useEffect(() => {
        fetchAllData();
    }, []);

    // Clear message after 5 seconds
    useEffect(() => {
        if (uiMessage) {
            const timer = setTimeout(() => setUIMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [uiMessage]);

    const DashboardView = useMemo(() => () => (
        <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-gray-800">Dashboard Overview</h1>
            
            {/* --- Top Stat Cards --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Products" value={stats.totalProducts || 'N/A'} iconText="📦" color="#4f46e5" trend={12.5}/>
                <StatCard title="Total Revenue" value={stats.totalRevenue || 'N/A'} iconText="💰" color="#10b981" trend={8.2}/>
                <StatCard title="Pending Reviews" value={stats.pendingReviews || 'N/A'} iconText="💬" color="#f59e0b" trend={-3.1}/>
                <StatCard title="Low Stock Items" value={stats.lowStock || 'N/A'} iconText="🚨" color="#ef4444" trend={-1.8}/>
            </div>

            {/* --- Management Panels --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-700">Low Stock Products ({stats.lowStock || 0})</h3>
                            <button onClick={() => setActiveTab('products')} className={`${ACCENT_COLOR_CLASS} text-sm font-medium hover:text-indigo-800 transition duration-150`}>
                                Manage Products
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-80">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Stock</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
                                    {products.filter(p => p.stock < 50).slice(0, 5).map((p) => (
                                        <tr key={p.id}>
                                            <td className="px-4 py-3 font-medium">{p.name}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="px-2 py-1 text-xs font-semibold rounded text-red-600 bg-red-100">
                                                    {p.stock}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.filter(p => p.stock < 50).length === 0 && (
                                        <tr><td colSpan="2" className="text-center text-gray-500 text-sm py-4">All stock levels are healthy!</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-700">Pending Reviews ({stats.pendingReviews || 0})</h3>
                            <button onClick={() => setActiveTab('reviews')} className={`${ACCENT_COLOR_CLASS} text-sm font-medium hover:text-indigo-800 transition duration-150`}>
                                Check Reviews
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-80">
                            <ul className="space-y-4">
                                {reviews.filter(r => r.status === 'Pending').slice(0, 3).map((r) => (
                                    <li key={r.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{r.user}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1">{r.product}</p>
                                        </div>
                                        <button 
                                            onClick={() => api.action('PUT', `/api/admin/reviews/${r.id}`, { status: 'Approved' }).then(fetchAllData)} 
                                            className="text-green-500 hover:text-green-700 text-sm font-medium"
                                        >
                                            Approve
                                        </button>
                                    </li>
                                ))}
                                {reviews.filter(r => r.status === 'Pending').length === 0 && (
                                    <p className="text-center text-gray-500 text-sm py-4">No pending reviews.</p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ), [products, reviews, stats]);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[50vh]">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-900"></div>
                    <p className="mt-4 text-xl font-semibold text-gray-600">Connecting to Backend...</p>
                    <p className="mt-2 text-sm text-gray-500">(Checking {BACKEND_URL})</p>
                </div>
            );
        }

        switch (activeTab) {
            case 'dashboard':
                return DashboardView();
            case 'products':
                return <ProductsManager products={products} refreshData={fetchAllData} setUIMessage={setUIMessage} />;
            case 'reviews':
                return <ReviewsManager reviews={reviews} refreshData={fetchAllData} setUIMessage={setUIMessage} />;
            case 'offers':
                return <div className="p-8"><h2 className="text-2xl font-bold text-gray-800">Offers Control (Connectivity Ready)</h2></div>;
            case 'analytics':
                return <div className="p-8"><h2 className="text-2xl font-bold text-gray-800">Analytics Report (Connectivity Ready)</h2></div>;
            default:
                return DashboardView();
        }
    };

    const getMessageClasses = () => {
        if (!uiMessage) return "hidden";
        switch (uiMessage.type) {
            case 'success':
                return 'bg-green-100 border-green-400 text-green-700';
            case 'error':
                return 'bg-red-100 border-red-400 text-red-700';
            case 'info':
            default:
                return 'bg-blue-100 border-blue-400 text-blue-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar (Navigation - Gray 900) */}
            <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-300 ease-in-out z-30 w-64 ${PRIMARY_COLOR_CLASS} shadow-2xl p-4`}>
                <div className="flex justify-between items-center mb-10 h-16">
                    <h1 className="text-2xl font-black text-white">E-COMMERCE ADMIN</h1>
                    <button className="lg:hidden p-2 text-white hover:text-gray-300" onClick={() => setIsSidebarOpen(false)}>
                        <Icon>✕</Icon>
                    </button>
                </div>

                <nav className="space-y-2">
                    <NavItem iconText="🏠" label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} />
                    
                    <div className="pt-4 mt-4 border-t border-gray-700">
                        <p className="text-xs uppercase text-gray-400 font-bold mb-2 ml-3">Management</p>
                        <NavItem iconText="📦" label="Products" isActive={activeTab === 'products'} onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }} />
                        <NavItem iconText="💬" label="Reviews" isActive={activeTab === 'reviews'} onClick={() => { setActiveTab('reviews'); setIsSidebarOpen(false); }} />
                        <NavItem iconText="🎁" label="Offers" isActive={activeTab === 'offers'} onClick={() => { setActiveTab('offers'); setIsSidebarOpen(false); }} />
                        <NavItem iconText="📈" label="Analytics" isActive={activeTab === 'analytics'} onClick={() => { setActiveTab('analytics'); setIsSidebarOpen(false); }} />
                    </div>
                </nav>

                <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-sm text-gray-400">Connected to {BACKEND_URL}</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between p-4 bg-white shadow-md lg:h-16 h-14 sticky top-0 z-20">
                    <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900" onClick={() => setIsSidebarOpen(true)}>
                        <Icon>☰</Icon>
                    </button>
                    <div className="text-xl font-semibold text-gray-800 hidden lg:block">Welcome Back!</div>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search Dashboard..."
                            className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 hidden sm:block"
                        />
                        <div className="h-10 w-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg">A</div>
                    </div>
                </header>

                {/* UI Message Box (Notification System) */}
                <div className={`sticky top-16 z-10 p-4 border-l-4 rounded-b-md shadow-lg transition duration-300 ${getMessageClasses()}`}>
                    {uiMessage && (
                        <div className="flex justify-between items-center">
                            {/* Uses dangerouslySetInnerHTML for allowing <strong> tags in success/error messages */}
                            <p className="font-medium" dangerouslySetInnerHTML={{ __html: uiMessage.text }} />
                            <button onClick={() => setUIMessage(null)} className="text-xl leading-none font-semibold">&times;</button>
                        </div>
                    )}
                </div>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;