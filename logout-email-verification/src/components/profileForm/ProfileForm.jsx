import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import "./ProfileForm.css";

const ProfileForm = ({ profileData }) => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (profileData) {
      setDisplayName(profileData.displayName || "");
      setPhotoUrl(profileData.photoUrl || "");
    }
  }, [profileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idToken = authCtx.token;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: idToken,
          displayName: displayName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      authCtx.updateProfile(data.displayName, data.photoUrl);
      alert("Profile updated successfully");
    } else {
      alert(data.error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleVerifyEmail = async () => {
    try {
      await authCtx.sendEmailVerification();
      setVerificationMessage("Verification email sent! Please check your inbox.");
    } catch (error) {
      alert(`Error: ${error.message}`);
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
      {!authCtx.emailVerified && (
        <button className="btn-btn" type="button" onClick={handleVerifyEmail}>
          Verify Email
        </button>
      )}
      {verificationMessage && <p>{verificationMessage}</p>}
      {authCtx.emailVerified && <p>Your email is verified.</p>}
    </form>
  );
};

export default ProfileForm;
