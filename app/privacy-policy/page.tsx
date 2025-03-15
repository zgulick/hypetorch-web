// app/privacy-policy/page.tsx
import Navbar from "@/app/Navbar";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Introduction</h2>
            <p>
              HypeTorch (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Cookies</h2>
            <p>
              Our website uses only essential cookies that are necessary for the website to function properly. 
              These cookies do not track you, collect your personal information, or remember you when you return to our website.
            </p>
            <p className="mt-2">
              We do not use any cookies for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Analytics or tracking purposes</li>
              <li>Marketing or advertising</li>
              <li>Personalization of content</li>
              <li>Remembering your preferences beyond your current visit</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Your Data Rights</h2>
            <p>
              Under GDPR, you have various rights regarding your personal data. Since we only use essential cookies 
              and do not collect personal data, many of these rights may not apply to your use of our website.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:hypetorch@gmail.com" className="text-orange-400 hover:underline">
                hypetorch@gmail.com
              </a>
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The updated version will be indicated by an updated 
              &quot;Last updated&quot; date and the updated version will be effective as soon as it is accessible.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Last updated: March 15, 2025
            </p>
          </section>
        </div>
        
        <div className="mt-12 pt-4 border-t border-gray-800">
          <Link href="/" className="text-orange-400 hover:underline flex items-center gap-2">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}