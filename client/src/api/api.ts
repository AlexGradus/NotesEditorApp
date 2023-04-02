import axios from "axios";
import { REACT_APP_BASE_API_URL } from "../data/data";

export const createNote = async (
  noteName: string,
  noteText: string,
  noteTags: string[]
) => {
  try {
    const response = await axios.post(
      `${REACT_APP_BASE_API_URL}/api/auth/createnote`,
      {
        noteName,
        noteText,
        noteTags,
      }
    );
    console.log(response.data.message);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      alert(e.response?.data.message);
    }
  }
};

export const editNote = async (
  noteName: string,
  noteText: string,
  noteTags: string[]
) => {
  try {
    await axios.post(`${REACT_APP_BASE_API_URL}/api/auth/editnote`, {
      noteName,
      noteText,
      noteTags,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      alert(e.response?.data.message);
    }
  }
};

export const deleteNote = async (noteName: string) => {
  try {
    await axios.post(`${REACT_APP_BASE_API_URL}/api/auth/deletenote`, {
      noteName,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data.message);
    }
  }
};

export const pushTags = async (name: string, tags: string[]) => {
  try {
    await axios.post(`${REACT_APP_BASE_API_URL}/api/auth/involvetags`, {
      name,
      tags,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data.message);
    }
  }
};

export const deleteTag = async (noteName: string, tag: string) => {
  try {
    await axios.post(`${REACT_APP_BASE_API_URL}/api/auth/deletetag`, {
      noteName,
      tag,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data.message);
    }
  }
};

export const addTag = async (noteName: string, tag: string) => {
  try {
    await axios.post(`${REACT_APP_BASE_API_URL}/api/auth/addtag`, {
      noteName,
      tag,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      alert(e.response?.data.message);
    }
  }
};
