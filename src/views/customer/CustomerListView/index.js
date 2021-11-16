import React, { useState,useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import UserService from 'src/service/UserService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    UserService.getUsers().then((res) => {
      setData(res.data.data.list);
    }).catch((ex) => {
        console.log('get sample data requset fail : ' + ex);
    }).finally(() => { 
        console.log('get sample data request end'); 
    });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={data} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
