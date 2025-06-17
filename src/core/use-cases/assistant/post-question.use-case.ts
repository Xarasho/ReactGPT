import type { QuestionResponse } from "../../../interfaces";

export const postQuestionUseCase = async (threaId: string, question: string) => {

try {
  
  const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/user-question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      threadId: threaId,
      question: question, 
    }),
  });

  // console.log(resp);

  const replies = await resp.json() as QuestionResponse[];

  return replies;

} catch (error) {
  console.log(error);
  throw new Error('Failed to post question');
}

}