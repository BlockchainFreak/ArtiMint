import { useRecoilState } from "recoil"
import { loadingState } from "state"
import { Modal, Box, ThemeProvider, createTheme, CircularProgress, Typography } from "@mui/material"

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function LoadingModal() {
    const [modal, setModal] = useRecoilState(loadingState)

    if (!modal.open) {
        return null
    }

    return (
        <Modal
            open={modal.open}
            aria-labelledby="loading-modal"
            aria-describedby="loading+details"
        >
            <Box sx={{
                bgcolor: "#efe", display: 'grid', placeItems: 'center',
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: 24, p: 4, borderRadius: 2,
                padding: '50px', overflow: 'auto',
            }}>
                <CircularProgress color="success" />
                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {modal.title}
                </Typography>
            </Box>
        </Modal>
    )
}

// <Box sx={{
//                 width: "70vw", height: "70vh", bgcolor: "#efe",
//                 position: 'absolute', top: '50%', left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 boxShadow: 24, p: 4, borderRadius: 2,
//                 padding: '50px', overflow: 'auto',
//             }}/>