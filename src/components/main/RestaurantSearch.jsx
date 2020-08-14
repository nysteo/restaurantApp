import React, {useState} from 'react';
import {makeStyles, Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '50px',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
      cursor: 'pointer',
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));




  const RestaurantSearch = (props) => {
      const classes = useStyles();
      const [inputValue, setInputValue] = useState('');

    const onSubmit = () => {
        console.log(inputValue);
        props.incrstate(inputValue);
        setInputValue('');
    }
    
    const handleChange = (event) => {
        const txt = event.target.value;
        setInputValue(txt);


    }

      return (
        <Grid container direction = 'row'>
            <Paper component="form" className={classes.root}>
                <InputBase
                className={classes.input}
                placeholder="Search for a restaurant by Name"
                value = {inputValue}
                onChange = {handleChange}
                />
                <SearchIcon onClick = {onSubmit} className = {classes.iconButton} />
            </Paper>
        </Grid>

      )
  }

  export default RestaurantSearch;