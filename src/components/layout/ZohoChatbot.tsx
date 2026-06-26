"use client";

import { useEffect } from "react";

export default function ZohoChatbot() {
  useEffect(() => {
    // Zoho SalesIQ Chat Widget Integration
    // Replace 'YOUR_WIDGET_ID' with your actual Zoho widget ID
    const loadZohoChat = () => {
      if (typeof window !== "undefined") {
        (window as any).$zoho = (window as any).$zoho || {};
        (window as any).$zoho.salesiq = (window as any).$zoho.salesiq || {
          widgetcode: "YOUR_WIDGET_ID",
          values: {},
          ready: function () {},
        };

        const script = document.createElement("script");
        script.id = "zsiqscript";
        script.src = "https://salesiq.zoho.com/widget";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    loadZohoChat();

    return () => {
      // Cleanup if needed
      const script = document.getElementById("zsiqscript");
      if (script) {
        script.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}
