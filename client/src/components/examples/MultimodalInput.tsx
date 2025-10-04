import MultimodalInput from '../MultimodalInput'

export default function MultimodalInputExample() {
  return (
    <MultimodalInput
      onSend={(msg) => console.log('Message sent:', msg)}
      onVoiceToggle={() => console.log('Voice toggled')}
      onImageUpload={(file) => console.log('Image uploaded:', file.name)}
      onScreenShare={() => console.log('Screen share started')}
    />
  )
}
