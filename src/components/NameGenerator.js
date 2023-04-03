import { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import fetchNames from '../utils/fetchNames';

const NameGenerator = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [startingLetter, setStartingLetter] = useState('Random');
  const [surnameLetter, setSurnameLetter] = useState('Random');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    generateName();
  }, []);

  const generateName = async () => {
    const firstNames = await fetchNames(startingLetter, '1JctJ7FGNsW8fhUY4UgaLilGDXguG1pEiLpl9AIew0RU');
    const surnames = await fetchNames(surnameLetter, '1LDODOER2Pox-GOprP9-auSI9B6ATJOUF1Et74eZNOGM');
    const randomName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    setName(randomName);
    setSurname(randomSurname);
  };

  const handleLetterChange = (event, type) => {
    if (type === 'name') {
      setStartingLetter(event.target.value);
    } else {
      setSurnameLetter(event.target.value);
    }
  };

  const renderMenuItems = () => (
    ['Random', ...Array(26).keys()].map((val) => (
      <MenuItem key={val} value={val === 'Random' ? val : String.fromCharCode(65 + val)}>
        {val === 'Random' ? val : String.fromCharCode(65 + val)}
      </MenuItem>
    ))
  );

  return (
    <div
      className={`name-generator ${theme}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: `linear-gradient(${
          theme === 'light' ? '0deg' : '180deg'
        }, ${
          theme === 'light'
            ? 'rgba(255, 193, 7, 1) 0%, rgba(255, 87, 34, 1) 100%'
            : 'rgba(63, 81, 181, 1) 0%, rgba(106, 27, 154, 1) 100%'
        })`,
      }}
    >
      <Typography variant="h2" gutterBottom>
        D&amp;D Name Generator
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Generate unique names for your Dungeons &amp; Dragons characters
      </Typography>
      <IconButton onClick={toggleTheme}>
        {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
      <Typography variant="h4" gutterBottom>
        {name} {surname}
      </Typography>
      <FormControl variant="outlined" margin="normal">
        <InputLabel htmlFor="starting-letter">Starting Letter</InputLabel>
        <Select
          value={startingLetter}
          onChange={(event) => handleLetterChange(event, 'name')}
          label="Starting Letter"
          id="starting-letter"
        >
          {renderMenuItems()}
        </Select>
      </FormControl>
      <FormControl variant="outlined" margin="normal">
        <InputLabel htmlFor="surname-letter">Surname Letter</InputLabel>
        <Select
          value={surnameLetter}
          onChange={(event) => handleLetterChange(event, 'surname')}
          label="Surname Letter"
          id="surname-letter"
        >
          {renderMenuItems()}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color={theme === 'light' ? 'primary' : 'secondary'}
        onClick={generateName}
      >
        Generate Name
      </Button>
      <div style={{ flexGrow: 1 }}></div>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        style={{ position: 'absolute', bottom: 0 }}
      >
        Made with ♡ by Zenith Stardragon
      </Typography>
    </div>
  );
};

export default NameGenerator;
