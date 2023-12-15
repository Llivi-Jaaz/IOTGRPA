import React from 'react';

const GoogleMap = () => {
  const place = 'NCR';

  const getCoordinates = (location) => {
    let coordinates = { latitude: 0, longitude: 0 };

    if (location === 'NCR') {
      coordinates = { latitude: 14.6091, longitude: 121.0223 };
    }

    return coordinates;
  };

  const coordinates = getCoordinates(place);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="mapouter" style={{ marginBottom: '0px', width: '100%', }}>
        <div className="gmap_canvas">
          <iframe
            src="https://maps.google.com/maps?q=ncr&amp;t=&amp;z=10&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            frameBorder="0"
            allowFullScreen
            title="Google Map"
            style={{ width: '100%', height: '460px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px'}}>
        {/* <div style={{ padding: '10px', borderRadius: '20px', width: '60%', textAlign: 'left', backgroundColor: 'white', margin: '0', paddingLeft: '20px', marginRight: '20px', paddingTop: '10px', display: 'flex', alignItems: 'center' }}>
          <img src="/assets/icons/glass/loc.png" alt="Icon" style={{ marginRight: '20px', width: '90px', height: '100px' }} />
          <div>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>Location Details</h2>
            <p style={{marginBottom: '1px'}}>{place}</p>
          </div>
        </div> */}

        <div style={{ padding: '5px', borderRadius: '20px', width: '60%', textAlign: 'left', backgroundColor: 'white', margin: '0', paddingLeft: '20px', marginRight: '20px', paddingTop: '10px', display: 'flex', alignItems: 'center' }}>
          <img src="/assets/icons/glass/loc.png" alt="Icon" style={{ marginRight: '20px', width: '90px', height: '90px' }} />
          <div>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '5px' }}>Location Details</h2>
            <p style={{marginBottom: '1px'}}><strong>555 Brgy. 345 Imus</strong></p>
            <p style={{marginTop: '1px'}}><strong>Cavite, Philippines</strong></p>
          </div>
        </div>

        <div style={{ padding: '5px', borderRadius: '20px', width: '60%', textAlign: 'left', backgroundColor: 'white', margin: '0', paddingLeft: '20px', marginRight: '20px', paddingTop: '10px', display: 'flex', alignItems: 'center' }}>
          <img src="/assets/icons/glass/gps.png" alt="Icon" style={{ marginRight: '20px', width: '90px', height: '90px' }} />
          <div>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '5px' }}>GPS Coordinates</h2>
            <p style={{marginBottom: '1px'}}><strong>Latitude:</strong> {coordinates.latitude}</p>
            <p style={{marginTop: '1px'}}><strong>Longitude:</strong> {coordinates.longitude}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export { GoogleMap };
