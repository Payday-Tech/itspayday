import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h4>Product</h4>
          <Link href="/products">Products Hub</Link>
          <Link href="/products/earned-wage-access">Earned Wage Access</Link>
          <Link href="/fees">Fees</Link>
        </div>
        <div>
          <h4>Partners</h4>
          <Link href="/for-communities">For Communities</Link>
          <Link href="/for-lenders">For Lenders</Link>
          <a href="mailto:info@payday.in" rel="noopener noreferrer">Partner with us</a>
        </div>
        <div>
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/team">Team</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Trust & Policies</h4>
          <Link href="/trust">Trust Hub</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/grievance-redressal">Grievance</Link>
          <Link href="/lsp-disclosure">LSP Disclosure</Link>
          <Link href="/security">Security</Link>
        </div>
      </div>
      <div className="seo-links">
        <Link href="/products/earned-wage-access">Earned Wage Access Loans in Bengaluru</Link>
        <Link href="/products/earned-wage-access">Loans in Mumbai</Link>
        <Link href="/for-workers">Loans for Maids</Link>
        <Link href="/for-workers">Loans for Snabbit Employees</Link>
        <Link href="/for-workers">Loans for Urban Company Employees</Link>
        <Link href="/for-workers">Loans for Pronto Employees</Link>
        <Link href="/for-workers">Loans for Factory Workers</Link>
        <Link href="/for-workers">Loans for Gardeners</Link>
        <Link href="/for-workers">Loans for Cooks</Link>
        <Link href="/for-workers">Loans for Drivers</Link>
      </div>
      <div className="footer-bottom">
        &copy; 2026 Payday. Responsible access, always. Languages: English &bull; Hinglish &bull; &#3221;&#3240;&#3277;&#3240;&#3233; &bull; &#2361;&#2367;&#2344;&#2381;&#2342;&#2368;.
      </div>
    </footer>
  );
}
