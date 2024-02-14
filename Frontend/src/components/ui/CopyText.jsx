// Material UI
import { Stack, Typography, IconButton } from "@mui/material";

const CopyText = ({ Token, color, BGcolor, icon, handleCopyText }) => {

    if (Token === '') return (<></>);

    return (
        <Stack
            border={`2px solid ${color}`}
            bgcolor={BGcolor}
            color={color}
            borderRadius='5px'
            padding='8px 10px 0px 10px'
            position='relative'
        >
            <Typography
                variant="h6"
                color={color}
                fontSize={{ xs: '12px', md: '14px' }}
                paragraph
                textOverflow='ellipsis'
                sx={{
                    wordWrap: 'break-word',
                }}
            >
                {Token}
            </Typography>
            <IconButton
                onClick={() => handleCopyText(Token)}
                sx={{
                    bgcolor: color,
                    color: BGcolor,
                    position: 'absolute',
                    top: '10px', 
                    right: '10px',
                    '&:hover': {
                        bgcolor: color,
                        color: BGcolor,
                    }
                }}
            >
                {icon}
            </IconButton>
        </Stack>
    );
}

export default CopyText;
