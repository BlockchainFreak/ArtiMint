import { useRecoilState } from "recoil"
import { modalState } from "state"
import { Modal, Box, ThemeProvider, createTheme } from "@mui/material"

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function CustomModal() {
    const [modal, setModal] = useRecoilState(modalState)

    if (!modal.open) {
        return null
    }

    if (["metadata", "client", "seller", "products", "total", "invoices"].includes(modal.title)) {
        return (
            // <ThemeProvider>
            <Modal
                open={modal.open}
                onClose={() => setModal({ open: false, title: "" })}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    width: "70vw", height: "70vh", bgcolor: "#efe",
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 24, p: 4, borderRadius: 2,
                    padding: '50px', overflow: 'auto',
                }}>
                    {/* <ModalController title={modal.title} /> */}
                </Box>
            </Modal>
            // </ThemeProvider>
        )
    }

    return null
}

// const ModalController = ({ title }: { title: string }) => {
//     if (title === "metadata") {
//         return <MetadataModal />
//     }
//     else if (title === "client") {
//         return <ClientModal />
//     }
//     else if (title === "seller") {
//         return <SellerModal />
//     }
//     else if (title === "products") {
//         return <ProductsModal />
//     }
//     else if (title === "total") {
//         return <TotalModal />
//     }
//     else if (title === "invoices") {
//         return <InvoiceLoadModal />
//     }
//     else {
//         return null
//     }
// }