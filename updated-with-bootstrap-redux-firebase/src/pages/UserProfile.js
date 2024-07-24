import React, { useEffect, useState } from "react";
import { Button, Container, Alert } from "react-bootstrap";
import ProfileForm from "../components/profileForm/ProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
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
          setError(data.error.message);
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, [token]);

  const handleCompleteProfileClick = () => {
    setShowProfileForm(true);
  };

  return (
    <Container className="text-center">
      <h1 className="text-center mb-4">Your User Profile</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {showProfileForm ? (
        <ProfileForm profileData={profileData} />
      ) : (
        <Button variant="primary" onClick={handleCompleteProfileClick}>
          Complete Your Profile
        </Button>
      )}
    </Container>
  );
};

export default UserProfile;
