import './server.css'

import React from 'react'


/**
 * @function serverEmployee
 * @description Renders an employee box with employee ID and name.
 * @returns {JSX.Element} A div with the 'Employee-box' className containing a
 *     paragraph with employee ID and name.
 */
function serverEmployee() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
      <div className = 'Employee-box'><p>{user.user_metadata.employeeID} -
      {user.name}</p>
    </div>)
}

export default serverEmployee