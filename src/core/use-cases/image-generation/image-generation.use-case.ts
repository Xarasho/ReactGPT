type GeneratedImage = Image | null;

interface Image {
  url: string;
  alt: string;
}

export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maksImage?: string
): Promise<GeneratedImage> => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/image-generation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          originalImage,
          maksImage,
        }),
      }
    );

    const { url, revisedPrompt: alt } = await resp.json();

    // console.log({url, alt})

    return {url, alt};

  } catch (error) {
    console.log(error);
    return null;
  }
};
