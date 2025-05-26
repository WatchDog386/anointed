import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-6 px-6 text-center text-sm">
      <p>
        &copy; {new Date().getFullYear()} Knoxville Technologies. All rights
        reserved.
      </p>
    </footer>
  );
}
