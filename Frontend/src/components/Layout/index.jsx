// Custom Components
import NavBar from '../ui/NavBar';

// Material UI
import { Stack } from '@mui/material';

// Colors, Imgs, Icons, etc.
import colors from '../../utils/colors';

const Layout = ({ children }) => {
    return (
        <Stack
            minHeight='100vh'
            width='100%'
            sx={{ bgcolor: colors.background }}
        >
            <NavBar />
            {children}
        </Stack>
    );
}

export default Layout;