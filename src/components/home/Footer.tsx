import { Mail } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import Logo from "../common/Logo";

const footerLinks = {
  explore: [
    {
      label: "Adventures",
      href: "/adventures",
    },
    {
      label: "Expeditions",
      href: "/expeditions",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
  ],

  company: [
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
    {
      label: "Our Guides",
      href: "/guides",
    },
    {
      label: "FAQs",
      href: "/faq",
    },
  ],

  support: [
    {
      label: "Help Center",
      href: "/help",
    },
    {
      label: "Booking Information",
      href: "/booking-information",
    },
    {
      label: "Terms & Conditions",
      href: "/terms",
    },
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="flex flex-col gap-8 border-b py-10 md:flex-row md:items-center md:justify-between">
          {/* Logo / description */}
          <div className="max-w-sm">
            <Logo />

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Discover Kenya through unforgettable adventures, breathtaking
              landscapes, and carefully organized expeditions.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-md">
            <p className="mb-3 text-sm font-semibold">Stay in the loop</p>

            <form className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  type="email"
                  placeholder="Your email address"
                  className="
                    h-11 w-full rounded-xl border
                    bg-background pl-10 pr-3
                    text-sm outline-none
                    transition
                    focus:border-accent
                    focus:ring-2
                    focus:ring-accent/20
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  h-11 rounded-xl bg-accent px-5
                  text-sm font-semibold text-accent-foreground
                  transition hover:opacity-90
                "
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-10 py-10 sm:grid-cols-3 md:grid-cols-4">
          {/* Explore */}
          <FooterColumn title="Explore" links={footerLinks.explore} />

          {/* Company */}
          <FooterColumn title="Company" links={footerLinks.company} />

          {/* Support */}
          <FooterColumn title="Support" links={footerLinks.support} />

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold">Follow Us</h3>

            <div className="mt-4 flex gap-2">
              <SocialLink href="#" label="Instagram">
                <FaInstagram className="h-4 w-4" />
              </SocialLink>

              <SocialLink href="#" label="Facebook">
                <FaFacebook className="h-4 w-4" />
              </SocialLink>

              <SocialLink href="#" label="Twitter">
                <FaTwitter className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 border-t py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Trails & Memoirs. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link href="/privacy" className="transition hover:text-foreground">
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}) => {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      aria-label={label}
      className="
        flex h-9 w-9 items-center justify-center
        rounded-full border
        text-muted-foreground
        transition
        hover:border-accent
        hover:bg-accent/10
        hover:text-accent
      "
    >
      {children}
    </Link>
  );
};

export default Footer;
