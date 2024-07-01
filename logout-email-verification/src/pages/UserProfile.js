import React, { useEffect, useState, useContext } from "react";
import ProfileForm from "../components/profileForm/ProfileForm";
import AuthContext from "../store/auth-context";
import "./pages.css";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchProfileData = async () => {
      const idToken = authCtx.token;

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setProfileData(data.users[0]);
      } else {
        alert(data.error.message);
      }
    };

    fetchProfileData();
  }, [authCtx.token]);

  const handleCompleteProfileClick = () => {
    setShowProfileForm(true);
  };

  return (
    <div className="user-profile">
      <h1>Your User Profile</h1>
      {showProfileForm ? (
        <ProfileForm profileData={profileData} />
      ) : (
        <button onClick={handleCompleteProfileClick}>Complete your profile</button>
      )}
    </div>
  );
};

export default UserProfile;
