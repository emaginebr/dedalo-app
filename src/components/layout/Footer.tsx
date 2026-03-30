import { useWebsite } from '../../hooks';

export function Footer() {
  const { website } = useWebsite();

  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {website?.name || 'Dedalo'}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
