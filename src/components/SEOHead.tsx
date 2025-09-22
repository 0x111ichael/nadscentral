import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  canonical: string;
}

const pageMeta: Record<string, PageMeta> = {
  "/": {
    title: "1 Million Nads Club | Exclusive Cosmic Membership Portal",
    description: "Enter the exclusive cosmos of the 1 Million Nads Club. NFT-gated membership portal on Monad Testnet for verified holders only.",
    keywords: "NFT, Monad, blockchain, exclusive club, cosmic, membership, testnet, Web3",
    ogTitle: "1 Million Nads Club | The Gateway Awaits",
    ogDescription: "Enter the exclusive cosmos of the 1 Million Nads Club. NFT-gated membership portal on Monad Testnet.",
    canonical: "/"
  },
  "/members": {
    title: "Members Area | 1 Million Nads Club",
    description: "Exclusive member dashboard for verified Nads NFT holders. Access cosmic insights, community feed, and member-only features.",
    keywords: "members, dashboard, NFT holders, cosmic insights, community, exclusive access",
    ogTitle: "Members Area | 1 Million Nads Club",
    ogDescription: "Exclusive member dashboard for verified Nads NFT holders on Monad Testnet.",
    canonical: "/members"
  },
  "/locked": {
    title: "Access Denied | 1 Million Nads Club",
    description: "NFT verification required. Own a Nads NFT on Monad Testnet to access the exclusive 1 Million Nads Club membership portal.",
    keywords: "access denied, NFT required, verification, Monad testnet, exclusive membership",
    ogTitle: "Access Denied | 1 Million Nads Club",
    ogDescription: "NFT verification required to access the exclusive cosmic membership portal.",
    canonical: "/locked"
  }
};

export default function SEOHead() {
  const location = useLocation();
  const currentPath = location.pathname;
  const meta = pageMeta[currentPath] || pageMeta["/"];

  useEffect(() => {
    // Update document title
    document.title = meta.title;

    // Update meta tags
    updateMetaTag("description", meta.description);
    updateMetaTag("keywords", meta.keywords);
    
    // Update Open Graph tags
    updateMetaTag("og:title", meta.ogTitle, "property");
    updateMetaTag("og:description", meta.ogDescription, "property");
    updateMetaTag("og:url", `https://1millionnadsclub.com${meta.canonical}`, "property");
    updateMetaTag("og:type", "website", "property");
    
    // Update Twitter tags
    updateMetaTag("twitter:title", meta.ogTitle);
    updateMetaTag("twitter:description", meta.ogDescription);
    
    // Update canonical link
    updateCanonicalLink(`https://1millionnadsclub.com${meta.canonical}`);

    // Add structured data
    addStructuredData();

  }, [currentPath, meta]);

  return null;
}

function updateMetaTag(name: string, content: string, attribute: string = "name") {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.content = content;
}

function updateCanonicalLink(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  
  link.href = href;
}

function addStructuredData() {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "1 Million Nads Club",
    "description": "Exclusive NFT-gated membership club on Monad Testnet",
    "url": "https://1millionnadsclub.com",
    "sameAs": [],
    "foundingDate": "2024",
    "memberOf": {
      "@type": "Organization",
      "name": "Monad Ecosystem"
    },
    "offers": {
      "@type": "Offer",
      "name": "Exclusive Membership Access",
      "description": "Access to exclusive cosmic membership portal for verified NFT holders"
    }
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}