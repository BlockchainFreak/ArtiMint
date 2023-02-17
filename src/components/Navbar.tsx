import { ConnectButton } from "@rainbow-me/rainbowkit"
import React from 'react'
import { AppBar, Toolbar, Box, Button, Tabs, Tab } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CampaignIcon from '@mui/icons-material/Campaign';
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {

    const { route } = useRouter()
    const currentTabValue = getTabValue(route)

    const [anchorElMenu, setAnchorElMenu] = React.useState(false)

    return (
        <header>
            <Box>
                <AppBar>
                    <Toolbar disableGutters>
                        <Tabs
                            value={currentTabValue}
                            TabIndicatorProps={{ sx: { bgcolor: '#eee' } }}
                            selectionFollowsFocus
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            <Link href="/">
                                <Tab label={<HomeIcon fontSize="medium" />}{...getIdProps(0)} />
                            </Link>
                            <Link href="/mint">
                                <Tab label={<Format text={"Mint"} />}{...getIdProps(1)} />
                            </Link>
                            <Link href="/collection">
                                <Tab label={<Format text={"Collection"} />} {...getIdProps(2)} />
                            </Link>
                        </Tabs>
                        <Box sx={{ flexGrow: 1 }} />
                        <ConnectButton />
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    )
}


const Format = ({ text }: { text: string }) => (
    <span style={{ fontSize: 15, color: "white" }}>
        <strong>
            {text}
        </strong>
    </span>
)

const getIdProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
})

const getTabValue = (route: string) => {
    switch (route) {
        case '/':
            return 0
        case '/mint':
            return 1
        case '/collection':
            return 2
    }
}
