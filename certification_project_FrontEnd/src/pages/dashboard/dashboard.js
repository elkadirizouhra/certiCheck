import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import useAxios from "../../hooks/axios";
export default function BasicButtons() {
    const { customAxios } = useAxios();
    const check = async () => {
        try {
            const result = await customAxios({
                method: "GET", 
                url: "http://localhost:8080/dashboard", 
            });
            console.log(result); 
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text" onClick={check}>Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}