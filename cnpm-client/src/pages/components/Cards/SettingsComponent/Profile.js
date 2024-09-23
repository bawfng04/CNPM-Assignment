import ProfileLogo from "../../../images/HCMUT_official_logo.png";

const Profile = () => {
  return (
    <div>
      <div className="profileAndInfo">
        <div className="profileImage">
          <img
            src={ProfileLogo}
            alt="profileLogo"
            className="profileLogo"
          ></img>
        </div>
        <div className="settings-container">
          <div className="form">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" defaultValue={"toi la Dang Bao"} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" defaultValue={"toi bi ngu"} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" />
            </div>
            <div className="form-group">
              <label>Student ID</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Present Address</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Faculty</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Class</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input type="text" />
            </div>
          </div>
          <button className="save-button align-right">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
