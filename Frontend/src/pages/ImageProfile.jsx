// React
import { useState } from 'react';

// Hooks, Clients, Global States, etc.
import axios from 'axios';
import useBase64 from '../hooks/useBase64';

// Custom Components
import Layout from "../components/Layout";
import Toast from '../components/ui/Toast';
import { VisuallyHiddenInput } from '../utils/styled';

// Material UI
import {
    IconButton,
    Stack,
    Button,
    FormHelperText,
    Backdrop,
    CircularProgress, Container
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';

// Colors, Imgs, Icons, etc.
import colors from '../utils/colors';

const initForm = {
    image: '',
};

const fileMaxSize = 500 * 1024;

const Upload = () => {
    const [form, setForm] = useState(initForm);
    const [formError, setFormError] = useState(initForm);
    const [loading, setLoading] = useState(false);
    const [image, setImagen] = useState('');

    const handleSetImage = () => {
        setImagen('');
        setForm('');
    }

    const handleOnChangeImg = (event) => {
        const { files, name } = event.target;

        if (!files[0]?.type.startsWith('image/')) {
            setFormError((props) => ({
                ...props,
                image: 'El tipo de archivo no es permitido, solo se aceptan de tipo .png, .webp, .svg, .gif, .jifi',
            }));
            return;
        } else {
            setFormError((props) => ({
                ...props,
                image: ''
            }));
        }

        if (files[0]?.size > fileMaxSize) {
            setFormError((props) => ({
                ...props,
                image: 'El archivo se excede del limite. El tamaño del archivo debe ser menor a 500 KB',
            }));
            return true;
        } else {
            setFormError((props) => ({
                ...props,
                image: ''
            }));
        }

        setForm({
            ...form,
            [name]: files?.[0]
        });

        if (files[0]) {
            let imagenUrl = URL.createObjectURL(files[0]);
            setImagen(imagenUrl);
        } else {
            console.log('La imagen no existe');
        }
    }

    const handleClick = async (event) => {
        event.preventDefault();

        if (!form.image) {
            setFormError((props) => ({
                ...props,
                image: 'El campo es requerido',
            }));
            return;
        } else {
            setFormError((props) => ({
                ...props,
                image: ''
            }));
        }

        if (formError.image !== '') {
            return;
        }

        const blob = new Blob([form.image]);
        form['image'] = await useBase64(blob);

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8463/imageProfile', form);

            return Toast({
                text: response.data.msg,
                icon: 'success',
            });
        } catch (err) {
            return Toast({
                text: err.response.data.msg ?? err.message,
                icon: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Container maxWidth="sm">

                <Stack justifyContent='center' alignItems='center' paddingY={{ xs: 5, md: 9 }}>
                    <Stack
                        width='100%'
                        component='form'
                        role='form'
                        enctype="multipart/form-data"
                        action="http://localhost:7645/file"
                        method="post"
                    >
                        {
                            image ? (
                                <Stack
                                    display={image ? 'block' : 'none'}
                                    width='100%'
                                    height='350px'
                                    position='relative'
                                    sx={{
                                        bgcolor: colors.background,
                                        background: `center / contain no-repeat url(${image})`,
                                        border: `2.5px solid ${colors.primary}`,
                                        borderRadius: '5px',
                                    }}
                                >
                                    <IconButton
                                        aria-label="Restart"
                                        onClick={() => handleSetImage()}
                                        sx={{
                                            background: '#221427a2',
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                        }}
                                    >
                                        <RestartAltIcon sx={{ color: colors.text }} />
                                    </IconButton>
                                </Stack>
                            ) : (
                                <>
                                    <Stack
                                        border={`6px dashed ${colors.primary}`}
                                        width='100%'
                                        height='350px'
                                        borderRadius='10px'
                                        component='label'
                                        justifyContent='center'
                                        alignItems='center'
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <AddIcon
                                            sx={{
                                                color: colors.primary,
                                                fontSize: 35
                                            }}
                                        />

                                        <VisuallyHiddenInput
                                            type='file'
                                            id='image'
                                            name='image'
                                            accept='image/*'
                                            onChange={handleOnChangeImg}
                                            multiple={false}
                                        />
                                    </Stack>

                                    <FormHelperText
                                        sx={{
                                            color: colors.primary,
                                            fontSize: '16px',
                                            paddingTop: 1,
                                        }}
                                    >{formError.image}</FormHelperText>
                                </>
                            )
                        }

                        <Button
                            variant="contained"
                            onClick={handleClick}
                            sx={{ marginTop: 5 }}
                            type="submit"
                        >
                            Send
                        </Button>
                    </Stack>
                </Stack>
            </Container>

            {/* Backdrop for the loading */}
            <Backdrop
                sx={{ color: colors.text, zIndex: '100' }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Layout >
    );
}

export default Upload;
