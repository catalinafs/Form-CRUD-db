// Material UI
import { Stack, Typography } from '@mui/material';

// Colors, Imgs, Icons, etc.
import colors from '../utils/colors';
import Layout from '../components/Layout';

const NotFound = () => {
    return (
        <Layout>
            <Stack alignItems='center' justifyContent='center' minHeight='85vh'>
                <Typography variant='h3' color={colors.text}>
                    404 | Page Not Found
                </Typography>
            </Stack>
        </Layout>
    );
}

export default NotFound;
