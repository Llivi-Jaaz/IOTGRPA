import React from 'react';

const GoogleMap = () => {
  const place = 'NCR'; // Replace this with the desired place

  const getCoordinates = (location) => {
    let coordinates = { latitude: 0, longitude: 0 }; // Default coordinates

    if (location === 'NCR') {
      coordinates = { latitude: 28.7041, longitude: 77.1025 }; // Example coordinates for NCR (Delhi)
    } // You can handle other locations similarly

    return coordinates;
  };

  const coordinates = getCoordinates(place);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="mapouter" style={{ marginBottom: '10px', width: '100%' }}>
        <div className="gmap_canvas">
          <iframe
            src="https://maps.google.com/maps?q=ncr&amp;t=&amp;z=10&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            frameBorder="0"
            allowFullScreen
            title="Google Map"
            style={{ width: '100%', height: '450px' }}
          />
          <style>
            {`.mapouter{position:relative;height:520px;width:100%;background:#fff;}
            .maprouter a{color:#fff !important;position:absolute !important;top:0 !important;z-index:0 !important;}
            .gmap_canvas{overflow:hidden;height:520px;width:100%}.gmap_canvas iframe{position:relative;z-index:2}`}
          </style>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '47%' }}>
          <h2>Place</h2>
          <p>{place}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '47%' }}>
          <h2>Coordinates</h2>
          <div>
            <p><strong>Latitude:</strong> {coordinates.latitude}</p>
            <p><strong>Longitude:</strong> {coordinates.longitude}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GoogleMap };
