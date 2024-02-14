// React
import { useState } from "react";

// Hooks, Clients, Global States, etc.
import useToast from "../components/ui/Toast";
import axios from "axios";

// Custom Components
import Layout from "../components/Layout";
import CopyText from "../components/ui/CopyText";

// Material UI
import {
    Button,
    Container,
    Stack,
    TextField,
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Colors, Imgs, Icons, etc.
import colors from "../utils/colors";

const initForm = {
    email: '',
    password: '',
};

const Encode = () => {
    const [form, setForm] = useState(initForm);
    const [token, setToken] = useState('');

    const cutText = (cadena, longitudMaxima) => {
        return cadena.length > longitudMaxima
            ? cadena.substring(0, longitudMaxima)
            : cadena;
    }

    const handleOnChange = ({ target }) => {
        const { value, name } = target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8463/encode', form);

            setToken(response.data.token);

            // Success Alert
            useToast({
                text: 'Credenciales correctas',
                icon: 'success',
            });
        } catch (err) {
            // Error Alert
            useToast({
                text: err.response.data.msg,
                icon: 'error',
            });
        }
    }

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);

            // Success Alert
            useToast({
                text: 'Copiado al Portapapeles',
                icon: 'success',
            });
        } catch (err) {
            // Error Alert
            useToast({
                text: 'Error al copiar al portapapeles',
                icon: 'error',
            });
        }
    };

    return (
        <Layout>
            <Container
                maxWidth="xs"
                sx={{
                    paddingTop: 6
                }}
            >
                <CopyText
                    Token={token}
                    BGcolor={colors.background}
                    color={colors.primary}
                    icon={
                        <ContentCopyIcon
                            sx={{ fontSize: '20px' }}
                        />
                    }
                    handleCopyText={copyToClipboard}
                />

                <Stack
                    marginTop={{ xs: '20px', md: '10px' }}
                    padding={{ xs: '30px 20px', md: '30px 40px' }}
                    width={{ xs: '100%', sm: 'auto' }}
                    alignItems='center'
                    sx={{
                        backgroundColor: colors.nav,
                        borderRadius: '20px',
                    }}
                >
                    {/* Form */}
                    <Stack
                        component='form'
                        role='form'
                        width={{ xs: '100%', sm: '395px' }}
                        spacing='28px'
                    >
                        <Stack spacing='18px'>
                            {/* Email input */}
                            <TextField
                                id="email"
                                label="Email"
                                name='email'
                                placeholder="catalinaforerosuarez@gmail.com"
                                value={form?.email}
                                onChange={handleOnChange}
                            />

                            {/* Password input */}
                            <TextField
                                id="password"
                                label="Password"
                                name='password'
                                placeholder="p4assw0rd"
                                value={form?.password}
                                onChange={handleOnChange}
                            />
                        </Stack>

                        {/* Encode Button */}
                        <Button variant='contained' type='submit' onClick={handleSubmit}>
                            Encode
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Layout>
    );
}

export default Encode;
