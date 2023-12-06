import { Helmet } from 'react-helmet-async';

import { SunlightView } from 'src/sections/sunlight/view';

// ----------------------------------------------------------------------

export default function SunlightPage() {
  return (
    <>
      <Helmet>
        <title> Sunlight | AWS </title>
      </Helmet>

      <SunlightView />
    </>
  );
}
