import React from 'react';
import { Mail, MessageSquare, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="gradient-gold p-3 rounded-lg shadow-gold">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {t('contact.title')}
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
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-lg">
              Have questions, suggestions, or need support? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-8 shadow-elegant">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="What is this about?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us more about your question or feedback..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" variant="gold" className="w-full font-semibold">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Website</h4>
                    <p className="text-muted-foreground">almanaquedahora.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Response Time</h4>
                    <p className="text-muted-foreground">We typically respond within 24 hours</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Is this service free?</h4>
                    <p className="text-muted-foreground text-sm">Yes, completely free with no hidden costs.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Do you store my data?</h4>
                    <p className="text-muted-foreground text-sm">No, we don't store any personal data or URLs.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Can I use this for commercial purposes?</h4>
                    <p className="text-muted-foreground text-sm">Yes, but please respect YouTube's terms of service.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;