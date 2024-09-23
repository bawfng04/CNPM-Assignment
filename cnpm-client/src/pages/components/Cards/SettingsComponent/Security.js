const Security = () => {
  return (
    <div className="securityDiv">
      <h3 className="title">Change password</h3>
      <div className="form-group">
        <label>Current password</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>New password</label>
        <input type="password" />
      </div>
      <div className="form-group">
        <label>Confirm password</label>
        <input type="password" />
      </div>
      <button className="save-button">Save</button>
    </div>
  );
};

export default Security;
