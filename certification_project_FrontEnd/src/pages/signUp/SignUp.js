import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import useSignUp from "./service";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

export default function SignUpForm(props) {
  const {
    userNature,
    handleUserNatureChange,
    onSignUp,
    onChange,
    formData,
    showPassword,
    togglePasswordVisibility,
    errors
  } = useSignUp(props.handleClose);
  return (
    <Box
      sx={{
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="username"
          name="username"
          autoFocus
          onChange={onChange}
          helperText={errors.username} 
          value={formData.username} 
          error={!!errors.username} 
         
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="email"
          name="email"
          onChange={onChange}
          helperText={errors.email} 
          value={formData.email} 
          error={!!errors.email} 
        />
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleUserNatureChange}
          >
            <FormControlLabel
              value="admin"
              control={<Radio />}
              label="admin"
            />
            <FormControlLabel
              value="employer"
              control={<Radio />}
              label="employer"
            />
            <FormControlLabel
              value="user"
              control={<Radio />}
              label="user"
            />
          </RadioGroup>
        </FormControl>
        {userNature == "admin" ? (
          <TextField
            margin="normal"
            required
            fullWidth
            name="identifierNumber"
            label="Licence Number"
            id="identifierNumber"
            onChange={onChange}
          />
        ) : userNature == "employer" ? (
          <TextField
            margin="normal"
            required
            fullWidth
            name="identifierNumber"
            label="Id employer"
            id="identifierNumber"
            onChange={onChange}
          />
        ) : userNature == "user" ? (
          <TextField
            margin="normal"
            required
            fullWidth
            name="identifierNumber"
            label="id user"
            id="identifierNumber"
            onChange={onChange}
          />
        ) : null}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          id="password"
          value={formData.password} 
          error={!!errors.password} 
          helperText={errors.password} 
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            ),
        }}
        />
         <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="confirmPassword"
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword} 
          error={!!errors.confirmPassword} 
          helperText={errors.confirmPassword} 
          onChange={onChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
          onClick={onSignUp}
        
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
} 