import React, { useState } from 'react'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { Grid, Paper, TextField, Stack, Button } from '@mui/material'


const SignIn: React.FC = () => {
    const auth = new CognitoIdentityServiceProvider({ region: 'us-east-2'})
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const passwordChagne = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <Grid
            container
            alignItems='center'
            justifyContent='center'
            sx={{
                height: '100vh'
            }}
        >
            <Paper sx={{ minWidth: '30vw'}}>
                <Stack direction='column' sx={{ m: 3 }}>
                    <TextField
                        sx={{ mb: 1 }}
                        label='Email or Username'
                        fullWidth
                        required
                        onChange={emailChange}
                        value={email}
                    />
                    <TextField
                        label='Password'
                        fullWidth
                        required
                        onChange={emailChange}
                        value={email}
                    />
                    <Stack direction='row' justifyContent='space-between' sx={{ m:2 }}>
                        <Button variant='text' color='primary' >
                            Forgot Password
                        </Button>
                        <Button variant='contained' color='primary' >
                            Sign In
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default SignIn