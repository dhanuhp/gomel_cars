import { useState } from "react";
import "./FAQ.css";

function FAQ() {

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    "What is the minimum age to rent a car?",
    "Can I rent without driving license?",
    "What documents are required?",
    "How does pricing work?",
    "Which option is cheapest?"
  ];

  return (
    <div className="faq-container">

      <h2>Planning Your Car Rental? Check Our FAQs</h2>

      <div className="faq-grid">

        {faqs.map((q, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? "active" : ""}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >

            <div className="faq-question">
              {q}
              <span className="arrow">
                {openIndex === i ? "▲" : "▼"}
              </span>
            </div>

            {openIndex === i && (
              <p className="faq-answer">
                This is a sample answer. Replace with real content.
              </p>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default FAQ;