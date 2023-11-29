import { Helmet } from 'react-helmet-async';

export { HistoricalDataView } from 'src/sections/historical-data/view';
// ----------------------------------------------------------------------

export default function HistoricalDataPage() {
  return (
    <>
      <Helmet>
        <title> Historical Data </title>
      </Helmet>

      <HistoricalDataView />
    </>
  );
}


