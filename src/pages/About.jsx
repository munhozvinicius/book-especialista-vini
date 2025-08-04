import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost" className="mb-4 hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Button>
      </Link>

      {/* About Content */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-modern">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 rounded-full gradient-purple flex items-center justify-center mx-auto mb-6 shadow-card">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-6">
            Sobre o Sistema
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Feito por Vinicius Munhoz, pensando em te ajudar 😊
          </p>
          
          <div className="mt-8 p-6 bg-white/50 rounded-xl border border-primary/10">
            <p className="text-sm text-muted-foreground">
              Sistema desenvolvido com carinho para facilitar o dia a dia dos consultores Vivo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

