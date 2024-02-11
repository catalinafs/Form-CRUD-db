// React
import { useState } from 'react';
import { Link as LinkWithoutStyles } from 'react-router-dom';

// Material UI 
import {
    AppBar,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';

// Colors, Imgs, Icons, etc.
import colors from '../../utils/colors';

// Custom React Router Dom Link
const Link = styled(LinkWithoutStyles)({
    textDecoration: 'none',
});

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState();

    const links = [
        {
            id: 1,
            page: 'Register',
            path: '/register/',
        },
        {
            id: 2,
            page: 'Encode',
            path: '/encode/',
        },
        {
            id: 3,
            page: 'Decode',
            path: '/decode/',
        },
        {
            id: 4,
            page: 'Image Profile',
            path: '/imageProfile/',
        },
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            component='header'
            sx={{
                backgroundColor: colors.background,
                backdropFilter: 'blur(12px) saturate(180%)',
                borderBottom: `3px solid ${colors.primary}`,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    component='nav'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link to='/encode'>
                        <Typography
                            variant="h1"
                            fontSize={{ xs: '20px', sm: '25px', md: '30px' }}
                            fontWeight={700}
                            color={colors.text}
                        >
                            Form{' '}<span
                                style={{ color: colors.primary }}
                            >CRUD db</span>
                        </Typography>
                    </Link>


                    <Stack
                        display={{ xs: 'none', md: 'flex' }}
                        direction='row'
                        alignItems='center'
                        justifyContent='center'
                        spacing='40px'
                    >
                        {
                            links.map(({ id, page, path }) => {
                                let pathActive = window.location.pathname === path;
                                let stylesText = pathActive ? {
                                    textDecoration: 'underline',
                                    color: colors.primary,
                                } : {
                                    textDecoration: 'none',
                                    ':hover': {
                                        color: colors.secondary,
                                    },
                                    color: colors.text,
                                };

                                return (
                                    <Typography
                                        key={id}
                                        sx={{
                                            padding: '5px 12px',
                                            ...stylesText,
                                        }}
                                        component={LinkWithoutStyles}
                                        to={path}
                                    >{page}</Typography>
                                );
                            })
                        }
                    </Stack>

                    <Stack display={{ xs: 'flex', md: 'none' }}>
                        <Tooltip title="Menu">
                            <IconButton onClick={handleOpenNavMenu} sx={{ p: 0, color: colors.text }}>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '30px' }}
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {
                                links.map(({ id, page, path }) => {
                                    let pathActive = window.location.pathname === path;
                                    let stylesActive = pathActive ? {
                                        textDecoration: 'underline',
                                        fontWeight: 700,
                                        color: colors.nav,
                                    } : {
                                        textDecoration: 'none',
                                        color: colors.secondary,
                                    };

                                    return (
                                        <MenuItem key={id} onClick={handleCloseNavMenu}>
                                            <Link
                                                to={path}
                                            >
                                                <Typography
                                                    textAlign="center"
                                                    sx={stylesActive}
                                                >
                                                    {page}
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                    );
                                })
                            }
                        </Menu>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default NavBar;