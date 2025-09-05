import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'pt';
  setLanguage: (lang: 'en' | 'pt') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.title': 'Download YouTube Video Thumbnails',
    'header.subtitle': 'Paste the video URL and download the cover image in high quality',
    'header.brand': 'Almanaque da Hora',
    
    // Search section
    'search.placeholder': 'Paste the YouTube video URL here...',
    'search.example': 'Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'search.button': 'Search Thumbnail',
    'search.searching': 'Searching...',
    'search.description': 'Download free video thumbnails from YouTube and Vimeo in resolutions ranging from standard to HD. Just enter the video URL and click "Generate Thumbnail" to view and save all available versions.',
    
    // Results
    'results.title': 'Available Thumbnails',
    'results.highQuality': 'High Quality',
    'results.mediumQuality': 'Medium Quality',
    'results.lowQuality': 'Low Quality',
    'results.download': 'Download Image',
    
    // Errors and messages
    'error.emptyUrl': 'Please paste the YouTube video URL.',
    'error.invalidUrl': 'Invalid URL. Please use a valid YouTube URL.',
    'success.found': 'Thumbnails found!',
    'success.foundDesc': 'Choose the desired resolution and click download.',
    'success.download': 'Download started!',
    'success.downloadDesc': 'Thumbnail in {quality} downloaded successfully.',
    'error.downloadTitle': 'Download error',
    'error.downloadDesc': 'Could not download the image. Please try again.',
    
    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.home': 'Home',
    'footer.about': 'About Us',
    'footer.contact': 'Contact Us',
    'footer.text': 'Free tool from',
    
    // Pages
    'home.title': 'Home',
    'about.title': 'About Us',
    'contact.title': 'Contact Us',
  },
  pt: {
    // Header
    'header.title': 'Baixar Thumbnail de Vídeo do YouTube',
    'header.subtitle': 'Cole a URL do vídeo e baixe a imagem de capa em alta qualidade',
    'header.brand': 'Almanaque da Hora',
    
    // Search section
    'search.placeholder': 'Cole a URL do vídeo do YouTube aqui...',
    'search.example': 'Exemplo: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'search.button': 'Buscar Thumbnail',
    'search.searching': 'Buscando...',
    'search.description': 'Baixe gratuitamente thumbnails de vídeos do YouTube e Vimeo em resoluções que variam do padrão ao HD. Basta inserir a URL do vídeo e clicar em "Gerar Thumbnail" para visualizar e salvar todas as versões disponíveis.',
    
    // Results
    'results.title': 'Thumbnails Disponíveis',
    'results.highQuality': 'Alta Qualidade',
    'results.mediumQuality': 'Média Qualidade',
    'results.lowQuality': 'Baixa Qualidade',
    'results.download': 'Baixar Imagem',
    
    // Errors and messages
    'error.emptyUrl': 'Por favor, cole a URL do vídeo do YouTube.',
    'error.invalidUrl': 'URL inválida. Use uma URL válida do YouTube.',
    'success.found': 'Thumbnails encontradas!',
    'success.foundDesc': 'Escolha a resolução desejada e clique em baixar.',
    'success.download': 'Download iniciado!',
    'success.downloadDesc': 'Thumbnail em {quality} baixada com sucesso.',
    'error.downloadTitle': 'Erro no download',
    'error.downloadDesc': 'Não foi possível baixar a imagem. Tente novamente.',
    
    // Footer
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Uso',
    'footer.home': 'Início',
    'footer.about': 'Sobre Nós',
    'footer.contact': 'Contato',
    'footer.text': 'Ferramenta gratuita do',
    
    // Pages
    'home.title': 'Início',
    'about.title': 'Sobre Nós',
    'contact.title': 'Contato',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'pt'>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};