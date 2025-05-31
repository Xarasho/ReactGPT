import { useState } from 'react';
import { GptMessage, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components';
import { orthographyUseCase } from '../../../core/use-cases';
// import { GptMessage, MyMessage, TextMessageBox, TextMessageBoxFile, TextMessageBoxSelect, TypingLoader } from '../../components';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}

const OrthographyPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text: string ) => {

    setIsLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false}]);
    
    const { ok, errors, message, userScore } = await orthographyUseCase(text);
    // console.log(data);
    if ( !ok ) {
      setMessages( (prev) => [...prev, { text: 'No se pudo realizar la corrección', isGpt: true }]);
    } else {
      setMessages( (prev) => [...prev, { 
        text: message, isGpt: true,
        info: {
          errors: errors,
          message: message,
          userScore: userScore,
        } 
      }]);
    }

    setIsLoading(false);

    // Todo: Add message isGpt as true

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones." />

          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptOrthographyMessage 
                  key={index} 
                  // text="Esto es de OpenAI" 

                  // Same as below
                  {...message.info!}
                  // errors={ message.info!.errors }
                  // message={ message.info!.message }
                  // userScore={ message.info!.userScore }
                  />
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
      {/* <TextMessageBoxFile
        onSendMessage={ handlePost }
        placeHolder='Escribe aqui lo que deseas'
      /> */}
      {/* <TextMessageBoxSelect 
        onSendMessage={ console.log }
        options={ [ { id: "1", text: "Hola" }, { id: "2", text: "Mundo" } ] }
      /> */}
    </div>
  )
}

export default OrthographyPage;