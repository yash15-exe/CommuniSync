import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {user ? (
        <div>
          <div className="mb-4">
            <p className="text-lg">
              <strong>Name:</strong> {user.username}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            {/* Add more user details as needed */}
          </div>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
}

export default Profile;
