import './style.scss';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import axios from "axios";
import { useEffect, useState } from "react";
import { INote } from "../../interface/interface";
import { Item } from "../../utils/styled";
import NewNote from "../NewNote/NewNote";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { deleteNote } from "../../api/api";
import Tags from "../Tags/Tags";
import OpenedNote from "../OpenedNote/OpenedNote";
import Filter from '../ Filter/Filter';
import NewTag from '../NewTag/NewTag';
import { REACT_APP_BASE_API_URL } from '../../data/data';


const MainPage = () => {
  const [notes, setNotes] = useState([]);
  const getNotes = async (tag = null as null | string) => {
    try {
      await axios.post(`${REACT_APP_BASE_API_URL}/api/auth/notes`, {
        tag
      }).then(res => {
        setNotes(res.data.notes)
      })

    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data.message);
      }
    }

  }
  useEffect(() => {
    getNotes()
  }, []);
  return (
    <>
      <Box className='nav_menu'>
        <NewNote getNotes={getNotes} />
        <Filter getNotes={getNotes} notes={notes} />
      </Box>

      <Typography mt={2} mb={5} align='center' component="h5" variant="h5">
        Notes
      </Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          notes.map((note: INote, index) => {

            return <Grid key={index} item xs={4}>
              <Item>
                <Box className='nav_buttons'>
                  <Tooltip title="Delete Note">
                    <IconButton onClick={async () => {
                      await deleteNote(note.noteName);
                      getNotes()
                    }}  >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <NewTag getNotes={getNotes} noteName={note.noteName} />
                  <OpenedNote getNotes={getNotes} noteName={note.noteName} noteText={note.noteText} />
                </Box>
                <div className='container'>
                  <p>Name:{note.noteName}</p>
                  <p>Text:{note.noteText}</p>
                </div>

                <Tags tags={note.noteTags} noteName={note.noteName} getNotes={getNotes} />
              </Item>
            </Grid>
          })
        }
      </Grid>
    </>
  );
}

export default MainPage;