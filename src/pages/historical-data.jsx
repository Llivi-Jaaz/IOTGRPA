import { Helmet } from 'react-helmet-async';

import { HistDataView } from 'src/sections/historical-data/view';

// ----------------------------------------------------------------------

export default function HistoricalDataPage() {
  return (
    <>
      <Helmet>
        <title> Historical Data | AWS </title>
      </Helmet>

      <HistDataView />
    </>
  );
}
