import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-950">
            <div className="bg-white m-5 p-5 rounded-lg text-center">
                <h1 className="text-4xl font-bold mb-4 border-b p-4">Welcome to Raisa</h1>
                <div className="flex gap-1 justify-center">
                    <Link to="/login" className="border border-2 border-gray-950 text-black py-2 px-4 rounded-lg hover:bg-gray-950 hover:text-white">Login</Link>
                    <Link to="/register" className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-950">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
