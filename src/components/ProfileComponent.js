import React from 'react'
// import '../Assest/css/ProfiliComponent.css';
import UserProfileHeader from '../components/UserProfileHeader';

export default function ProfileComponent() {
  return (
    
    <div className="profile-sectioin">
      <UserProfileHeader/>
        <h1>User Profile</h1>
        <div className="profile-header">
          <img
            src="https://via.placeholder.com/100" // Replace with actual image URL
            alt="User Avatar"
            className="profile-avatar"
          />
          <h3>Alfredo Torres</h3>
        </div>
        <div className="profile-details">
          <div>
            <span>NAME</span>
            <input type="text" value="Alfredo Torres" readOnly />
          </div>
          <div>
            <span>EMAIL</span>
            <input type="email" value="alfredotorres@gmail.com" readOnly />
          </div>
          <div>
            <span>ADDRESS</span>
            <input type="text" value="12/A Flower Rd, Colombo 00100" readOnly />
          </div>
          <div>
            <span>CONTACT NO</span>
            <input type="text" value="+94 775 486 624" readOnly />
          </div>
          <div>
            <span>FARM SIZE</span>
            <input type="text" value="0.12 acres" readOnly />
          </div>
          <div>
            <span>FARM TYPE</span>
            <input type="text" value="Rooftop" readOnly />
          </div>
          <div>
            <span>EXPERIENCE LEVEL</span>
            <input type="text" value="Intermediate" readOnly />
          </div>
        </div>
    </div>
  )
}
