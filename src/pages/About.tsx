import React from 'react';
import { Search, Heart, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="gradient-gold p-3 rounded-lg shadow-gold">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {t('about.title')}
                </h1>
                <div className="text-sm text-primary font-medium mt-1">
                  {t('header.brand')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-8 shadow-elegant">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              At Almanaque da Hora, we believe in making digital tools accessible to everyone. 
              Our YouTube Thumbnail Downloader was created to help content creators, marketers, 
              and everyday users easily access high-quality thumbnails for their projects.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We understand the importance of visual content in today's digital world, and we're 
              committed to providing simple, efficient solutions that save you time and effort.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why Choose Us?</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Fast and reliable thumbnail extraction</li>
                <li>• Multiple resolution options</li>
                <li>• No registration required</li>
                <li>• Completely free to use</li>
                <li>• Mobile-friendly design</li>
                <li>• Privacy-focused approach</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Simplicity in design and functionality</li>
                <li>• User privacy and data protection</li>
                <li>• Accessibility for all users</li>
                <li>• Continuous improvement</li>
                <li>• Community-driven development</li>
                <li>• Open and transparent practices</li>
              </ul>
            </Card>
          </div>

          <Card className="p-8 shadow-elegant bg-card/50">
            <div className="text-center">
              <Search className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground">
                Try our YouTube Thumbnail Downloader and see how easy it is to get 
                high-quality thumbnails in seconds.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;