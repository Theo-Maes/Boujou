export default function ErrorPage() {
  let errorMessage = 'Une erreur inconnue est survenue.';

  return (
    <div>
      <h1>Erreur</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
