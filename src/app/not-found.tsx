import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center mt-20">
      <h1 className="text-2xl font-bold mb-4">404 - Page non trouvée !</h1>
      <p className="mb-4">Oops! La page que vous recherchez n&apos;existe pas.</p>
      <Link href="/">
        <p className="text-primary dark:text-secondary hover:underline">Retour en page d&apos;accueil</p>
      </Link>
    </div>
  );
}