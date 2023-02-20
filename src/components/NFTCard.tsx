import NImage from 'next/image'
import { useState, useEffect } from 'react'
import { Box, Stack, Card, CardHeader, CardActions, CardContent, Button, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { type Collection } from 'state'
import { useAccount, useContract, useProvider } from 'wagmi'
import abi from "../lib/getNftAbi"

export default function NFTCard(tokenId: { tokenId: number }) {

    const [isHovered, setIsHovered] = useState(false)

    const [token, setToken] = useState<Collection | null>(null)

    const { address, isConnected } = useAccount()

    const provider = useProvider();

    const ERC721Contract = useContract({
        abi: abi,
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
        signerOrProvider: provider,
    });

    useEffect(() => {
        const fetchToken = async () => {
            const tokenURI = await ERC721Contract?.tokenURI(tokenId.tokenId)
            // console.log(token)
            const metaUri = tokenURI?.replace('ipfs://', 'https://ipfs.io/ipfs/')
            if (!metaUri) return
            const response = await fetch(metaUri)
            // console.log(response)
            const data = await response.json()
            const imgUrl = data?.image?.replace('ipfs://', 'https://ipfs.io/ipfs/')
            const bdata = await fetch(imgUrl).then(res => res.blob()).then(blob => blob.arrayBuffer()).then(buffer => Buffer.from(buffer).toString('base64'))
            console.log(bdata.substring(bdata.length - 10))
            
            setToken({
                name: data?.name,
                description: data?.description,
                owner: address ?? "",
                image: bdata,
            })
        }

        try {
            fetchToken()
        }
        catch (e) {
            console.log(e)
        }
    }, [])

    console.log("imageurl:", token?.image)

    if (!isConnected) return null

    if (!address) return null

    if (!token) return null

    return (
        <Card
            raised={isHovered}
            sx={{
                width: 300,
                // height: 400,
                borderRadius: 2,
                boxShadow: 2,
                padding: "2px",
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 3,
                    backgroundColor: 'rgba(255,255,255, 0.85)',
                    transform: 'translate(-4px,-4px)',
                    width: 308,
                    padding: "6px",
                },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardHeader
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                title={token.name}
                subheader={token.description}
            />
            <CardContent
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                }}
            >
                <NImage
                    // the
                    src={"data:image/png;base64, " + token.image} // token.image
                    // src={"data:image/png; " + token.image} // token.image
                    alt={""}
                    width={256}
                    height={256}
                />
            </CardContent>
            {/* <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" size="small" color="primary">
                        Buy
                    </Button>
                    <Button variant="outlined" size="small" color="primary">
                        Bid
                    </Button>
                </Stack>
                <IconButton
                    sx={{
                        color: isHovered ? 'primary.main' : 'text.secondary',
                    }}
                >
                    <FavoriteIcon />
                </IconButton>
            </CardActions> */}
        </Card>
    )

}
