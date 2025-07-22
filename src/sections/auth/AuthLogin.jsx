import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

export default function AuthLogin({ isDemo = false }) {
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate(); // ✅ For navigation

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string()
          .required('Password is required')
          .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
          .max(10, 'Password must be less than 10 characters')
      })}
      onSubmit={(values) => {
        console.log('✅ Login data:', values);
        navigate('/dashboard'); // 🔀 Redirect to dashboard after successful login
      }}
    >
      {({ errors, handleBlur, handleChange, touched, values, handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="shayan.ozi-techcnology.com"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
              </Stack>
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
              </Stack>
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Keep me signed in</Typography>}
                />
                <Link variant="h6" component={RouterLink} to="#" color="text.primary">
                  Forgot Password?
                </Link>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  type="submit" // ✅ Makes the button trigger Formik submission
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

AuthLogin.propTypes = {
  isDemo: PropTypes.bool
};
