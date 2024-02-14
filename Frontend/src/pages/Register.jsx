// React
import { useState } from "react";

// Hooks, Clients, Global States, etc.
import useToast from "../components/ui/Toast";
import axios from "axios";

// Custom Components
import Layout from "../components/Layout";

// Material UI
import { Button, Container, Stack, TextField } from "@mui/material";

// Colors, Imgs, Icons, etc.
import colors from "../utils/colors";

const initForm = {
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
};

const Register = () => {
    const [form, setForm] = useState(initForm);

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
            const response = await axios.post('http://localhost:8463/register', form);
            
            // Success Alert
            useToast({
                text: response.data.msg,
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

    return (
        <Layout>
            <Container maxWidth="xs">
                <Stack
                    marginTop={{ xs: '30px', md: '40px' }}
                    padding={{ xs: '30px 20px', md: '40px' }}
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
                        width={{ xs: '100%', sm: '325px' }}
                        spacing='28px'
                    >
                        <Stack spacing='18px'>
                            {/* Name input */}
                            <TextField
                                id="name"
                                label="Name"
                                name='name'
                                placeholder="Catalina"
                                value={form?.name}
                                onChange={handleOnChange}
                            />

                            {/* Lastname input */}
                            <TextField
                                id="lastname"
                                label="Lastname"
                                name='lastname'
                                placeholder="Forero"
                                value={form?.lastname}
                                onChange={handleOnChange}
                            />

                            {/* Phone input */}
                            <TextField
                                id="phone"
                                label="Phone"
                                name='phone'
                                placeholder="1234567890"
                                value={form?.phone}
                                onChange={handleOnChange}
                            />

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

                        {/* Regist Button */}
                        <Button
                            variant='contained'
                            type='submit'
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Layout>
    );
}

export default Register;
