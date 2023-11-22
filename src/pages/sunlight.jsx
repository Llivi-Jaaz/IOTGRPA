import { Helmet } from 'react-helmet-async';

import { SunlightView } from 'src/sections/sunlight/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Sunlight </title>
      </Helmet>

      <SunlightView />
    </>
  );
}
