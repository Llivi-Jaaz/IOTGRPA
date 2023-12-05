import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function DevConfigTableRow({
  selected,
  name,
  symbolUrl,
  unit,
  status,
}) {

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell sx={{ paddingLeft: 4, width: '40%', textAlign: 'center' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={symbolUrl} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell sx={{ width: '30%', textAlign: 'center' }}>
        {unit}
      </TableCell>

      <TableCell sx={{ width: '30%', textAlign: 'center' }}>
        <Label color={(status === 'inactive' && 'error') || 'success'}>{status}</Label>
      </TableCell>
    </TableRow>
  );
}

DevConfigTableRow.propTypes = {
  symbolUrl: PropTypes.any,
  unit: PropTypes.any,
  name: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
