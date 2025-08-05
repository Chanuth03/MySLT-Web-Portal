import './Voice.css';

const Voice = () => {
  return (
    // <div className="voice-container">
      <div className="voice-content">
        {/* <div className="voice-header">
          <div className="voice-icon-container">
            <Phone className="voice-icon" />
          </div>
          <span className="voice-title">Voice</span>
        </div> */}
        
        <p className="voice-timestamp">Updated as at 29/04/2025 11.32 AM</p>
        
        <div className="voice-bundle-container">
          <h2 className="voice-bundle-title">ANYNET UNLIMITED</h2>
          
          <p className="voice-bundle-label">Bundle :</p>
          
          <div className="voice-progress-container">
            <div 
              className="voice-progress-bar" 
              style={{width: '95%'}}
            />
          </div>
          
          <div className="voice-details">
            <span className="voice-used">200 min used of 41760 min</span>
            <div className="voice-remaining-container">
              <p className="voice-remaining-value">41760 min</p>
              <p className="voice-remaining-label">Remaining</p>
            </div>
          </div>
          
          <p className="voice-expiry">
            Expires on : 2025-05-01 21:22:34
          </p>
        </div>
        
        <div className="voice-button-container">
          <button className="voice-button">
            SEE ALL
          </button>
        </div>
      </div>
    // </div>
  );
};

export default Voice;