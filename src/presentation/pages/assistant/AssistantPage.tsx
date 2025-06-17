import { useEffect, useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from '../../components';
import { createThreadUseCase, postQuestionUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

export const AssistantPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [threadId, setThreadId] = useState<string>();

  // Get thread, if it does not exist, create it
  useEffect(() => {
    const threadId = localStorage.getItem('threadId');
    if (threadId) {
      setThreadId(threadId);
    } else {
      createThreadUseCase()
        .then((id) => {
          setThreadId(id);
          localStorage.setItem('threadId', id);
        })
    }
  }, []);

  useEffect(() => {
    if (threadId) {
      setMessages( (prev) => [...prev, { text: `Thread Number: ${threadId}` , isGpt: true }]);
    }
  }, [threadId])
  
  

  const handlePost = async( text: string ) => {

    if (!threadId) return;

    setIsLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false}]);

    const replies = await postQuestionUseCase(threadId, text);
    console.log(replies)

    setIsLoading(false);

    for (const reply of replies) {
      for (const message of reply.content) {
        setMessages( (prev) => [
          ...prev,
          {text: message, isGpt: (reply.role === 'assistant'), info: reply}
        ])
      }
    }

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Buen dia, soy Sam, en que puedo ayudarte?" />

          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={index} text={message.text} />
                )
                : (
                  <MyMessage key={index} text={message.text} />
                )
            ))
          }

          {/* <MyMessage text="Hola Mundo" /> */}

          {
            isloading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }

        </div>
      </div>

      <TextMessageBox
        onSendMessage={ handlePost }
        placeHolder='Escribe aqui lo que deseas'
        disableCorrections
      />
    </div>
  )
}
