import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const validateInputs = () => {
        const nameRegex = /^[A-Za-z\s]+$/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/; 
    
        if (!name) {
            return 'Name is required!';
        }
        if (!nameRegex.test(name)) {
            return 'Name must contain only alphabets and spaces!';
        }
        if (name.length < 3 || name.length > 32) {
            return 'Name must be between 3 and 32 characters!';
        }
        if (!email) {
            return 'Email is required!';
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address!';
        }
        if (!password) {
            return 'Password is required!';
        }
        if (!passwordRegex.test(password)) {
            return 'Password must contain at least one letter and one number!';
        }
        if (password.length < 6 || password.length > 32) {
            return 'Password must be between 6 and 32 characters!';
        }
        return null;
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

        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            return;
        }

        const isDuplicate = await checkDuplicateEmail();
        if (isDuplicate) {
            setError('Email is already in use. Please use a different email!');
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
        <div className="flex justify-center items-center h-screen bg-gray-950">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-8 pb-4 border-b">Register</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 mb-4 border rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                            'Register'
                        )}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{' '}                   
                    <Link to="/login" className=" text-blue-500">Login</Link>

                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
