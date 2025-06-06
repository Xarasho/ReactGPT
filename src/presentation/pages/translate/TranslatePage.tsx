import { useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect } from '../../components';

interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: "ruso", text: "Ruso" },
  { id: "inglés", text: "Inglés" },
  { id: "francés", text: "Francés" },
  { id: "ucraniano", text: "Ucraniano" },
  { id: "polaco", text: "Polaco" },
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "italiano", text: "Italiano" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
];

export const TranslatePage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text: string, selectedOption: string ) => {

    setIsLoading(true);

    const newMessage = `Traduce: "${ text }" al idioma ${ selectedOption }`

    setMessages( (prev) => [...prev, { text: newMessage, isGpt: false}]);

    //TODO: UseCase

    setIsLoading(false);

    // Todo: Add message isGpt as true

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="What do you want to translate today?" />

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

      <TextMessageBoxSelect
        onSendMessage={ handlePost }
        placeHolder='Escribe aqui lo que deseas'
        options={languages}
      />
    </div>
  )
}
