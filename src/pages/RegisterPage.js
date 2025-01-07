import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Master from '../Layout/Master';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (token && email) {
                navigate('/dashboard');
                return;
            }
        };

        fetchUser();
    }, [navigate]);

    const validateInputs = () => {
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/;

        let errors = { name: '', email: '', password: '' };

        if (!name) {
            errors.name = 'Name is required!';
        } else if (!nameRegex.test(name)) {
            errors.name = 'Name must contain only alphabets and spaces!';
        } else if (name.length < 3 || name.length > 32) {
            errors.name = 'Name must be between 3 and 32 characters!';
        }

        if (!email) {
            errors.email = 'Email is required!';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address!';
        }

        if (!password) {
            errors.password = 'Password is required!';
        } else if (!passwordRegex.test(password)) {
            errors.password = 'Password must contain at least one letter and one number!';
        } else if (password.length < 6 || password.length > 32) {
            errors.password = 'Password must be between 6 and 32 characters!';
        }

        setFieldErrors(errors);

        return errors;
    };

    const checkDuplicateEmail = async () => {
        setLoading(true);

        try {
            const response = await axios.post(
                'https://raisa.com.np/api/auth/check',
                { email }
            );

            return response.data.status;
        } catch (err) {
            console.error(err);
            setError('Error checking email availability!');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');
        setFieldErrors({ name: '', email: '', password: '' });

        const validationErrors = validateInputs();
        if (Object.values(validationErrors).some(error => error)) {
            return;
        }

        const isDuplicate = await checkDuplicateEmail();
        if (isDuplicate) {
            setFieldErrors(prev => ({ ...prev, email: 'Email is already in use. Please use a different email!' }));
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'https://raisa.com.np/api/auth/register',
                { name, email, password },
                {
                    headers: {
                        'x-r4i3a-auth': 'SKEUSO8FDJSKJH89DKJSHFJ9UIWSJKDKJSHFDJKSH29JKS',
                    },
                }
            );

            if (response.data.status) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
                setSuccess('Registration successful! Redirecting...');
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setError('Registration failed!');
            }
        } catch (err) {
            console.error(err);
            setError('Error occurred during registration!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Master
            title="Register"
            auth="true"
        >
            <h2 className="text-2xl font-semibold mb-2">Register</h2>
            <span className="text-sm text-gray-400">
                Sign up to access personalized features and updates.
            </span>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

            <form onSubmit={handleRegister} className="mt-5">
                <div className="mb-2">
                    <label className="text-sm text-gray-500">Full Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        className={`w-full p-2 border rounded mt-1 ${fieldErrors.name ? 'border-red-500' : ''}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {fieldErrors.name && <div className="text-red-500 text-sm my-2">{fieldErrors.name}</div>}
                </div>  
                
                <div className="mb-2">
                    <label className="text-sm text-gray-500">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full p-2 border rounded mt-1 ${fieldErrors.email ? 'border-red-500' : ''}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {fieldErrors.email && <div className="text-red-500 text-sm my-2">{fieldErrors.email}</div>}
                </div> 
                
                <div className="mb-2">
                    <label className="text-sm text-gray-500">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className={`w-full p-2 border rounded mt-1 ${fieldErrors.password ? 'border-red-500' : ''}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {fieldErrors.password && <div className="text-red-500 text-sm my-2">{fieldErrors.password}</div>}
                </div>   
                
                <button
                    type="submit"
                    className={`w-full py-2 text-white rounded flex justify-center items-center ${
                        loading ? 'bg-gray-400' : 'bg-gray-700 hover:bg-gray-950'
                    }`}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                    ) : (
                        'Register'
                    )}
                </button>
            </form>
            <p className="mt-4 text-center text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-gray-900 font-medium">
                    Login
                </Link>
            </p>
        </Master>
    );
}

export default RegisterPage;