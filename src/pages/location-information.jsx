import { Helmet } from 'react-helmet-async';

import { LocInfoView } from 'src/sections/location-information/view';

// ----------------------------------------------------------------------

export default function LocInfoPage() {
  return (
    <>
      <Helmet>
        <title> Location Information | AWS </title>
      </Helmet>

      <LocInfoView />
    </>
  );
}
