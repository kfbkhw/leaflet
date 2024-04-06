'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CopyrightShort } from '@/components/common/copyright';

export default function SignIn() {
    const { replace } = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <>
            <style>{'body {height: 100vh; overflow: hidden;}'}</style>
            <Box
                sx={{
                    marginTop: 8,
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h3" fontSize={'28px'} fontWeight={500}>
                    {'로그인'}
                </Typography>
                <Box
                    noValidate
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 4 }}
                >
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="email"
                        name="email"
                        label="이메일"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="password"
                        name="password"
                        label="비밀번호"
                        autoComplete="current-password"
                        type="password"
                    />
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="autoLogin"
                                    value="autoLogin"
                                    color="primary"
                                    size="small"
                                />
                            }
                            label="자동 로그인"
                            slotProps={{ typography: { fontSize: '14px' } }}
                        />
                        <Link href="#">
                            <Typography fontSize={'14px'}>
                                {'비밀번호 찾기'}
                            </Typography>
                        </Link>
                    </Box>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 5,
                            padding: '10px',
                            fontSize: '16px',
                            fontWeight: 500,
                        }}
                    >
                        {'로그인'}
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => replace('/auth/signup')}
                        variant="outlined"
                        sx={{
                            mt: 2,
                            padding: '10px',
                            fontSize: '16px',
                            fontWeight: 500,
                        }}
                    >
                        {'회원가입'}
                    </Button>
                </Box>
            </Box>
            <CopyrightShort sx={{ mt: 8, mb: 4 }} />
        </>
    );
}
