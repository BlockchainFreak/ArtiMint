import { Modal, Box, Button, Typography, useTheme } from '@mui/material'
import { confirmationState } from 'state'
import { useRecoilState } from 'recoil'

export default function Confirm() {

    const [modal, setModal] = useRecoilState(confirmationState)

    const { open, message, onConfirm } = modal

    const { palette } = useTheme()

    const confirmAndClose = () => {
        onConfirm()
        setModal({ open: false, message: '', onConfirm: () => { } })
    }

    return (
        <Modal
            open={open}
            onClose={() => setModal({ open: false, message: '', onConfirm: () => { } })}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: `1px solid ${palette.primary.main}`,
                boxShadow: 24,
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {message}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={() => setModal({ open: false, message: '', onConfirm: () => { } })}>Cancel</Button>
                    <Button sx={{ margin: '0 10px' }} variant='contained' onClick={confirmAndClose}>Confirm</Button>
                </Box>
            </Box>
        </Modal>
    )
}