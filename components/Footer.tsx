import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Image src="/payday-logo.svg" alt="Payday" width={156} height={52} />
            <p>
              Payday is a Lending Service Provider (LSP). Loans are issued by regulated partner lenders.
              We focus on transparent pricing, consent-led servicing, and multilingual support.
            </p>
            <a href="mailto:contact@itspayday.in" rel="noopener noreferrer">contact@itspayday.in</a>
          </div>

          <div className="footer-grid">
            <div>
              <h4>Company</h4>
              <Link href="/for-communities">For Communities</Link>
              <Link href="/for-lenders">For Lenders</Link>
              <Link href="/about">About</Link>
              <Link href="/team">Team</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div>
              <h4>Legal</h4>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/grievance-redressal">Grievance Redressal</Link>
              <Link href="/lsp-disclosure">LSP Disclosure</Link>
            </div>
          </div>
        </div>

        <div className="footer-note">
          <span>&copy; 2026 Satrean Technologies Pvt. Ltd.</span>
          <span>Languages: English • Hinglish • ಕನ್ನಡ • हिन्दी</span>
        </div>
      </div>
    </footer>
  );
}
