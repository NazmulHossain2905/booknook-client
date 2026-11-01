"use client";

import { UserAvatar } from "@/components/shared/book-cover";
import { Container } from "@/components/shared/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { LibraryBig, Quote, Repeat2, Users } from "lucide-react";

const STATS = [
  { icon: LibraryBig, value: "1,200+", label: "books shared by members" },
  { icon: Repeat2, value: "5,400+", label: "borrows & counting" },
  { icon: Users, value: "380", label: "readers in the nook" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Kim",
    role: "Fiction devotee · member since 2024",
    avatar: "https://i.pravatar.cc/160?img=45",
    quote:
      "I found three of my all-time favourite novels through BookNook's shelves. The borrow-then-return rhythm somehow makes reading feel like a shared ritual again.",
  },
  {
    name: "James Whitfield",
    role: "History teacher · member since 2023",
    avatar: "https://i.pravatar.cc/160?img=29",
    quote:
      "My students kept asking where I found these titles. A small library curated by actual readers beats any algorithm — every book on here was loved first.",
  },
  {
    name: "Amara Diallo",
    role: "Bedtime-story mum · member since 2025",
    avatar: "https://i.pravatar.cc/160?img=26",
    quote:
      "We added our daughter's favourite picture book and watched it get borrowed five times in a month. She now checks the 'available' badge like it's her job.",
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Stats + pull quote */}
          <div>
            <SectionHeading
              eyebrow="More than a catalogue"
              title="A Community of Readers"
              description="BookNook is built by the people who borrow from it. Every title was carried in by a neighbour who thought someone else should read it too."
            />

            <Reveal delay={0.1} className="mt-8">
              <dl className="grid grid-cols-3 gap-4">
                {STATS.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-card rounded-xl border p-4 text-center sm:p-5"
                    >
                      <Icon aria-hidden className="text-gold mx-auto size-5" />
                      <dd className="font-display mt-2.5 text-2xl leading-none font-semibold sm:text-3xl">
                        {stat.value}
                      </dd>
                      <dt className="text-muted-foreground mt-2 text-[11px] leading-snug">
                        {stat.label}
                      </dt>
                    </div>
                  );
                })}
              </dl>
            </Reveal>

            <Reveal delay={0.15} className="mt-6">
              <figure className="bg-primary text-primary-foreground relative rounded-2xl p-6 sm:p-8">
                <Quote
                  aria-hidden
                  className="text-gold-soft/50 absolute top-6 right-6 size-8"
                />
                <blockquote className="font-display max-w-md text-xl leading-relaxed sm:text-[1.35rem]">
                  “A library outranks any other one thing a community can do to
                  benefit its people.”
                </blockquote>
                <figcaption className="text-primary-foreground/70 mt-4 text-xs tracking-[0.18em] uppercase">
                  Andrew Carnegie · gilded age library builder
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Testimonials */}
          <div>
            <StaggerGroup className="flex h-full flex-col gap-4">
              {TESTIMONIALS.map((t) => (
                <StaggerItem key={t.name} className="flex-1">
                  <article className="bg-card hover:shadow-primary/5 flex h-full flex-col rounded-2xl border p-6 transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        src={t.avatar}
                        name={t.name}
                        className="size-11"
                      />
                      <div>
                        <h3 className="text-sm font-semibold">{t.name}</h3>
                        <p className="text-muted-foreground text-xs">
                          {t.role}
                        </p>
                      </div>
                      <span
                        aria-label="5 out of 5 stars"
                        className="text-gold ml-auto text-sm tracking-tight"
                        title="5 out of 5 stars"
                      >
                        ★★★★★
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                      “{t.quote}”
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
