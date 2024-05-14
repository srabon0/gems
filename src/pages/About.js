import React from "react";
const users = [
  {
    ID: 101,
    password: 1234,
    Name: "John Doe (Admin)",
    Designation: "Software Engineer",
    Role: "admin",
  },

  // Add more user objects as needed
];

const About = () => {
  return (
    <div className="container p-10 mockup-code mx-auto">
      <pre>
        <code>{JSON.stringify(users, null, 2)}</code>
      </pre>
    </div>
  );
};

export default About;
