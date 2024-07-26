import React, { useState, useEffect } from "react";
import { Button, Form, Alert, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

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

    try {
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
        dispatch(
          authActions.updateProfile({ emailVerified: data.emailVerified })
        );
        alert("Profile updated successfully");
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleVerifyEmail = async () => {
    try {
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
        setVerificationMessage(
          "Verification email sent! Please check your inbox."
        );
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Container>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100%" }}>
        <Form
          onSubmit={handleSubmit}
          className="p-4"
          style={{
            width: "300px",
            maxWidth: "90%",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #dee2e6",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}>
          <Form.Group className="mb-3">
            {isEditing ? (
              <Form.Control
                type="text"
                id="displayName"
                value={displayName}
                placeholder="Full Name"
                onChange={(e) => setDisplayName(e.target.value)}
              />
            ) : (
              <Form.Control
                type="text"
                readOnly
                value={displayName || "No Display Name"}
                plaintext
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            {isEditing ? (
              <Form.Control
                type="text"
                id="photoUrl"
                value={photoUrl}
                placeholder="Photo URL"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            ) : (
              <Form.Control
                type="text"
                readOnly
                value={photoUrl || "No Photo URL"}
                plaintext
              />
            )}
          </Form.Group>
          <div className="d-grid gap-2">
            {isEditing ? (
              <Button variant="primary" type="submit">
                Update
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleEdit}>
                Edit
              </Button>
            )}
            {!emailVerified && (
              <Button variant="warning" onClick={handleVerifyEmail}>
                Verify Email
              </Button>
            )}
          </div>
          {verificationMessage && (
            <Alert variant="info" className="mt-3">
              {verificationMessage}
            </Alert>
          )}
          {emailVerified && (
            <Alert variant="success" className="mt-3">
              Your email is verified.
            </Alert>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default ProfileForm;
