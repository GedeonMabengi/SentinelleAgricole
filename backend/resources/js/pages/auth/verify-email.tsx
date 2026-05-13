import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const resend = () => post(route('verification.send'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head title="Vérification de l'e-mail" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Vérifiez votre adresse
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Un e-mail de vérification vous a été envoyé.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 text-center space-y-4">
          {status === 'verification-link-sent' && (
            <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              Un nouveau lien de vérification a été envoyé à votre adresse.
            </div>
          )}

          <p className="text-gray-600 text-sm leading-relaxed">
            Merci de cliquer sur le lien reçu par e-mail avant de continuer. Si vous n'avez rien reçu, vous pouvez demander un renvoi.
          </p>

          <button
            onClick={resend}
            disabled={processing}
            className="inline-flex justify-center py-3 px-6 border border-transparent rounded-xl shadow-lg shadow-green-200 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-semibold transition-colors disabled:opacity-75"
          >
            {processing ? 'Envoi...' : 'Renvoyer le lien'}
          </button>

          <div className="mt-4">
            <Link href={route('logout')} method="post" as="button" className="text-sm text-gray-500 hover:text-gray-700 underline">
              Se déconnecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}