import { AppBar, Toolbar, Typography } from "@mui/material";

function BasicHeader() {
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Typography variant="h6">SimpleDL</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default BasicHeader;
