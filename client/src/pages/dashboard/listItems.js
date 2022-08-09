import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BalanceIcon from '@mui/icons-material/Balance';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from '@mui/material';

export const mainListItems = (
  <React.Fragment>
    <Link href="/Withdraw">
    <ListItemButton>
      <ListItemIcon>
        <BalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Withdraw" />
    </ListItemButton>
    </Link>
    <Link href="/Deposit">
    <ListItemButton>
      <ListItemIcon>
        <FileUploadIcon />
      </ListItemIcon>
      <ListItemText primary="Deposit" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItemButton>
  </React.Fragment>
);