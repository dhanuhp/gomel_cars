import "./AppDownload.css";

function AppDownload() {
  return (
    <div className="app-wrapper">

      <div className="app-card">

        {/* LEFT */}
        <div className="app-left">

          <h2>
            Get the <span>Gomel Cars</span> App
          </h2>

          <p>
            Book cars instantly, manage trips and unlock vehicles — all from your phone.
          </p>

          <div className="qr-section">

            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=gomelcars.com"
              alt="QR"
              className="qr"
            />

            <div className="store-buttons">

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Play Store"
              />

              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
              />

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="app-right">
          <img
            src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"
            alt="App Preview"
          />
        </div>

      </div>

    </div>
  );
}

export default AppDownload;