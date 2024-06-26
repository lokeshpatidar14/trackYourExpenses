import React, { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import "./ProfileForm.css";

const ProfileForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const authCtx = useContext(AuthContext);

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
      // Update successful
      authCtx.updateProfile(data.displayName, data.photoUrl);
      alert("Profile updated successfully");
    } else {
      // Handle error
      alert(data.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="input-group">
        <input
          type="text"
          id="displayName"
          value={displayName}
          placeholder="Full Name"
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          id="photoUrl"
          value={photoUrl}
          placeholder="Photo URL"
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
      </div>
      <button className="btn-btn" type="submit">Update</button>
    </form>
  );
};

export default ProfileForm;
