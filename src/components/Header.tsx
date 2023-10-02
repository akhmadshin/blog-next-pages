import { Link } from '@/components/Link';
import { Container } from '@/components/Container';

export function Header() {
  return (
    <header
    >
      <Container>
        <div className="relative flex gap-4 pt-6">
          <div className="flex flex-1">
            <Link
              href="/"
              aria-label="Home"
            >
              <span className="font-bold">Home</span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}