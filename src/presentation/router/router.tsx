import { createBrowserRouter, Navigate } from "react-router-dom";
import { AssistantPage } from "../pages/assistant/AssistantPage";
import { AudioToTextPage } from "../pages/audio-to-text/AudioToTextPage";
import { ImageGenerationPage } from "../pages/image-generation/ImageGenerationPage";
import { ImageTunningPage } from "../pages/image-generation/ImageTunningPage";
import { OrthographyPage } from "../pages/orthography/OrthographyPage";
import { ProsConsStreamPage } from "../pages/pros-cons-stream/ProsConsStreamPage";
import { ProsConsPage } from "../pages/pros-cons/ProsConsPage";
import TextToAudioPage from "../pages/text-to-audio/TextToAudioPage";
import { TranslatePage } from "../pages/translate/TranslatePage";
// import DashboardLayout from "../layouts/DashboardLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const menuRoutes = [
  {
    to: "/orthography",
    icon: "fa-solid fa-spell-check",
    title: "Ortografía",
    description: "Corregir ortografía",
    component: <OrthographyPage />
  },
  {
    to: "/pros-cons",
    icon: "fa-solid fa-code-compare",
    title: "Pros & Cons",
    description: "Comparar pros y contras",
    component: <ProsConsPage />
  },
  {
    to: "/pros-cons-stream",
    icon: "fa-solid fa-water",
    title: "Como stream",
    description: "Con stream de mensajes",
    component: <ProsConsStreamPage />
  },
  {
    to: "/translate",
    icon: "fa-solid fa-language",
    title: "Traducir",
    description: "Textos a otros idiomas",
    component: <TranslatePage />
  },
  {
    to: "/text-to-audio",
    icon: "fa-solid fa-podcast",
    title: "Texto a audio",
    description: "Convertir texto a audio",
    component: <TextToAudioPage />
  },
  {
    to: "/audio-to-text",
    icon: "fa-solid fa-comment-dots",
    title: "Audio a texto",
    description: "Convertir audio a texto",
    component: <AudioToTextPage />
  },
  {
    to: "/image-generation",
    icon: "fa-solid fa-image",
    title: "Imágenes",
    description: "Generar imágenes",
    component: <ImageGenerationPage />
  },
  {
    to: "/image-tunning",
    icon: "fa-solid fa-wand-magic",
    title: "Editar imagen",
    description: "Generación continua",
    component: <ImageTunningPage />
  },
  {
    to: "/assistant",
    icon: "fa-solid fa-user",
    title: "Asistente",
    description: "Información del asistente",
    component: <AssistantPage />
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout /> ,
    children: [
      ...menuRoutes.map( route => ({
        path: route.to,
        element: route.component
      })),
      {
        path: '',
        element: <Navigate to={ menuRoutes[0].to } />
      }
    ],
  }
])