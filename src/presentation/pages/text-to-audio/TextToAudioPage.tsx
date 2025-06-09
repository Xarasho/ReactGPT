import { useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect } from '../../components';

const disclaimer = `## ¿Qué audio quieres generar hoy?
* Todo el audio es generado es por IA
`

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

interface Message {
  text: string;
  isGpt: boolean;
}

export const TextToAudioPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text: string, selectedVoice: string ) => {

    setIsLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false}]);

    //TODO: UseCase

    setIsLoading(false);

    // Todo: Add message isGpt as true

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text={disclaimer} />

          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={index} text="Esto es de OpenAI" />
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

      <TextMessageBoxSelect
        onSendMessage={ handlePost }
        placeHolder='Escribe aqui lo que deseas'
        options={ voices }
      />
    </div>
  )
}


export default TextToAudioPage