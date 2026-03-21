import { useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import "./Hero.css";

function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});

    let slowing = false;

    const smoothSlowDown = () => {
      let start = null;
      const duration = 2000;
      const minRate = 0.5;

      let currentRate = 1;

      const animate = (timestamp) => {
        if (!start) start = timestamp;

        const progress = Math.min((timestamp - start) / duration, 1);

        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const targetRate = 1 - (1 - minRate) * eased;

        currentRate += (targetRate - currentRate) * 0.08;

        video.playbackRate = currentRate;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          video.playbackRate = minRate;
        }
      };

      requestAnimationFrame(animate);
    };

    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;

      if (remaining <= 2 && !slowing) {
        slowing = true;
        smoothSlowDown();
      }
    };

    const handleEnd = () => {
      video.pause();
      video.playbackRate = 1;
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnd);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnd);
    };
  }, []);

  return (
    <section className="hero">

      <video
        ref={videoRef}
        className="hero-video"
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <h1>
          Rent Smart. <span>Drive Easy.</span>
        </h1>

        <p>
          Premium self-drive cars for every journey
        </p>

        <div className="hero-search">
          <SearchBar variant="hero" />
        </div>

      </div>

    </section>
  );
}

export default Hero;