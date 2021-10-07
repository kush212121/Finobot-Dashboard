import React from "react";
import InfoStrip from "./InfoStrip/InfoStrip";

// Styles
import "./UserDetails.css";

const UserDetails = () => {
  return (
    <div className="userDetails">
      <div className="userDetails__strip">
        <div className="userDetails__strip__dp">U</div>
        <div className="userDetails__strip__info">
          <div className="userDetails__strip__uname">User #10</div>
          <div className="userDetails__strip__uname__regStatus">
            Unregistered User
          </div>
        </div>
      </div>
      <div className="userDetails__labels">
        <span className="badge badge-success">Resolved</span>
        <span className="badge badge-danger">Unresolved</span>
      </div>
      <div className="userDetails__immutable">
        <div className="userDetails__immutable__heading">Immutable Data</div>
        <InfoStrip
          iconClass="lnr lnr-calendar-full"
          heading="Date & Time of joining"
          value={new Date().toUTCString()}
        />
        <InfoStrip iconClass="lnr lnr-user" heading="Name" value="Jane Doe" />
        <InfoStrip
          iconClass="lnr lnr-envelope"
          heading="Email"
          value="jane.doe@gmail.com"
        />
      </div>
    </div>
  );
};

export default UserDetails;
