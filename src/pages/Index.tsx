import React, { useState } from 'react';
import { Search, Download, AlertCircle, CheckCircle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface ThumbnailData {
  url: string;
  quality: string;
  resolution: string;
  size: string;
}

const Index = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [thumbnails, setThumbnails] = useState<ThumbnailData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Handle form submission
  const handleSearch = async () => {
    if (!videoUrl.trim()) {
      setError(t('error.emptyUrl'));
      return;
    }

    const extractedId = extractVideoId(videoUrl.trim());
    if (!extractedId) {
      setError(t('error.invalidUrl'));
      return;
    }

    setIsLoading(true);
    setError('');
    setVideoId(extractedId);

    // Generate thumbnail URLs for different qualities
    const thumbnailQualities: ThumbnailData[] = [
      {
        url: `https://img.youtube.com/vi/${extractedId}/maxresdefault.jpg`,
        quality: t('results.highQuality'),
        resolution: '1280×720',
        size: 'maxresdefault.jpg'
      },
      {
        url: `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`,
        quality: t('results.mediumQuality'),
        resolution: '480×360',
        size: 'hqdefault.jpg'
      },
      {
        url: `https://img.youtube.com/vi/${extractedId}/mqdefault.jpg`,
        quality: t('results.lowQuality'),
        resolution: '320×180',
        size: 'mqdefault.jpg'
      }
    ];

    setThumbnails(thumbnailQualities);
    setIsLoading(false);
    
    toast({
      title: t('success.found'),
      description: t('success.foundDesc'),
    });
  };

  // Handle image download
  const downloadImage = async (imageUrl: string, quality: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `youtube-thumbnail-${videoId}-${quality.toLowerCase().replace(' ', '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: t('success.download'),
        description: t('success.downloadDesc').replace('{quality}', quality.toLowerCase()),
      });
    } catch (error) {
      toast({
        title: t('error.downloadTitle'),
        description: t('error.downloadDesc'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="gradient-gold p-3 rounded-lg shadow-gold">
                <Search className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {t('header.title')}
                </h1>
                <div className="text-sm text-primary font-medium mt-1">
                  {t('header.brand')}
                </div>
              </div>
              <div className="ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
                  className="flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'en' ? 'PT' : 'EN'}
                </Button>
              </div>
            </div>
            <h2 className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('header.subtitle')}
            </h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <Card className="p-6 md:p-8 max-w-2xl mx-auto mb-12 shadow-elegant">
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="url"
                placeholder={t('search.placeholder')}
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="text-lg py-3"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <p className="text-sm text-muted-foreground">
                {t('search.example')}
              </p>
              <p className="text-sm text-muted-foreground mt-4 p-4 bg-muted/30 rounded-lg">
                {t('search.description')}
              </p>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              variant="gold"
              className="w-full font-semibold py-3 text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              {isLoading ? t('search.searching') : t('search.button')}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {thumbnails.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">
                {t('results.title')}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {thumbnails.map((thumb, index) => (
                <Card key={index} className="p-6 shadow-elegant hover:shadow-gold transition-all duration-300">
                  <div className="space-y-4">
                    {/* Thumbnail Preview */}
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={thumb.url}
                        alt={`Thumbnail ${thumb.quality}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    
                    {/* Thumbnail Info */}
                    <div className="text-center space-y-2">
                      <h4 className="font-semibold text-foreground text-lg">
                        {thumb.quality}
                      </h4>
                      <p className="text-muted-foreground">
                        {thumb.resolution}
                      </p>
                      
                      <Button
                        onClick={() => downloadImage(thumb.url, thumb.quality)}
                        variant="gold"
                        className="w-full font-medium"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t('results.download')}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/" className="text-primary-foreground hover:text-primary transition-colors">
                {t('footer.home')}
              </a>
              <a href="/about" className="text-primary-foreground hover:text-primary transition-colors">
                {t('footer.about')}
              </a>
              <a href="/contact" className="text-primary-foreground hover:text-primary transition-colors">
                {t('footer.contact')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t('footer.terms')}
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.text')}{' '}
              <span className="text-primary font-medium">{t('header.brand')}</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;