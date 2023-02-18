import { Configuration, OpenAIApi, type CreateImageRequest, type ImagesResponse } from "openai"

export const generateArtImage = async (prompt: string) => {
    const conf = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? "",
    })
    const openai = new OpenAIApi(conf)

    const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json", // can also be b64 json 
    })

    return response.data.data[0].b64_json || ""
}