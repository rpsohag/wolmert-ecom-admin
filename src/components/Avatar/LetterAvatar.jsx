import React from "react";

const LetterAvatar = ({ name, size, className }) => {
  const avatarSize = size || 45; // Default size is 50px
  const initials = name
    ? name
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
    : "?"; // If no name is provided, use a question mark as the initial

  // Generate a random color based on the name
  const colorCode = Math.floor(
    Math.abs(hashCode(name || "")) % 16777215
  ).toString(16);

  const avatarStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: avatarSize,
    height: avatarSize,
    borderRadius: "50%",
    backgroundColor: "#" + colorCode,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: avatarSize / 2,
  };

  return (
    <div style={avatarStyle} className={className}>
      {initials}
    </div>
  );
};

// Helper function to generate a hash code from a string
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export default LetterAvatar;
