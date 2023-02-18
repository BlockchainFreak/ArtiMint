import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import ethers from "ethers";
import { useAccount, useProvider, useContract } from "wagmi";
import { collectionState, type Collection } from "state";
import { Box, Grid, Container, Typography } from "@mui/material";
import NFTCard from "./NFTCard";
import { abi } from "../lib/getNFTabi"

export default function Collections() {
    const [tokenIds, setTokenIds] = useState<number[]>([])

    const provider = useProvider();

    const { address, isConnected } = useAccount()

    const ERC721Contract = useContract({
        abi: abi,
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
        signerOrProvider: provider,
    });

        useEffect(() => {
            // const demoCollections: Collection[] = Array.from({ length: 18 }, (_, i) => ({
            //     name: "Bored Ape",
            //     description: "A Monkey smoking a joint with a blue hat and red eyes",
            //     owner: "0x123456789",
            //     image: "******",
            // }))

            const fetchCollections = async () => {
                const _totalSupply = await ERC721Contract?.getTotalSupply()
                const totalSupply = parseInt(_totalSupply)
                
                const tokensIDs = Array.from( {length: totalSupply }, (_,i) => i)
                
                setTokenIds(tokensIDs)
            }

            fetchCollections()
        }, [])


    return (
        <Box sx={{ padding: '0 30px' }}>
            <Grid container spacing={2}>
                {tokenIds.map((id) => (
                    <Grid key={id} item xs={12} sm={6} md={6} lg={3}>
                        <NFTCard tokenId={id} />
                    </Grid> 
                ))}
            </Grid>
        </Box>
    )
}