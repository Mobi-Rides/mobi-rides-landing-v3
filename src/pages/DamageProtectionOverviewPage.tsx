import React, { useState, useEffect } from "react";
import TermsPopup from "../components/TermsPopup";

const DamageProtectionOverviewPage: React.FC = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/20260305_DAMAGE_PROTECTION_OVERVIEW.md")
      .then((res) => res.text())
      .then(setMarkdown);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Damage Protection Overview</h1>
      <TermsPopup markdown={markdown} triggerLabel="View Full Terms & Conditions" />
      {/* ...rest of the overview content... */}
    </div>
  );
};

export default DamageProtectionOverviewPage;
