import { Helmet } from 'react-helmet-async';

import { TemperatureView } from 'src/sections/temperature/view';

// ----------------------------------------------------------------------

export default function TemperaturePage() {
  return (
    <>
      <Helmet>
        <title> Temperature | AWS </title>
      </Helmet>

      <TemperatureView />
    </>
  );
}
