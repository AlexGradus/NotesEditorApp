import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addTag } from '../../api/api';



const NewTag = (props: { noteName: string; getNotes: (tag?: null | string) => Promise<void> }) => {
    const [open, setOpen] = useState(false);
    const [tag, setTag] = useState('#');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Add Tag">
                <IconButton onClick={handleClickOpen}  >
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Tag</DialogTitle>

                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Add Tag"
                        type="text"
                        value={tag}
                        fullWidth
                        variant="standard"
                        onChange={e => setTag(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={async () => {
                        await addTag(props.noteName, tag);
                        props.getNotes();
                        handleClose();
                    }} >Add Tag</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default NewTag;