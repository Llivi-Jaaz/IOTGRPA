import { Helmet } from 'react-helmet-async';

import { HumidityView } from 'src/sections/humidity/view';

// ----------------------------------------------------------------------

export default function HumidityPage() {
  return (
    <>
      <Helmet>
        <title> Humidity | AWS </title>
      </Helmet>

      <HumidityView />
    </>
  );
}