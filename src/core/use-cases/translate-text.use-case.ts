import type { TranslateResponse } from "../../interfaces";

export const translateTextUseCase = async ( prompt: string, lang: string ) => {

  const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt, lang })
  });

  if ( !resp.ok ) throw new Error('No se pudo realizar la traduccion');

  // const data = await resp.json()  as TranslateResponse;
  // console.log(data)
  const { message } = await resp.json()  as TranslateResponse;
  
  try {

    return {
      ok: true,
      message: message
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo traducir'
    }
  }
}