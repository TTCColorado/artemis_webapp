import React, { useState } from 'react'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { Grid, Paper, TextField, Stack, Button } from '@mui/material'
import { authService } from '@trc/web-common2'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import Cookies from 'universal-cookie'

interface IProps {
    checkUser(): void
}

const SignIn: React.FC<IProps> = ({ checkUser }) => {
    const auth = new CognitoIdentityServiceProvider({ region: 'us-east-2'})
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            handleSignIn()
        }
    }

    const handleSignIn = () => {
        const clientId = '4d7r3uujv6p510stcvq2n2u13s'
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: clientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        }

        auth.initiateAuth(params, (err, data) => {
            if(err){

            } else {
                if(data.AuthenticationResult && data.AuthenticationResult.IdToken) {
                    const jwt = data.AuthenticationResult.IdToken
                    platformAuth(jwt)
                }
            }
        })
    }

    const platformAuth = (jwt: string) => {
        authService('http://authentication:8081')
            .getPlatformToken(jwt)
            .then((token) => {
                const decoded: JwtPayload = jwtDecode(token)
                const user_sub = decoded.sub
                token = user_sub + ':' + token
                const c = new Cookies()
                c.set('auth-service-platform-token', token)
                checkUser()
            })
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
                        onKeyDown={handleKeyDown}
                        value={email}
                    />
                    <TextField
                        label='Password'
                        fullWidth
                        required
                        onChange={passwordChange}
                        onKeyDown={handleKeyDown}
                        value={password}
                    />
                    <Stack direction='row' justifyContent='space-between' sx={{ m:2 }}>
                        <Button variant='text' color='primary' >
                            Forgot Password
                        </Button>
                        <Button variant='contained' color='primary' onClick={handleSignIn}>
                            Sign In
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default SignIn