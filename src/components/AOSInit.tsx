"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSInit() {
  useEffect(() => {
    // Initializing AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
      delay: 50,
      offset: 100,
      mirror: false,
    });

    // Refreshing AOS to catch dynamic content
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
