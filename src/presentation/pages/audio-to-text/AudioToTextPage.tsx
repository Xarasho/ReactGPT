import { useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxFile } from '../../components';
import { audioToTextUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text: string, audioFile: File ) => {

    setIsLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false}]);

    //TODO: UseCase
    const resp = await audioToTextUseCase(audioFile, text)
    setIsLoading(false);

    if ( !resp ) return;

    const gptMessage = `
## Trascription:
__Duration:__ ${ Math.round(resp.duration) } seconds
### The text is:
${ resp.text }
`

    setMessages((prev) => [
      ...prev,
      {text: gptMessage, isGpt: true}
    ]);

    for ( const segment of resp.segments ) {
      const segmentMessage = `
__From ${ Math.round( segment.start ) } to ${ Math.round( segment.end ) } seconds:__
${segment.text}
`

    setMessages((prev) => [
      ...prev,
      {text: segmentMessage, isGpt: true}
    ]);
  }

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Hola, ¿qué audio quieres generar hoy?" />

          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={index} text={message.text} />
                )
                : (
                  <MyMessage key={index} text={(message.text === '') ? 'Transcribe the audio' : message.text} />
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

      <TextMessageBoxFile
        onSendMessage={ handlePost }
        placeHolder='Escribe aqui lo que deseas'
        disableCorrections
        accept="audio/*"
      />
    </div>
  )
}