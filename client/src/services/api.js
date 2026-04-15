const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Get auth token from localStorage
    getToken() {
        return localStorage.getItem('token');
    }

    // Set auth token in localStorage
    setToken(token) {
        localStorage.setItem('token', token);
    }

    // Remove auth token
    removeToken() {
        localStorage.removeItem('token');
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Add auth token if available
        const token = this.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, config);
            const contentType = response.headers.get('content-type');
            const data = contentType?.includes('application/json') ? await response.json() : null;

            if (!response.ok) {
                const message = data?.message || data?.error || response.statusText || 'Request failed';
                throw new Error(message);
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Auth methods
    async login(credentials) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        if (data.token) {
            this.setToken(data.token);
        }
        return data;
    }

    async register(userData) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        return data;
    }

    async getCurrentUser() {
        return this.request('/auth/me');
    }

    // Content methods
    async getHero() {
        return this.request('/content/hero');
    }

    async getAbout() {
        return this.request('/content/about');
    }

    async getServices() {
        return this.request('/content/services');
    }

    async getProgram() {
        return this.request('/content/program');
    }

    async getTestimonials() {
        return this.request('/content/testimonials');
    }

    async getResults() {
        return this.request('/content/results');
    }

    // Admin content methods
    async updateHero(heroData) {
        return this.request('/admin/hero', {
            method: 'PUT',
            body: JSON.stringify(heroData),
        });
    }

    async updateAbout(aboutData) {
        return this.request('/admin/about', {
            method: 'PUT',
            body: JSON.stringify(aboutData),
        });
    }

    async createService(serviceData) {
        return this.request('/admin/services', {
            method: 'POST',
            body: JSON.stringify(serviceData),
        });
    }

    async updateService(id, serviceData) {
        return this.request(`/admin/services/${id}`, {
            method: 'PUT',
            body: JSON.stringify(serviceData),
        });
    }

    async deleteService(id) {
        return this.request(`/admin/services/${id}`, {
            method: 'DELETE',
        });
    }

    async updateProgram(programData) {
        return this.request('/admin/program', {
            method: 'PUT',
            body: JSON.stringify(programData),
        });
    }

    async createTestimonial(testimonialData) {
        return this.request('/admin/testimonials', {
            method: 'POST',
            body: JSON.stringify(testimonialData),
        });
    }

    async updateTestimonial(id, testimonialData) {
        return this.request(`/admin/testimonials/${id}`, {
            method: 'PUT',
            body: JSON.stringify(testimonialData),
        });
    }

    async deleteTestimonial(id) {
        return this.request(`/admin/testimonials/${id}`, {
            method: 'DELETE',
        });
    }

    async createResult(resultData) {
        return this.request('/admin/results', {
            method: 'POST',
            body: JSON.stringify(resultData),
        });
    }

    async updateResult(id, resultData) {
        return this.request(`/admin/results/${id}`, {
            method: 'PUT',
            body: JSON.stringify(resultData),
        });
    }

    async deleteResult(id) {
        return this.request(`/admin/results/${id}`, {
            method: 'DELETE',
        });
    }

    // Admin user management
    async getUsers() {
        return this.request('/admin/users');
    }

    async updateUser(id, userData) {
        return this.request(`/admin/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }

    async deleteUser(id) {
        return this.request(`/admin/users/${id}`, {
            method: 'DELETE',
        });
    }
}

export default new ApiService();