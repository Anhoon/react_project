import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles,
  Backdrop,
  CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <div className={classes.root}>
      <Formik
        initialValues={{ }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('작성자명 길이 체크'),
          title: Yup.string().max(255).required('제목 길이 체크')
        })}
        onSubmit={(e) => {
          setLoading(true);
          alert("Adsd");
          try {
            const data = { 
              name : e.name,
              title : e.title
            };
            axios.post('/api/login', JSON.stringify(data), {
                headers: {
                  'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                navigate('/view/home', { replace: true });
            })
            .catch((ex) => {
                setLoading(false);
            })
          } catch (e) {
              console.log(e);
          }
        }}
      >
        {({
          errors,handleBlur,handleChange,handleSubmit,isSubmitting,touched,values
        }) => (
          <form onSubmit={handleSubmit}>
            <Card>
            <CardContent>
                <Grid container spacing={5}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth label="제목" name="title" onChange={handleChange} onBlur={handleBlur} required
                      value={values.name} variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth label="작성자" name="name" onChange={handleChange} onBlur={handleBlur} required
                      value={values.name} variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button color="primary" disabled={isSubmitting} type="submit" variant="contained"> 등록 </Button>
              </Box>
            </Card>
          </form>
        )}
        </Formik>
    </div>
  );
};

export default Password;
