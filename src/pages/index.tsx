import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Button, TextField, Stack, Box } from "@mui/material"
import { useState } from 'react'
import { generateArtImage } from '@/lib/getArt'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState(bunnylink)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack spacing={2} direction="column" alignItems="center" sx={{margin: '50px'}}>
          <TextField
            label="Prompt"
            variant="outlined"
            size="small"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            variant="contained"
            // onClick={() => generateArtImage(prompt).then((image) => setImage(image ?? ""))}
          >
            Submit
          </Button>
          <Image
            alt="generated art"
            src={image}
            width={256}
            height={256}
          />
        </Stack>
      </main>
    </>
  )
}

const bunnylink = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-wB1Bj0h7l3mOD4sUoVo5jqix/user-DrDD0PxAreeDzSkK2xBz6HN0/img-yqWCO89tXHCI3dnqwYfhAe5w.png?st=2023-02-17T14%3A22%3A11Z&se=2023-02-17T16%3A22%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-17T08%3A29%3A39Z&ske=2023-02-18T08%3A29%3A39Z&sks=b&skv=2021-08-06&sig=VRhN4vIfC4h87704uABsxb6PzkScviF/DyotN5MIMuc%3D"

/*
https://oaidalleapiprodscus.blob.core.windows.net/private/org-wB1Bj0h7l3mOD4sUoVo5jqix/user-DrDD0PxAreeDzSkK2xBz6HN0/img-yqWCO89tXHCI3dnqwYfhAe5w.png?st=2023-02-17T14%3A22%3A11Z&se=2023-02-17T16%3A22%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-17T08%3A29%3A39Z&ske=2023-02-18T08%3A29%3A39Z&sks=b&skv=2021-08-06&sig=VRhN4vIfC4h87704uABsxb6PzkScviF/DyotN5MIMuc%3D
*/