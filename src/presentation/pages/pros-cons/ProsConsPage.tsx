import { useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from '../../components';
import { prosConsUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

const ProsConsPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text: string ) => {

    setIsLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false}]);

    //TODO: UseCase
    const { ok, content } = await prosConsUseCase( text );

    setIsLoading(false);

    if ( !ok ) return;

    setMessages( (prev) => [...prev, { text: content, isGpt: true }]);

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Puedes escribir lo que quieres que compare y te de mis puntos de vista." />

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

export default ProsConsPage;