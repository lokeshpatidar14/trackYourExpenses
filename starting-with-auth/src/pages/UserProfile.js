import React, { useState } from "react";
import ProfileForm from "../components/profileForm/ProfileForm";
import "./pages.css";

const UserProfile = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div className="user-profile">
      <h1>Your User Profile</h1>
      <button onClick={handleButtonClick}>Complete your profile</button>
      {showForm && <ProfileForm />}
    </div>
  );
};

export default UserProfile;
