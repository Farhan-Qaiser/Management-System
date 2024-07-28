import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function UpdateStudent({currentStudent,editDialogOpen,handleClose,handleChange,handleSaveStudent}) {

  return (
    <>
      <Dialog
        open={editDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Update Student</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField margin='dense' name='name' label='Student Name' type='text' fullWidth value={currentStudent?.name || ''} onChange={handleChange}/>
            <TextField margin='dense' name='age' label='Student Age' type='number' fullWidth value={currentStudent?.age || ''} onChange={handleChange}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveStudent}>Save</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}
