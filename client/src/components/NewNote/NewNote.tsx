import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { createNote } from '../../api/api';


const NewNote = (props: { getNotes: (tag?: null | string) => Promise<void> }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addNote = async () => {
    const involvedTags = text.split(/[\s.,%]/g).filter(item => item[0] === '#')
    await createNote(name, text, involvedTags);
    setOpen(false);
    props.getNotes();
  }

  return (
    <div>
      <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
        New Note
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write your Note below,text at your discretion
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            variant="standard"
            onChange={e => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Text"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addNote}>Add Note</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default NewNote;