Six Star Rentals — static package for IIS
==========================================

Contents
  index.html                                            Home page
  samsung-galaxy-z-flip5-with-premium-audio-bundle.html  Product page
  css/styles.css                                         All page styling (no inline styles)
  js/main.js                                              Burger menu, mega menu, mobile accordion,
                                                           get-preapproved quiz, product gallery,
                                                           spec tabs, term/cycle pricing, sticky bar
  assets/images/*                                        Locally hosted photos
  assets/video/hero.mp4                                   Home page hero video
  web.config                                              IIS default document + webp/mp4 MIME types

Deploy
  1. Copy this whole folder into the IIS site's physical path (e.g. C:\inetpub\wwwroot\sixstar).
  2. Confirm the site's app pool serves static files (Static Content role service installed).
  3. Browse to index.html — web.config already sets it as the default document.

Notes
  - Product photos and the support-team photo are still loaded from
    sixstarrentals.com.au/content/uploads/... (same domain as the live site) — no change needed
    if this package is deployed to that same domain. Point them at local copies if deploying
    elsewhere.
  - A handful of navigation/category tiles (mega menu, furniture/tech category cards) are
    placeholder image boxes (light grey, labelled) — drop in real photography when available.
  - Both pages share one stylesheet and one script, so edits to nav/quiz/pricing behaviour only
    need to happen once.
