import moment from 'moment';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { posts } from 'src/_mock/blog';

import PostCard from '../post-card';

// ----------------------------------------------------------------------

export default function LocInfoView() {
  const currentDate = moment().format('dddd, MMMM DD, YYYY');

  return (
    <Container>
      <Typography variant="h3"  sx={{ mb: 0 }}>
        Location Information
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Today is {currentDate}
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}



