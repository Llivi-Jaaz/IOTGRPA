import { Helmet } from 'react-helmet-async';

import { WindSpeedView } from 'src/sections/wind-speed/view';

// ----------------------------------------------------------------------

export default function WindSpeedPage() {
  return (
    <>
      <Helmet>
        <title> Wind Speed | AWS </title>
      </Helmet>

      <WindSpeedView />
    </>
  );
}
