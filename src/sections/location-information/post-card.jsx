import React from 'react';

// ----------------------------------------------------------------------

const GoogleMap = () => (
  <div className="mapouter">
    <div className="gmap_canvas">
      <iframe
        src="https://maps.google.com/maps?q=ncr&amp;t=&amp;z=10&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
        frameBorder="0"
        allowFullScreen
        title="Google Map"
        style={{ width: '1080px', height: '520px' }}
      />
      <style>
        {`.mapouter{position:relative;height:520px;width:1080px;background:#fff;}
        .maprouter a{color:#fff !important;position:absolute !important;top:0 !important;z-index:0 !important;}
        .gmap_canvas{overflow:hidden;height:520px;width:1080px}.gmap_canvas iframe{position:relative;z-index:2}`}
      </style>
      <a href="https://blooketjoin.org/">blooket</a>
    </div>
  </div>
);

export { GoogleMap };
