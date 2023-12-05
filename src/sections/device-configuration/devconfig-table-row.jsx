import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
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
  handleClick,
}) {

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={symbolUrl} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{unit}</TableCell>

      <TableCell align="right">
        <Label color={(status === 'inactive' && 'error') || 'success'}>{status}</Label>
      </TableCell>
    </TableRow>
  );
}

DevConfigTableRow.propTypes = {
  symbolUrl: PropTypes.any,
  unit: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
