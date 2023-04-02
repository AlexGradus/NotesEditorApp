import './style.scss';
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { TagItem } from "../../utils/styled";
import { deleteTag } from '../../api/api';

const Tags = (props: { tags: string[]; noteName: string; getNotes: (tag?: null | string) => Promise<void> }) => {

    return (

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {
                props.tags.map((tag: string, index: number) => {

                    return <Grid key={index} item xs={6}>
                        <Box className="btn_close">
                            <Tooltip title="Delete">
                                <IconButton onClick={async () => {
                                    await deleteTag(props.noteName, tag);
                                    props.getNotes();
                                }}>
                                    <ClearIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <TagItem>
                            <p className='tag'>{tag}</p>
                        </TagItem>
                    </Grid>
                })
            }
        </Grid>
    );
}

export default Tags;