const Policy = () => {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '20px' }}>
      {/* Title & Updated Time */}
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-4">
        Last updated: February 22, 2025
      </p>

      {/* Body Content */}
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          Thank you for using our Chrome Extension (“the Extension”). This
          Privacy Policy explains how we collect, use, and protect information
          obtained from users (“you” or “user”) when using our Extension.
        </p>

        <h2 className="text-lg font-semibold">1. Information We Collect</h2>
        <p>
          The Extension may access the “LEETCODE_SESSION” cookie from your
          browser to authenticate and request LeetCode problem data on your
          behalf. We do not collect or store your name, email address, or any
          other personal identification details.
        </p>
        <p>
          This session cookie is used only locally within the Extension to fetch
          and synchronize your problem-solving data from LeetCode. We do not
          send this cookie or any personally identifiable information to any
          external servers.
        </p>

        <h2 className="text-lg font-semibold">2. How We Use the Information</h2>
        <p>
          The LEETCODE_SESSION cookie is solely used to retrieve your
          problem-solving records, difficulties, and statuses from LeetCode. All
          processing happens within your browser. The Extension does not
          transmit, store, or share this cookie or any other personal data with
          our own servers or third parties.
        </p>

        <h2 className="text-lg font-semibold">
          3. Data Sharing and Disclosure
        </h2>
        <p>
          We do not sell, trade, or otherwise transfer your session cookie or
          any other personal information to external parties. The Extension
          operates entirely within your local browser environment.
        </p>

        <h2 className="text-lg font-semibold">4. Data Security</h2>
        <p>
          Because no personal data is transferred to our servers, we do not
          retain or secure such data externally. The session cookie is handled
          by your local browser according to your browser’s security model.
        </p>

        <h2 className="text-lg font-semibold">5. Your Choices</h2>
        <p>
          You can remove or disable the Extension at any time. You can also
          clear your cookies within your browser settings if you wish to sign
          out of LeetCode or remove any saved session tokens.
        </p>

        <h2 className="text-lg font-semibold">
          6. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We encourage you
          to review this page periodically for any changes. Your continued use
          of the Extension after any modifications indicates your acceptance of
          the updated terms.
        </p>
      </div>
    </main>
  )
}

export default Policy
