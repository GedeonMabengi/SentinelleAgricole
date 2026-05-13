import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayouts';

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Prédiction de rendement',
    description: 'Estimez vos récoltes avec une précision inégalée grâce à notre modèle d’intelligence artificielle.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Détection de maladies',
    description: 'Prenez une photo et identifiez instantanément les maladies de vos cultures avec recommandations.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    title: 'Assistant IA agricole',
    description: 'Posez vos questions agronomiques et obtenez des réponses expertes 24h/24 en français.',
  },
];

const steps = [
  { step: '1', title: 'Créez un compte', text: 'Inscrivez-vous gratuitement et accédez à votre tableau de bord personnalisé.' },
  { step: '2', title: 'Ajoutez vos parcelles', text: 'Enregistrez vos champs et cultures pour bénéficier d’analyses adaptées.' },
  { step: '3', title: 'Obtenez des insights', text: 'Recevez des recommandations actionnables pour optimiser votre production.' },
];

export default function Welcome() {
  return (
    <PublicLayout title="Accueil">
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-green-800 tracking-tight">
            🌾 Sentinelle Agricole
          </div>
          <div className="space-x-4">
            <Link
              href={route('login')}
              className="text-gray-700 hover:text-green-700 font-medium transition-colors"
            >
              Connexion
            </Link>
            <Link
              href={route('register')}
              className="inline-block bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
            >
              Essai gratuit
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-lime-50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Cultivez l’avenir avec l’<span className="text-green-600">intelligence artificielle</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Prédictions de rendement, détection des maladies et conseils agronomiques personnalisés pour faire prospérer votre exploitation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={route('register')}
                className="bg-green-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
              >
                Commencer gratuitement
              </Link>
              <a
                href="#features"
                className="inline-flex items-center border border-green-600 text-green-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-green-50 transition-colors"
              >
                Découvrir les fonctionnalités
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            {/* Illustration abstraite en SVG (tu peux remplacer par ton image) */}
            <svg viewBox="0 0 500 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              <rect x="50" y="220" width="400" height="130" rx="20" fill="url(#grad)" opacity="0.9" />
              <circle cx="140" cy="150" r="35" fill="#fbbf24" />
              <path d="M140 115 Q140 80 170 80 Q200 80 200 115" fill="#4ade80" />
              <rect x="210" y="240" width="80" height="110" rx="10" fill="#166534" />
              <rect x="310" y="250" width="60" height="100" rx="10" fill="#15803d" />
              <path d="M220 180 L250 110 L280 180 Z" fill="#facc15" />
              <circle cx="400" cy="140" r="40" fill="#fef08a" />
              <path d="M400 100 Q400 70 430 70 Q460 70 460 100" fill="#86efac" />
              <rect x="80" y="180" width="12" height="40" rx="6" fill="#78350f" />
              <rect x="130" y="180" width="12" height="40" rx="6" fill="#78350f" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Des outils puissants pour votre ferme
            </h2>
            <p className="text-gray-600 text-lg">
              Centralisez la gestion de vos cultures et prenez des décisions éclairées grâce à l’IA.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            En trois étapes simples
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-green-200">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à révolutionner votre exploitation ?
          </h2>
          <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto">
            Rejoignez les agriculteurs qui optimisent déjà leurs rendements grâce à l’intelligence artificielle.
          </p>
          <Link
            href={route('register')}
            className="inline-block bg-white text-green-700 px-10 py-4 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-2xl"
          >
            Démarrer gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Sentinelle Agricole. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
   </PublicLayout>
  );
}