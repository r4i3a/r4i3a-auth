import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
        if (!email) {
            return 'Email is required!';
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address!';
        }
        if (!password) {
            return 'Password is required!';
        }
        if (password.length < 6) {
            return 'Password must be atleast 6 characters!';
        }
        return null;
    };  

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
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
                setError('Invalid email or password!');
            }
        } catch (err) {
            setError('Error occurred during login!');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-950">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-8 pb-4 border-b">Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-500">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
