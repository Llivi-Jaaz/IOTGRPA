import { Helmet } from 'react-helmet-async';

import { CarbonMonoView } from 'src/sections/carbonmonoxide/view';

// ----------------------------------------------------------------------

export default function CarbonMonoPage() {
  return (
    <>
      <Helmet>
        <title> Carbon Monoxide | AWS </title>
      </Helmet>

      <CarbonMonoView />
    </>
  );
}
