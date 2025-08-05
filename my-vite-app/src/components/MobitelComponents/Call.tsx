import './Call.css';

const Call = () => {
  const currentDate = "29/04/2025 11.32 AM";

  const bundles = [
    {
      name: "Loyalty Voice",
      used: 1,
      total: 4,
      expiryDate: "2025-05-01 21:22:34"
    },
    {
      name: "Call Center Voice",
      used: 2,
      total: 4,
      expiryDate: "2025-05-01 21:22:34"
    },
    {
      name: "Extra Voice",
      used: 3,
      total: 5,
      expiryDate: "2025-05-05 18:00:00"
    },
    {
      name: "Weekend Voice",
      used: 0,
      total: 2,
      expiryDate: "2025-05-10 23:59:59"
    }
  ];

  const calculateProgress = (used: number, total: number) => {
    return (used / total) * 100;
  };

  return (
    <div className="call-content">
      {/* Fixed top info */}
      <p className="call-timestamp">Updated as at {currentDate}</p>

      {/* Scrollable bundle list */}
      <div className="call-scroll-area">
        {bundles.map((bundle, index) => (
          <div key={index} className="call-bundle-container">
            <h2 className="call-bundle-title">{bundle.name}</h2>

            <p className="call-bundle-label">Bundle :</p>

            <div className="call-progress-container">
              <div
                className="call-progress-bar"
                style={{ width: `${calculateProgress(bundle.used, bundle.total)}%` }}
              />
            </div>

            <div className="call-details">
              <span className="call-used">
                {bundle.used} used of {bundle.total}
              </span>
              <div className="call-remaining-container">
                <p className="call-remaining-value">{bundle.total - bundle.used}</p>
                <p className="call-remaining-label">Remaining</p>
              </div>
            </div>

            <p className="call-expiry">Expires on : {bundle.expiryDate}</p>
          </div>
        ))}
      </div>

      {/* Button stays below scroll */}
      <div className="call-button-container">
        <button className="call-button">SEE ALL</button>
      </div>
    </div>
  );
};

export default Call;
