import React from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useLanguage();

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
            </div>
            <h2 className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('header.subtitle')}
            </h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Card className="p-8 shadow-elegant">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Welcome to YouTube Thumbnail Downloader
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              The easiest way to download high-quality thumbnails from YouTube videos. 
              Simply paste any YouTube URL and get instant access to multiple resolution options.
            </p>
            <Link to="/download">
              <Button variant="gold" size="lg" className="font-semibold">
                <Search className="w-5 h-5 mr-2" />
                Start Downloading
              </Button>
            </Link>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">Fast & Easy</h3>
              <p className="text-muted-foreground">
                Just paste the YouTube URL and get thumbnails instantly
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">Multiple Resolutions</h3>
              <p className="text-muted-foreground">
                Download in high, medium, or low quality based on your needs
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">100% Free</h3>
              <p className="text-muted-foreground">
                No registration required, completely free to use
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;