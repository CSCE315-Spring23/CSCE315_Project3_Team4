import React from 'react'
import "./server.css"


function serverEmployee() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="Employee-box">
      <p>{user.user_metadata.employeeID} - {user.name}</p>
    </div>
  )
}

export default serverEmployee