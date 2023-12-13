import { Helmet } from 'react-helmet-async';

import { SignUpView } from 'src/sections/signup';

// ----------------------------------------------------------------------

export default function SignUpPage() {
  return (
    <>
      <Helmet>
        <title> Sign Up | AWS </title>
      </Helmet>

      <SignUpView />
    </>
  );
}
