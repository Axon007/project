function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-foreground">About</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Careers</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Cloud Solutions</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Consulting</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Blog</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Documentation</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Terms</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-foreground/70">© 2024 TechSolutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;