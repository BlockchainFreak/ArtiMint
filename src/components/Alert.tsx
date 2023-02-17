import { Snackbar, Alert } from '@mui/material'
import { useRecoilState } from 'recoil'
import { snackBarState } from 'state'

export default function AlertCustom() {

    const [snackBar, setSnackBar] = useRecoilState(snackBarState)

    const handleClose = () => {
        setSnackBar({
            open: false,
            message: '',
            severity: 'success',
        })
    }

    return (
        <Snackbar open={snackBar.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackBar.severity as any} sx={{ width: '100%' }}>
                {snackBar.message}
            </Alert>
        </Snackbar>
    )
}