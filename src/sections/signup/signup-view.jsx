import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { ref, set, getDatabase } from 'firebase/database';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SignUpView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyD6O0IWDRkEPngo6pfoakPRfaXUEuh8tcI',
      databaseURL: 'https://weathering-station-default-rtdb.asia-southeast1.firebasedatabase.app/',
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLoginClick = () => {
    router.push('/login');
    console.log('Button clicked!'); // Add this console log to check if the button is clicked
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!', { firstName, lastName, email, password }); // Add this console log to check if the form is submitted

    try {
      const firebaseConfig = {
        apiKey: 'AIzaSyD6O0IWDRkEPngo6pfoakPRfaXUEuh8tcI',
        databaseURL: 'https://weathering-station-default-rtdb.asia-southeast1.firebasedatabase.app/',
      };

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);

      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const userId = userCredential.user.uid;

      const db = getDatabase();
      const userRef = ref(db, `userAccounts/${userId}`);
      await set(userRef, {
        firstName,
        lastName,
        email: email.trim(),
        password,
      });

      router.push('/');
    } catch (error) {
      console.error('Error during signup:', error.code, error.message, error.email, error.credential);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="firstname"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          name="lastname"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={() => {
          console.log('Button clicked!'); // Add this console log to check if the button is clicked
        }}
      >
        Create Account
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign Up</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Create your account.
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={handleLoginClick}>
              Already have one?
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }} />

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
