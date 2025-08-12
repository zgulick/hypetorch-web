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
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Data Controller</h2>
            <p>
              HypeTorch ("we", "our", or "us") is the data controller responsible for your personal data. 
              We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR) 
              and other applicable privacy laws.
            </p>
            <div className="mt-3 p-3 bg-gray-800 rounded border-l-4 border-orange-500">
              <p className="text-sm">
                <strong>Contact:</strong> hypetorch@gmail.com<br/>
                <strong>Legal Basis:</strong> Legitimate interest and consent
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. What Data We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-2">Personal Data from Contact Forms:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name and email address</li>
                  <li>Company name and job title</li>
                  <li>Message content and inquiry details</li>
                  <li>IP address and timestamp (automatically collected)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Technical Data:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Browser type and version</li>
                  <li>Device information and screen size</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referral source (how you found our website)</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Legal Basis for Processing</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-800 rounded">
                <h4 className="font-medium text-orange-400">Contact Form Data</h4>
                <p className="text-sm mt-1">Processed based on your explicit consent to respond to your inquiries and provide requested services.</p>
              </div>
              <div className="p-3 bg-gray-800 rounded">
                <h4 className="font-medium text-orange-400">Technical Data</h4>
                <p className="text-sm mt-1">Processed based on legitimate interest to improve website functionality and user experience.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send you information about our services (with consent)</li>
              <li>To improve our website and user experience</li>
              <li>To comply with legal obligations</li>
              <li>To detect and prevent fraud or security issues</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
            <div className="space-y-3">
              <p>We retain your personal data only as long as necessary:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Contact inquiries:</strong> 3 years or until resolved</li>
                <li><strong>Technical data:</strong> 12 months maximum</li>
                <li><strong>Marketing data:</strong> Until you withdraw consent</li>
              </ul>
              <p className="text-sm text-orange-400 mt-3">
                You can request deletion of your data at any time by contacting us.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Cookies and Tracking</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded border border-gray-700">
                <h3 className="font-medium text-green-400 mb-2">🍪 Cookie Consent Management</h3>
                <p className="text-sm">
                  We use a cookie consent banner that allows you to choose which types of cookies to accept. 
                  Your preferences are stored locally in your browser.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-green-900/30 border border-green-700 rounded">
                  <h4 className="font-medium text-green-400">Essential Cookies</h4>
                  <p className="text-xs mt-1">Always active. Required for basic website functionality.</p>
                </div>
                <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
                  <h4 className="font-medium text-blue-400">Analytics Cookies</h4>
                  <p className="text-xs mt-1">Help us understand website usage (requires consent).</p>
                </div>
                <div className="p-3 bg-purple-900/30 border border-purple-700 rounded">
                  <h4 className="font-medium text-purple-400">Marketing Cookies</h4>
                  <p className="text-xs mt-1">Used for personalized advertising (requires consent).</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-400">
                You can change your cookie preferences at any time by clearing your browser data and revisiting our site.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your GDPR Rights</h2>
            <div className="space-y-3">
              <p>Under GDPR, you have the following rights regarding your personal data:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-800 rounded border-l-4 border-orange-500">
                  <h4 className="font-medium text-orange-400">Right of Access</h4>
                  <p className="text-xs mt-1">Request a copy of the personal data we hold about you.</p>
                </div>
                <div className="p-3 bg-gray-800 rounded border-l-4 border-orange-500">
                  <h4 className="font-medium text-orange-400">Right to Rectification</h4>
                  <p className="text-xs mt-1">Request correction of inaccurate or incomplete data.</p>
                </div>
                <div className="p-3 bg-gray-800 rounded border-l-4 border-orange-500">
                  <h4 className="font-medium text-orange-400">Right to Erasure</h4>
                  <p className="text-xs mt-1">Request deletion of your personal data ("right to be forgotten").</p>
                </div>
                <div className="p-3 bg-gray-800 rounded border-l-4 border-orange-500">
                  <h4 className="font-medium text-orange-400">Right to Portability</h4>
                  <p className="text-xs mt-1">Request transfer of your data to another service provider.</p>
                </div>
                <div className="p-3 bg-gray-800 rounded border-l-4 border-orange-500">
                  <h4 className="font-medium text-orange-400">Right to Object</h4>
                  <p className="text-xs mt-1">Object to processing based on legitimate interests.</p>
                </div>
                <div className="p-3 bg-gray-800 rounded border-l-4 border-orange-500">
                  <h4 className="font-medium text-orange-400">Right to Restrict</h4>
                  <p className="text-xs mt-1">Request limitation of processing in certain circumstances.</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-orange-900/30 border border-orange-700 rounded">
                <p className="text-sm">
                  <strong>How to Exercise Your Rights:</strong> Send an email to{" "}
                  <a href="mailto:hypetorch@gmail.com" className="text-orange-400 hover:underline">
                    hypetorch@gmail.com
                  </a>{" "}
                  with "Data Request" in the subject line. We will respond within 30 days.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Data Sharing and Transfers</h2>
            <div className="space-y-3">
              <p>We do not sell or rent your personal data to third parties. We may share data only in these limited circumstances:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>With service providers who help us operate our website (with appropriate contracts)</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In the event of a business merger or acquisition (with notice to affected users)</li>
              </ul>
              <p className="text-sm text-orange-400 mt-3">
                Any international transfers are protected by appropriate safeguards as required by GDPR.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Data Security</h2>
            <div className="p-4 bg-gray-800 rounded border border-gray-700">
              <p className="mb-3">We implement appropriate technical and organizational measures to protect your data:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>HTTPS encryption for all data transmission</li>
                <li>Access controls and authentication systems</li>
                <li>Regular security audits and updates</li>
                <li>Staff training on data protection principles</li>
                <li>Incident response procedures for data breaches</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact and Complaints</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded border border-gray-700">
                <h3 className="font-medium text-orange-400 mb-2">Data Protection Contact</h3>
                <p className="text-sm">
                  For any privacy-related questions or to exercise your rights:
                </p>
                <p className="text-sm mt-2">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:hypetorch@gmail.com" className="text-orange-400 hover:underline">
                    hypetorch@gmail.com
                  </a>
                </p>
                <p className="text-sm">
                  <strong>Subject Line:</strong> "Data Protection Request"
                </p>
              </div>
              
              <div className="p-4 bg-blue-900/30 border border-blue-700 rounded">
                <h3 className="font-medium text-blue-400 mb-2">Right to Lodge a Complaint</h3>
                <p className="text-sm">
                  If you believe we have not handled your personal data properly, you have the right to lodge a complaint 
                  with your local data protection authority. In the EU, you can find your data protection authority{" "}
                  <a href="https://edpb.europa.eu/about-edpb/board/members_en" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    here
                  </a>.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Policy Updates</h2>
            <div className="space-y-3">
              <p>
                We may update this privacy policy to reflect changes in our practices or legal requirements. 
                We will notify you of significant changes by:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Updating the "Last updated" date below</li>
                <li>Displaying a notice on our website</li>
                <li>Sending an email notification (if we have your contact information)</li>
              </ul>
              <p className="text-sm text-orange-400">
                We encourage you to review this policy periodically to stay informed about how we protect your data.
              </p>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-700 rounded">
              <p className="text-sm text-center">
                <strong className="text-orange-400">Last updated:</strong> August 12, 2025<br/>
                <strong className="text-orange-400">Version:</strong> 2.0 (GDPR Compliance Update)
              </p>
            </div>
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