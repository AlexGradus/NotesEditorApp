import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { INote } from '../../interface/interface';
import { Button } from '@mui/material';



const Filter = (props: { notes: INote[]; getNotes: (tag?: null | string) => Promise<void> }) => {
    const involvedTags = new Set();
    props.notes.forEach((item: INote) => {
        item.noteTags.forEach(tag => involvedTags.add(tag))
    })
    const [personName, setPersonName] = useState<string[]>([]);
    const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options } = event.target;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPersonName(value);
        props.getNotes(String(value));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 400 }}>
                <InputLabel shrink htmlFor="select-multiple-native">
                    Tag
                </InputLabel>
                <Select
                    multiple
                    native
                    value={personName}
                    // @ts-ignore Typings are not considering `native`
                    onChange={handleChangeMultiple}
                    label="Native"
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                >
                    {(Array.from(involvedTags) as string[]).map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </Select>
                <Button onClick={() => {
                    setPersonName([]);
                    props.getNotes();
                }} color="inherit" variant="text">All Tags</Button>
            </FormControl>
        </div>
    );
}


export default Filter;

