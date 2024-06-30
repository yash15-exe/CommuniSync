import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div data-theme="synthwave" className="flex flex-col min-h-screen bg-base-100 text-base-content">
      {/* Navbar */}
      <nav className="shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white">
            CommuniSync
          </div>
          <div>
            <Link to="/login" className="ml-4 text-white">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-grow flex flex-col items-center justify-center py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h1 className="text-5xl font-bold text-center">Welcome to CommuniSync</h1>
        <p className="mt-4 text-xl text-center">Connect with people who share your interests.</p>
        <Link to="/login" className="btn btn-secondary  flex items-center align-middle mt-8 px-6  text-lg font-medium rounded-lg">
          Get Started
        </Link>
      </header>

      {/* Information Section */}
      <section className="py-20 bg-base-200 text-base-content">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">What is CommuniSync?</h2>
          <p className="mt-4 text-lg text-center">CommuniSync is a platform where you can create and join communities to discuss, meet, and chat with like-minded people. Whether you're into technology, sports, arts, or any other interest, there's a community for you.</p>
          
          <div className="mt-12 flex flex-wrap justify-around">
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="p-6 bg-base-100 shadow-md rounded-lg">
                <h3 className="text-2xl font-semibold text-center">Create Communities</h3>
                <p className="mt-4 text-center">Start your own community and invite others who share your passion. Customize your community space and manage members easily.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="p-6 bg-base-100 shadow-md rounded-lg">
                <h3 className="text-2xl font-semibold text-center">Join Communities</h3>
                <p className="mt-4 text-center">Find and join communities that match your interests. Engage in discussions, share content, and build connections with others.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="p-6 bg-base-100 shadow-md rounded-lg">
                <h3 className="text-2xl font-semibold text-center">Chat and Meet</h3>
                <p className="mt-4 text-center">Use our chat feature to communicate in real-time with community members. Arrange meetups and events to take your connections offline.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary shadow-md py-4">
        <div className="container mx-auto px-6 text-center text-white">
          &copy; 2024 CommuniSync. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
