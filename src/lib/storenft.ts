
import { NFTStorage, File } from 'nft.storage'
// The 'mime' npm package helps us set the correct file type on our File objects
import mime from 'mime'
import fs from 'fs'
import path from 'path'

// return the ipfs link that can be used as base Uri for the NFT
export async function storeNFT(imagePath: string, name: string, description: any) {
    // load the file from disk
    const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY ?? ""})

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    })
}

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
export async function fileFromPath( image_b64_json: string) {
    // convert the image_b64_json string to a buffer
    const content = Buffer.from(image_b64_json, 'base64')
    // convert buffer to blob
    const blob = new Blob([content], { type: 'image/png' })
    return blob
}