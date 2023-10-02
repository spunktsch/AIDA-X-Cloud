import type { MetaFunction } from "@remix-run/node";

import iconCab from "~/assets/categories_icons/icon-cab.svg";
import iconFullrig from "~/assets/categories_icons/icon-fullrig.svg";
import iconPedal from "~/assets/categories_icons/icon-pedal.svg";
import iconOutboard from "~/assets/categories_icons/icon-outboard.svg";

export const meta: MetaFunction = ({ location }) => {
  const description =
    "AIDA-X Cloud is dedicated to simplifying the process of finding models for AIDA-X. We understand how frustrating it can be to search for hours and come up empty-handed. That's why we've created an extensive platform to share and find models for NAM. Whether you're a seasoned producer or a beginner, our comprehensive collection of models will help you find get the tone you're looking for, from guitar, to outboard studio preamps. In the spirit of NAM's open source philosophy, our aim at AIDA-X is to add value to the life of the musician/products/engineer under the guidance of the following values: Always Free, Always Open, Always Secure, Always Collaborative. It is very important to us that we have a place that we can provide an equitable destination for creating the sound that you, me or anyone is looking for.";

  return {
    title: "Disclaimer | AIDA-X Cloud",
    description,

    "og:title": "Disclaimer | AIDA-X Cloud",
    "og:url": `${location.pathname}${location.search}`,
    "og:description": description,
    "twitter:image:alt": description,
  };
};

export default function DisclaimerPage() {
  return (
    <div className="text-lg leading-relaxed">
      {/* <div className="flex items-center gap-3 pb-10">
        <img src={iconCab} alt="AIDA-X Amps" />
        <img src={iconPedal} alt="AIDA-X Pedals" />
        <img src={iconFullrig} alt="AIDA-X Full Rigs" />
        <img src={iconOutboard} alt="AIDA-X Outboard Gear" />
      </div> */}
      <h2 className="text-4xl font-satoshi-bold pb-10">Disclaimer</h2>

      <p className="mb-10">
        The website AIDA-X Cloud (the "Website") provides a platform for users to upload and share model files for
        AIDA-X. By using this Website, you acknowledge and agree to the following:
      </p>
      <h3 className="text-3xl font-satoshi-medium pb-10">Accuracy and Responsibility</h3>

      <p className="pb-10">
        The model files shared on this Website are provided by users and are not verified or endorsed by AIDA DSP (the
        "Company"). The Company does not guarantee the accuracy, functionality, or safety of any model file shared on
        this Website. Users are solely responsible for the use and consequences of using these model files.
      </p>

      <h3 className="text-3xl font-satoshi-medium pb-10">Warranty and Liability</h3>

      <p className="pb-10">
        The model files shared on this Website are provided by users and are not verified or endorsed by AIDA DSP (the
        "Company"). The Company does not guarantee the accuracy, functionality, or safety of any model file shared on
        this Website. Users are solely responsible for the use and consequences of using these model files.
      </p>

      <h3 className="text-3xl font-satoshi-medium pb-10">Intellectual Property</h3>

      <p className="pb-10">
        Users uploading model files to this Website retain ownership of their intellectual property. By uploading model
        files, users grant the Company a non-exclusive, worldwide, royalty-free license to use, modify, and distribute
        the files for the purpose of operating the Website and providing its services.
      </p>

      <h3 className="text-3xl font-satoshi-medium pb-10">Compliance with Laws</h3>

      <p className="pb-10">
        Users are responsible for ensuring that their uploaded model files comply with all applicable laws, including
        copyright and intellectual property rights.
      </p>

    </div>
  );
}
