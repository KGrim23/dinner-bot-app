import React from "react";

const TermsOfService = () => {
  return (
    <div className="flex flex-col justify-center p-4 text-gray-800">
      <h1 className="text-xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-6">
        Welcome to the Dinner Bot App. By using our services, you agree to the
        following terms. If you do not agree with these terms, please do not use
        our services.
      </p>

      <h2 className="text-lg font-semibold mb-4">1. Acceptance of Terms</h2>
      <p className="mb-6">
        By accessing or using our service, you confirm that you accept these
        terms and agree to comply with them. If you do not agree with any part
        of these terms, you must not use our service.
      </p>

      <h2 className="text-lg font-semibold mb-4">2. Changes to Terms</h2>
      <p className="mb-6">
        We reserve the right to modify these terms at any time. We will notify
        you of any changes by posting the new terms on our website. Your
        continued use of the service after the changes constitute your
        acceptance of the new terms.
      </p>

      <h2 className="text-lg font-semibold mb-4">3. User Responsibilities</h2>
      <p className="mb-6">
        You are responsible for your use of the service and for any content you
        provide. You agree not to engage in any activity that would violate
        these terms, or any applicable laws or regulations.
      </p>

      <h2 className="text-lg font-semibold mb-4">4. Limitation of Liability</h2>
      <p className="mb-6">
        In no event shall Dinner Bot or its affiliates be liable for any direct,
        indirect, incidental, special, consequential, or punitive damages
        arising out of your use of or inability to use the service.
      </p>

      <h2 className="text-lg font-semibold mb-4">5. Governing Law</h2>
      <p className="mb-6">
        These terms shall be governed by and construed in accordance with the
        laws of your jurisdiction. Any disputes arising from these terms will be
        handled in the appropriate courts of your jurisdiction.
      </p>

      <h2 className="text-lg font-semibold mb-4">6. Contact Us</h2>
      <p className="mb-6">
        If you have any questions about these terms, please contact us at
        support@dinnerbot.com.
      </p>

      <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default TermsOfService;
