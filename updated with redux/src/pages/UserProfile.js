import React, { useEffect, useState, useContext } from "react";
import ProfileForm from "../components/profileForm/ProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import "./pages.css";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
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
  }, [token]);

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
