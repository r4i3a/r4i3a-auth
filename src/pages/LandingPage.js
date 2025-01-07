import { Link } from 'react-router-dom';
import Master from '../Layout/Master';

function LandingPage() {
    return (
        <Master>
            <div className="relative">
                <img src="/wallpaper.jpeg" className="w-full h-auto rounded-md" />
            </div>
            <div className="mt-7">
                <h2 className="mb-2 text-lg font-bold leading-none tracking-tight">R4i3a Auth</h2>
                <p className="mb-5 text-neutral-500">This is a straightforward authentication app designed to handle user registration, login with ease.</p>
                <div className="flex gap-1 justify-center">
                    <Link to="/login" className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-100 bg-white border-2 rounded-md text-neutral-900 hover:text-white border-neutral-900 hover:bg-neutral-900">Login</Link>
                    <Link to="/register" className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 rounded-md bg-neutral-950 hover:bg-neutral-900 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 focus:shadow-outline focus:outline-none">Register</Link>
                </div>
            </div>
        </Master>
    );
}

export default LandingPage;
