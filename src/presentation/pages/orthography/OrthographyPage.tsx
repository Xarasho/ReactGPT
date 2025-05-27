import { GptMessage, MyMessage, TypingLoader } from '../../components';
const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones." />

          <MyMessage text="Hola Mundo" />

          <div className='fade-in'>
            <TypingLoader />
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrthographyPage