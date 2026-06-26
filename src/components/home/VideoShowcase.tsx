"use client";

import { IMAGES } from "@/lib/constants";

export default function VideoShowcase() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl p-px bg-gradient-to-b from-accent/50 to-transparent shadow-[0_0_80px_rgba(201,162,39,0.1)]">
          <div className="rounded-xl overflow-hidden bg-primary-dark">
            <video
              className="w-full h-auto block"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={IMAGES.videoPoster}
            >
              <source src={IMAGES.videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
