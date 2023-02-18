import Image from "next/image"
import { useState } from "react"
import { Box, TextField, Stack, Button, IconButton } from "@mui/material"
import { useAccount, useSigner, useContract, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { storeNFT } from "@/lib/storenft"
import { generateArtImage } from "@/lib/getArt"
import { useRecoilState } from "recoil"
import { confirmationState, snackBarState } from "state"
import { abi } from "@/lib/getNFTabi";

export default function Minter() {


    const [image, setImage] = useState("")

    return (
        <Box sx={{ margin: '120px 80px 80px 80px', bgcolor: "", padding: '30px', }}>
            <Stack direction="row" spacing={2} sx={{ display: "grid", gridTemplateColumns: '1fr 3fr', }}>
                <LeftBar image={image} setImage={setImage} />
                <Box sx={{ position: 'relative', width: '40vw', height: '40vw' }}>
                    <Image
                        alt="generated art"
                        src={"data:image/png;base64, " + image}
                        fill={true}
                    />
                </Box>
            </Stack>
        </Box>
    )
}

type LeftBarProps = {
    image: string
    setImage: (img: string) => void
}

const LeftBar = ({ image, setImage }: LeftBarProps) => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [prompt, setPrompt] = useState("")
    const [minted, setMinted] = useState(false)

    const [ipfsHash, setIpfsHash] = useState("")

    const [alert, setAlert] = useRecoilState(snackBarState)

    const [confirmation, setConfirmation] = useRecoilState(confirmationState)

    const { data: signer } = useSigner({
        chainId: 80001,
        onError: (error) => {
            console.error(error)
        },
        onSuccess(data) {
            console.log(data)
        },
    });

    const { address, isConnected } = useAccount()

    type hexPrefix = `0x${string}`

    const nftContract = useContract({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as hexPrefix,
        abi: abi,
        signerOrProvider: signer,
    })
    // const { data, write } = useContractWrite(config)

    // const { isLoading, isSuccess } = useWaitForTransaction({
    //     hash: data?.hash,
    // })

    const handleDeleteImage = () => {
        setConfirmation({
            open: true,
            message: "Are you sure you want to delete this image without minting nft?",
            onConfirm: () => setImage(""),
        })
    }

    const handleGenerateImage = async () => {
        const generatedImage = await generateArtImage(prompt)
        setImage(generatedImage)
    }

    const handleMintNFT = async () => {
        try {
            const res = await storeNFT("fashion design " + image, name, description)
            setIpfsHash(res?.url ?? "")
            console.log(res?.url)
            if(!res?.url) {
                return
            }
            await nftContract?.mint(res?.url)
            setMinted(true)
        }
        catch (e) {
            console.error(e)
            setAlert({
                open: true,
                message: "Error minting NFT",
                severity: "error",
            })
        }
    }

    return (
        <Stack spacing={2} direction="column" sx={{ padding: '20px', bgcolor: "white", borderRadius: "10px" }}>
            <TextField
                label="NFT Name"
                variant="outlined"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="NFT Description"
                multiline
                rows={4}
                variant="outlined"
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
                label="Prompt"
                variant="outlined"
                size="small"
                multiline
                maxRows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={() => handleGenerateImage()}
            >
                Generate
            </Button>
            {
                image.length > 1 && <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleMintNFT()}
                >
                    Mint NFT
                </Button>
            }
            {/* {
                // transaction status loading or success
                minted && <Button color="inherit">
                    {isLoading && "Loading..."}
                    {isSuccess && "Success"}
                </Button>
            } */}
        </Stack>
    )
}