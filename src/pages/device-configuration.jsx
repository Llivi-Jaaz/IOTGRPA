import { Helmet } from 'react-helmet-async';

import { DeviceConfigView } from 'src/sections/device-configuration/view';

// ----------------------------------------------------------------------

export default function DeviceConfigPage() {
  return (
    <>
      <Helmet>
        <title> Device Configuration | AWS </title>
      </Helmet>

      <DeviceConfigView />
    </>
  );
}
