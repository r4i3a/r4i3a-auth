import React from 'react';
import { Helmet } from 'react-helmet'; 
import { Link } from 'react-router-dom';
import { CircleChevronLeft } from 'lucide-react';

const Master = ({ title, description, image, children, auth }) => {
    return (
        <div>            
            <Helmet>
                <title>{title ? `${title} - R4i3a Auth` : 'R4i3a Auth'}</title>
                <meta name="description" content={description || 'Default description for SEO'} />
                <meta name="image" content={image || '/wallpaper.jpeg'} /> 
                <meta property="og:title" content={title || 'R4i3a Auth'} />
                <meta property="og:description" content={description || 'Default description for SEO'} />
                <meta property="og:image" content={image || '/wallpaper.jpeg'} /> 
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title || 'R4i3a Auth'} />
                <meta name="twitter:description" content={description || 'Default description for SEO'} />
                <meta name="twitter:image" content={image || '/wallpaper.jpeg'} /> 
            </Helmet>

            <div className="flex justify-center items-center flex-col gap-2 h-screen bg-gray-950">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    {children}
                </div>
                {auth ? (
                    <Link
                        to="/"
                        className="mt-5 inline-flex gap-2 items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-black transition-colors duration-200 rounded-md bg-white"
                    >
                        <CircleChevronLeft className="w-5"/>
                        Go Back
                    </Link>
                ) : null}
            </div>
        </div>
    );
};

export default Master;
