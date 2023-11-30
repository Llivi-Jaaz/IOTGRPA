import { Helmet } from 'react-helmet-async';

import { RainfallView } from 'src/sections/rainfall/view';

// ----------------------------------------------------------------------

export default function RainfallPage() {
  return (
    <>
      <Helmet>
        <title> Rainfall </title>
      </Helmet>

      <RainfallView />
    </>
  );
}
