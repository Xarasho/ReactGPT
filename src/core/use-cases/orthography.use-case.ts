import type { OrthographyResponse } from "../../interfaces";

export const orthographyUseCase = async (prompt: string) => {

  try {

    const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/orthography-check`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if ( !resp.ok ) throw new Error('No se pudo realizar la corrección');
    
    const data = await resp.json() as OrthographyResponse;

    return {
      ok: true,
      ...data,
      message: typeof data.message === 'string' ? data.message : ''
    }

  } catch (error) {
    console.error('Orthography check failed:', error);

    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizar la corrección'
    }
  }
}
