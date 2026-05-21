import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/user/profile`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Profile error:', err);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    if (token) loadProfile();
  }, [backendUrl, token]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!profile) return <div className="p-4 text-red-500">Not authenticated</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;