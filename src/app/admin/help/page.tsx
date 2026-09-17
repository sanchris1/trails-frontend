"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  BookOpen,
  MessageCircle,
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Calendar,
  Users,
  CreditCard,
  Package,
  Shield,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface GuideItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href?: string;
}

const faqs: FaqItem[] = [
  {
    id: "f1",
    category: "Bookings",
    question: "How do I confirm a pending booking?",
    answer:
      "Go to Bookings, find the booking with status Pending, open the actions menu, and select Confirm booking. The customer will be notified automatically once the backend is connected.",
  },
  {
    id: "f2",
    category: "Bookings",
    question: "What happens when a booking is cancelled?",
    answer:
      "Cancelled bookings free up capacity on the expedition, appear in Notifications, and can trigger a refund flow from the Payments page if payment was already completed.",
  },
  {
    id: "f3",
    category: "Participants",
    question: "How are participants grouped?",
    answer:
      "Participants are listed under the expedition they booked. Open Participants and expand an expedition to see everyone registered, including payment and confirmation status.",
  },
  {
    id: "f4",
    category: "Payments",
    question: "How do I issue a refund?",
    answer:
      "Open Payments, find the completed transaction, use the actions menu, and choose Issue refund. Record the reason for your internal notes.",
  },
  {
    id: "f5",
    category: "Merchandise",
    question: "How do I add a new product?",
    answer:
      "From Merchandise, use Add Merchandise. Fill in title, pricing, stock, colors, sizes, and images. Save as Draft or Published when ready.",
  },
  {
    id: "f6",
    category: "Users & Roles",
    question: "What’s the difference between Staff and Guide?",
    answer:
      "Staff can manage bookings, participants, and moderation. Guides mainly view assigned expeditions and participant lists. Admins have full access. Adjust this under Roles & Permissions.",
  },
  {
    id: "f7",
    category: "General",
    question: "Where do contact form messages appear?",
    answer:
      "New contact messages show up under Notifications and can also be reviewed when you build the Contact inbox. Enable email alerts in Settings → Notifications.",
  },
  {
    id: "f8",
    category: "General",
    question: "Can I export reports?",
    answer:
      "Yes. Open Reports, pick a report type and period, then download when status is Ready. Analytics is for live overview; Reports is for downloadable summaries.",
  },
];

const guides: GuideItem[] = [
  {
    id: "g1",
    title: "Managing bookings",
    description: "Confirm, cancel, and track hike reservations.",
    icon: Calendar,
  },
  {
    id: "g2",
    title: "Participants & capacity",
    description: "View hikers grouped by expedition.",
    icon: Users,
  },
  {
    id: "g3",
    title: "Payments & refunds",
    description: "Track M-Pesa, card, and bank transactions.",
    icon: CreditCard,
  },
  {
    id: "g4",
    title: "Merchandise catalog",
    description: "Add products, stock, and images.",
    icon: Package,
  },
  {
    id: "g5",
    title: "Roles & access",
    description: "Control what staff and guides can do.",
    icon: Shield,
  },
  {
    id: "g6",
    title: "Account settings",
    description: "Profile, company info, and alerts.",
    icon: Settings,
  },
];

const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function AdminHelpPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<string | null>("f1");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = category === "All" || faq.category === category;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Help & Support
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Guides and answers for using the Trails & Memoirs admin panel.
        </p>
      </div>

      {/* Search */}
      <div className="relative mx-auto mb-8 max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search help articles and FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11"
        />
      </div>

      {/* Quick guides */}
      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <BookOpen className="h-4 w-4" />
          Quick guides
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <button
                key={guide.id}
                type="button"
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/40"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {guide.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {guide.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-10">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <HelpCircle className="h-4 w-4" />
            Frequently asked questions
          </h2>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                size="sm"
                variant={category === cat ? "default" : "outline"}
                onClick={() => setCategory(cat)}
                className="h-8 text-xs"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {filteredFaqs.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              No results for your search.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <li key={faq.id}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/30"
                    >
                      <span className="mt-0.5 text-muted-foreground">
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {faq.question}
                        </p>
                        {isOpen && (
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                      <span className="hidden shrink-0 text-[10px] text-muted-foreground sm:inline">
                        {faq.category}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Contact support */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold text-foreground">
          Still need help?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Reach the Trails & Memoirs team for account or technical issues.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href="mailto:support@trailsandmemoirs.com"
            className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/40"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Email support
              </p>
              <p className="text-xs text-muted-foreground">
                support@trailsandmemoirs.com
              </p>
            </div>
          </a>

          <button
            type="button"
            className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-left transition-colors hover:bg-muted/40"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <MessageCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Contact form
              </p>
              <p className="text-xs text-muted-foreground">
                Send a message from the public site
              </p>
            </div>
            <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </section>
    </div>
  );
}
