import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import "./ProfileForm.css";

const ProfileForm = ({ profileData }) => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const emailVerified = useSelector((state) => state.auth.emailVerified);

  useEffect(() => {
    if (profileData) {
      setDisplayName(profileData.displayName || "");
      setPhotoUrl(profileData.photoUrl || "");
    }
  }, [profileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
          displayName,
          photoUrl,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      dispatch(authActions.updateProfile({ emailVerified: data.emailVerified }));
      alert("Profile updated successfully");
    } else {
      alert(data.error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleVerifyEmail = async () => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setVerificationMessage("Verification email sent! Please check your inbox.");
    } else {
      alert(data.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="input-group">
        {isEditing ? (
          <input
            type="text"
            id="displayName"
            value={displayName}
            placeholder="Full Name"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        ) : (
          <p>{displayName}</p>
        )}
      </div>
      <div className="input-group">
        {isEditing ? (
          <input
            type="text"
            id="photoUrl"
            value={photoUrl}
            placeholder="Photo URL"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        ) : (
          <p>{photoUrl}</p>
        )}
      </div>
      {isEditing ? (
        <button className="btn-btn" type="submit">
          Update
        </button>
      ) : (
        <button className="btn-btn" type="button" onClick={handleEdit}>
          Edit
        </button>
      )}
      {!emailVerified && (
        <button className="btn-btn" type="button" onClick={handleVerifyEmail}>
          Verify Email
        </button>
      )}
      {verificationMessage && <p>{verificationMessage}</p>}
      {emailVerified && <p>Your email is verified.</p>}
    </form>
  );
};

export default ProfileForm;
