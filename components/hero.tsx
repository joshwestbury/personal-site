"use client";

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import ScrambleText from "./scramble-text";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container max-w-6xl px-4 md:px-8 py-20 md:py-32">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Available for new opportunities
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              Hi, I'm{" "}
              <ScrambleText
                texts={[
                  "a NetSuite Developer",
                  "a Digital Craftsman",
                  "a Problem Solver",
                  "a Code Enthusiast",
                  "an Integration Developer"
                ]}
                defaultText="Josh Westbury"
                className="gradient-text"
              />
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-3xl leading-relaxed">
              A full-stack developer crafting beautiful, functional digital
              experiences with modern technologies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-xl hover:shadow-2xl hover:shadow-accent/30 hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              View My Work
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-border bg-card hover:bg-secondary rounded-xl transition-all duration-300 font-semibold text-lg hover:border-accent"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex items-center gap-4 pt-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              aria-label="X (formerly Twitter)"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="mailto:hello@example.com"
              className="p-3 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
