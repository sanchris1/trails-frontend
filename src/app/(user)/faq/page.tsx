"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  MessageCircle,
  Mail,
  MapPin,
  Calendar,
  Package,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    id: "1",
    category: "Bookings",
    question: "How do I book a hike?",
    answer:
      "Browse our trails, pick a date that works for you, choose the number of participants, and complete payment. You’ll receive a confirmation email with meeting point and packing details.",
  },
  {
    id: "2",
    category: "Bookings",
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes. Cancellations made at least 48 hours before the hike are eligible for a full refund or free reschedule. Within 48 hours, refunds may be partial depending on the trail and costs already incurred.",
  },
  {
    id: "3",
    category: "Bookings",
    question: "What should I bring on a hike?",
    answer:
      "Comfortable hiking shoes, water (at least 1.5L), snacks, sunscreen, a light jacket, and a charged phone. Specific trails may list extra items on the trail page.",
  },
  {
    id: "4",
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept M-Pesa, card payments, and bank transfer. All prices are shown in Kenyan Shillings (KES).",
  },
  {
    id: "5",
    category: "Payments",
    question: "When will I be charged?",
    answer:
      "Payment is collected when you confirm your booking. You’ll get a receipt by email once the payment succeeds.",
  },
  {
    id: "6",
    category: "Trails",
    question: "Are the hikes suitable for beginners?",
    answer:
      "Yes. We offer easy, moderate, and challenging trails. Each trail page shows difficulty, distance, and estimated duration so you can choose what fits your fitness level.",
  },
  {
    id: "7",
    category: "Trails",
    question: "Do you provide guides?",
    answer:
      "All group expeditions include experienced guides. Private or self-guided options may be available on selected trails—check the trail details when booking.",
  },
  {
    id: "8",
    category: "Merchandise",
    question: "How long does merchandise delivery take?",
    answer:
      "Within Nairobi, delivery usually takes 1–3 business days. Other regions in Kenya typically take 3–7 business days. You’ll get tracking details after dispatch.",
  },
  {
    id: "9",
    category: "Merchandise",
    question: "Can I return a product?",
    answer:
      "Unused items in original condition can be returned within 7 days of delivery. Printed or personalized items may not be eligible—contact us if you’re unsure.",
  },
  {
    id: "10",
    category: "Account",
    question: "Do I need an account to book?",
    answer:
      "You can browse freely. To book and manage reservations, you’ll need a simple account so we can save your details and send confirmations.",
  },
  {
    id: "11",
    category: "Account",
    question: "How do I save trails or products I like?",
    answer:
      "Sign in and tap the heart icon on any trail or merchandise item. You’ll find everything later on your Favorites page.",
  },
  {
    id: "12",
    category: "General",
    question: "How can I contact Trails & Memoirs?",
    answer:
      "Use the Contact Us page, email hello@trailsandmemoirs.com, or call +254 700 000 000. We usually respond within one business day.",
  },
];

const categories = [
  "All",
  "Bookings",
  "Payments",
  "Trails",
  "Merchandise",
  "Account",
  "General",
];

const topics = [
  {
    title: "Bookings",
    description: "Reserve, cancel, or reschedule a hike",
    icon: Calendar,
  },
  {
    title: "Trails",
    description: "Difficulty, guides, and what to expect",
    icon: MapPin,
  },
  {
    title: "Payments",
    description: "M-Pesa, cards, and refunds",
    icon: CreditCard,
  },
  {
    title: "Merchandise",
    description: "Orders, delivery, and returns",
    icon: Package,
  },
];

export default function FaqsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>("1");

  const filtered = faqs.filter((faq) => {
    const matchesCategory = category === "All" || faq.category === category;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h1>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know about hikes, bookings, and merchandise.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 pl-9"
          />
        </div>

        {/* Topic cards */}
        <div className="mb-10 grid gap-3 sm:grid-cols-2">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <button
                key={topic.title}
                type="button"
                onClick={() => setCategory(topic.title)}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/40"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {topic.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {topic.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Category chips */}
        <div className="mb-6 flex flex-wrap gap-2">
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

        {/* FAQ list */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {filtered.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-muted-foreground">
              No questions match your search. Try different keywords or{" "}
              <Link
                href="/contact"
                className="text-primary underline-offset-4 hover:underline"
              >
                contact us
              </Link>
              .
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <li key={faq.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
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
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Still need help */}
        <div className="mt-12 rounded-xl border border-border bg-card p-6 text-center sm:p-8">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Still have a question?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We’re happy to help with bookings, trails, or orders.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button className="gap-2 ">
              <Link href="/contact" className="flex items-center gap-4">
                <Mail className="h-4 w-4" />
                Contact us
              </Link>
            </Button>
            <Button variant="outline" className="gap-2">
              <Link href="/expeditions" className="flex items-center gap-4">
                <MapPin className="h-4 w-4" />
                Browse trails
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
