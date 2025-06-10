import type { AudioToTextResponse } from "../../interfaces";

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  
  try {
    
    const formData = new FormData();
    formData.append('file', audioFile);
    if (prompt) {
      formData.append('prompt', prompt);
    } 
  
      const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/audio-to-text`, {
        method: 'POST',
        body: formData,
      });
  
      // if ( !resp.ok ) throw new Error('No se pudo realizar la corrección');
      
      const data = await resp.json() as AudioToTextResponse;
      return data;
  
      // return {
      //   ok: true,
      //   ...data,
      //   message: typeof data.message === 'string' ? data.message : ''
      // }
  
    } catch (error) {
      console.log(error);
      return null;
      // return {
      //   ok: false,
      //   userScore: 0,
      //   errors: [],
      //   message: 'No se pudo realizar la corrección'
      // }
    }
}