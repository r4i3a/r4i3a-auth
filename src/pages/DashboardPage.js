import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from "boring-avatars";
import Master from '../Layout/Master';
import { CircleX } from 'lucide-react';

function DashboardPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (!token && !email) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.post(
                    'https://raisa.com.np/api/auth/user',
                    { 
                        email: email, 
                        token: token
                    },
                    {
                        headers: { 
                            'x-r4i3a-auth': 'SKEUSO8FDJSKJH89DKJSHFJ9UIWSJKDKJSHFDJKSH29JKS'
                        } 
                    }
                );

                if (response.data.name) {
                    setUser(response.data);
                }
            } catch (err) {
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (!token && !email) {
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                'https://raisa.com.np/api/auth/logout',
                { 
                    email: email, 
                    token: token
                },
                {
                    headers: { 
                        'x-r4i3a-auth': 'SKEUSO8FDJSKJH89DKJSHFJ9UIWSJKDKJSHFDJKSH29JKS'
                    } 
                }
            );

            if (response.data.status) {
                navigate('/login');
            } else {
                setError('Something went wrong badly. Please try again later');
            }
        } catch (err) {
            navigate('/login');
        } finally {
            setLoading(false);
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            
            navigate('/');
        }
    };

    return (
        <Master 
            title="Dashboard" 
            description="Manage your account settings and view your data below"
            image="/wallpaper.jpeg"
        >
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold pb-4 mb-8">Profile</h2>
                <Link to="/" className="text-gray-900 font-medium">
                    <CircleX className="w-6"/>
                </Link>
            </div>
            {user ? (
            <div>
                <div className="flex gap-2 items-start">
                    <Avatar name="{user.name}" variant="beam" className="w-8"/>
                    <div>
                        <h1 className="font-bold text-md">{user.name}</h1>
                        <p className="mb-4 text-sm">{user.email}</p>

                        <p className="mb-8 text-xs">
                            Joined on {new Date(user.created_at).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                </div>


                <button
                    type="button"
                    className={`w-full py-2 text-white rounded flex justify-center items-center ${
                        loading ? 'bg-red-400' : 'bg-red-500 hover:bg-red-700'
                    }`}
                    onClick={handleLogout}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                    ) : (
                        'Logout'
                    )}
                </button>

                {error && <div className="text-red-500 text-sm mt-2 mb-4">{error}</div>}

            </div>
            ) : (
            <div className="animate-pulse">
                <div className="flex gap-2 items-start">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-24 "></div>
                        <div className="h-3 bg-gray-300 rounded mb-4 w-32 "></div>
                        <div className="h-3 bg-gray-300 rounded mb-8 w-24 "></div>
                    </div>
                </div>

                <button
                    className="w-full py-2 bg-gray-300 text-white rounded-lg cursor-not-allowed"
                    disabled
                >
                    Logout
                </button>
            </div>
            )}           
        </Master>
    );
}

export default DashboardPage;
