import './Sms.css';

const Sms = () => {
  return (
    // <div className="sms-container">
      <div className="sms-content">
        {/* <div className="sms-header">
          <div className="sms-icon-container">
            <MessageSquare className="sms-icon" />
          </div>
          <span className="sms-title">SMS</span>
        </div> */}

        <p className="sms-timestamp">Updated as at 29/04/2025 11.32 AM</p>

        <div className="sms-bundle-container">
          <h2 className="sms-bundle-title">ANYNET UNLIMITED</h2>

          <p className="sms-bundle-label">Bundle :</p>

          <div className="sms-progress-container">
            <div 
              className="sms-progress-bar" 
              style={{ width: '95%' }}
            />
          </div>

          <div className="sms-details">
            <span className="sms-used">200 SMS used of 41760 SMS</span>
            <div className="sms-remaining-container">
              <p className="sms-remaining-value">41760 SMS</p>
              <p className="sms-remaining-label">Remaining</p>
            </div>
          </div>

          <p className="sms-expiry">
            Expires on : 2025-05-01 21:22:34
          </p>
        </div>

        <div className="sms-button-container">
          <button className="sms-button">
            SEE ALL
          </button>
        </div>
      </div>
    // </div>
  );
};

export default Sms;
