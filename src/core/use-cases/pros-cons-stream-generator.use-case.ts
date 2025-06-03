// import type { ProsConsResponse } from "../../interfaces";

export async function* prosConsStreamGeneratorUseCase( prompt: string, abortSignal: AbortSignal) {

  try {

    const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ prompt }),
      // TODO: abortSignal()
      signal: abortSignal,
    });

    if ( !resp.ok ) throw new Error('No se pudo realizar la comparación');
    
    // const data = await resp.json() as ProsConsResponse;

    const reader = resp.body?.getReader();
    if ( !reader ) {
      console.log("No se pudo generar el reader");
      return null;
    }

    const decoder = new TextDecoder();

    let text = '';

    while ( true ) {
      const { value, done } = await reader.read();
      if ( done ) {
        break;
      }

      const decodedChunk = decoder.decode( value, { stream: true } );

      text += decodedChunk;
      // console.log(text);
      yield text;
    }

  } catch (error) {
    console.error('ProsConsStream check failed:', error);
    return null;
  }
}