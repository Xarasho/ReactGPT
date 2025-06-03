import type { ProsConsResponse } from "../../interfaces";

export const prosConsUseCase = async ( prompt: string) => {

  try {

    const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if ( !resp.ok ) throw new Error('No se pudo realizar la comparación');
    
    const data = await resp.json() as ProsConsResponse;

    return {
      ok: true,
      ...data,
      // message: typeof data.message === 'string' ? data.message : ''
    }

  } catch (error) {
    console.error('ProsCons check failed:', error);

    return {
      ok: false,
      // userScore: 0,
      // errors: [],
      content: 'No se pudo realizar la comparación'
    }
  }
}