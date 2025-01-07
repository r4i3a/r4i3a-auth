import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');

        navigate('/');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-950">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold pb-4 mb-8 border-b">Dashboard</h2>
            {user ? (
            <div>
                <div className="flex gap-2 items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 m-2">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                    </svg>

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
                className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                onClick={handleLogout}
                >
                Logout
                </button>
            </div>
            ) : (
            <p>Loading...</p>
            )}
        </div>
        </div>
    );
}

export default DashboardPage;
