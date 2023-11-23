import { Helmet } from 'react-helmet-async';

import { ForecastView } from 'src/sections/forecast/view';

// ----------------------------------------------------------------------

export default function ForecastPage() {
  return (
    <>
      <Helmet>
        <title> Forecast </title>
      </Helmet>

      <ForecastView />
    </>
  );
}