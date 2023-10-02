import type { MetaFunction } from "@remix-run/node";

import iconCab from "~/assets/categories_icons/icon-cab.svg";
import iconFullrig from "~/assets/categories_icons/icon-fullrig.svg";
import iconPedal from "~/assets/categories_icons/icon-pedal.svg";
import iconOutboard from "~/assets/categories_icons/icon-outboard.svg";

export const meta: MetaFunction = ({ location }) => {
  const description =
    "AIDA-X Cloud is dedicated to simplifying the process of finding models for AIDA-X. We understand how frustrating it can be to search for hours and come up empty-handed. That's why we've created an extensive platform to share and find models for NAM. Whether you're a seasoned producer or a beginner, our comprehensive collection of models will help you find get the tone you're looking for, from guitar, to outboard studio preamps. In the spirit of NAM's open source philosophy, our aim at AIDA-X is to add value to the life of the musician/products/engineer under the guidance of the following values: Always Free, Always Open, Always Secure, Always Collaborative. It is very important to us that we have a place that we can provide an equitable destination for creating the sound that you, me or anyone is looking for.";

  return {
    title: "Privacy Policy | AIDA-X Cloud",
    description,

    "og:title": "Privacy Policy | AIDA-X Cloud",
    "og:url": `${location.pathname}${location.search}`,
    "og:description": description,
    "twitter:image:alt": description,
  };
};

export default function PrivacyPage() {
  return (
    <div className="text-lg leading-relaxed">
      {/* <div className="flex items-center gap-3 pb-10">
        <img src={iconCab} alt="AIDA-X Amps" />
        <img src={iconPedal} alt="AIDA-X Pedals" />
        <img src={iconFullrig} alt="AIDA-X Full Rigs" />
        <img src={iconOutboard} alt="AIDA-X Outboard Gear" />
      </div> */}
      <h2 className="text-4xl font-satoshi-bold pb-10">Privacy Policy</h2>

      <h3 className="text-3xl font-satoshi-medium pb-10">Data Collection</h3>

      <p className="mb-10">
        a. Personal Information: When you use our Website, we may collect personal information such as your name, email
        address, and other contact details when you create an account or communicate with us.
      </p>
      <p className="mb-10">
        b. Uploaded Model Files: When you upload model files, we may collect and store these files on our servers.
      </p>

      <h3 className="text-3xl font-satoshi-medium pb-10">Use of Data</h3>

      <p className="mb-10">
        a. User Account: We use your personal information to create and manage your user account and to provide customer
        support when needed.
      </p>
      <p className="mb-10">
        b. Model Files: We use uploaded model files to enable their sharing and use on the Website, as well as to
        improve our services and develop new features.
      </p>

      <h3 className="text-3xl font-satoshi-medium pb-10">Data Sharing</h3>
      <p className="mb-10">
        We do not sell or rent your personal information to third parties. However, we may share your information:
      </p>
      <p className="mb-10">a. With service providers who assist in the operation of the Website.</p>
      <p className="mb-10">
        b. To comply with legal obligations, protect our rights, or respond to lawful requests from authorities.
      </p>

      <h3 className="text-3xl font-satoshi-medium pb-10">Data Security</h3>
      <p className="mb-10">
        We implement reasonable security measures to protect your personal information and uploaded model files from
        unauthorized access or disclosure.
      </p>
      <p className="mb-10">a. With service providers who assist in the operation of the Website.</p>

      <h3 className="text-3xl font-satoshi-medium pb-10">Cookies</h3>
      <p className="mb-10">We may use cookies and similar technologies to enhance your experience on our Website.</p>

      <h3 className="text-3xl font-satoshi-medium pb-10">Changes to Privacy Policy</h3>
      <p className="mb-10">We may update this Privacy Policy as needed. Please review it periodically for changes.</p>

      <h3 className="text-3xl font-satoshi-medium pb-10">Contact Us</h3>
      <p className="mb-10">
        If you have any questions or concerns about our Disclaimer or Privacy Policy, please contact us at
        privacy@aida-x.cc.
      </p>
    </div>
  );
}
