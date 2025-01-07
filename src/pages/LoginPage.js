import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Master from '../Layout/Master';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let errors = { email: '', password: '' };

        if (!email) {
            errors.email = 'Email is required!';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address!';
        }

        if (!password) {
            errors.password = 'Password is required!';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters!';
        }

        setFieldErrors(errors);

        return errors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const validationErrors = validateInputs();
        if (Object.values(validationErrors).some(error => error)) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                'https://raisa.com.np/api/auth/login',
                { email, password },
                {
                    headers: {
                        'x-r4i3a-auth': 'SKEUSO8FDJSKJH89DKJSHFJ9UIWSJKDKJSHFDJKSH29JKS',
                    },
                }
            );

            if (response.data.status) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
                navigate('/dashboard');
            } else {
                setEmail('');
                setPassword('');

                setError('Invalid email or password!');
            }
        } catch (err) {
            setEmail('');
            setPassword('');

            setError('Error occurred during login!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Master
            title="Login"
            auth="true"
        >
            <h2 className="text-2xl font-semibold mb-2">Login</h2>
            <span className="text-sm text-gray-400">
                Enter your credentials to access your account.
            </span>

            {error && <div className="text-red-500 text-sm mt-2 mb-4">{error}</div>}
            <form onSubmit={handleLogin} className="mt-5">
                <div className="mb-2">
                    <label className="text-sm text-gray-500">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full p-2 border rounded mt-1 ${fieldErrors.email ? 'border-red-500' : ''}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
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
                        autoComplete="off"
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
                        'Login'
                    )}
                </button>
            </form>
            <p className="mt-4 text-center text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-gray-900 font-medium">
                    Register
                </Link>
            </p>
        </Master>
    );
}

export default LoginPage;
