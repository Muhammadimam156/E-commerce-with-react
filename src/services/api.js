const API =  'http://localhost:5000';


export async function login(email, password) {
const res = await fetch(`${API}/api/auth/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
credentials: 'include',
body: JSON.stringify({ email, password })
});
return res.json();
}


export async function signup(payload) {
const res = await fetch(`${API}/api/auth/signup`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
});
return res.json();
}


export async function fetchProducts() {
const res = await fetch(`${API}/api/products`, { credentials: 'include' });
return res.json();
}


export async function createProduct(product) {
const res = await fetch(`${API}/api/products`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
credentials: 'include',
body: JSON.stringify(product)
});
return res.json();
}


export async function logout() {
const res = await fetch(`${API}/api/auth/logout`, {
method: 'POST',
credentials: 'include'
});
return res.json();
}