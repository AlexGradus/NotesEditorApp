import './style.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { editNote } from '../../api/api';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';



const OpenedNote = (props: { noteText: string; noteName: string; getNotes: (tag?: null | string) => Promise<void> }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(props.noteText);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const edit = async () => {
        const involvedTags = text.split(/[\s.,%]/g).filter((item: string) => item[0] === '#')
        await editNote(props.noteName, text, involvedTags);
        setOpen(false);
        props.getNotes();
    }

    return (
        <div>
            <Tooltip title="Edit Note">
                <IconButton onClick={handleClickOpen}  >
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Text</DialogTitle>
                <DialogContent>
                    {text.split(' ').map((word, index) => {
                        return word.charAt(0) == '#' ? <span style={{ color: "red" }} key={index}>{` ${word}`}</span> : <span key={index}>{` ${word}`}</span>
                    })}
                </DialogContent>
                <DialogContent>
                    <TextField
                        onFocus={event => {
                            event.target.select();
                        }}
                        margin="dense"
                        label="Edit"
                        type="text"
                        value={text}
                        fullWidth
                        variant="standard"
                        onChange={e => setText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={edit}>Edit Note</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default OpenedNote;