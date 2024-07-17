import Link from 'next/link';

export default function Custom403() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center mt-20">
      <h1 className="text-2xl font-bold mb-4">403 - Accès non autorisé !</h1>
      <p className="mb-4">Oops! Vous n&apos;avez pas la permission d&apos;accéder à cette page !</p>
      <Link href="/">
        <p className="text-primary dark:text-secondary hover:underline">Retour en page d&apos;accueil</p>
      </Link>
    </div>
  );
}