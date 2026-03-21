import "./ContactInfoSection.css";

const items = [
  {
    icon: "📍",
    title: "Address",
    desc: "Trivandrum, Kerala, India"
  },
  {
    icon: "✉️",
    title: "Email",
    desc: "support@gomelcars.com"
  },
  {
    icon: "📞",
    title: "Phone",
    desc: "+91 98765 43210"
  },
  {
    icon: "⏰",
    title: "Working Hours",
    desc: "Mon - Sun : 9 AM - 10 PM"
  }
];

function ContactInfoSection() {
  return (
    <div className="contact-wrapper">

      <h2>
        Let us <span>help</span> you
      </h2>

      <div className="contact-grid">

        {items.map((item, i) => (
          <div className="contact-card" key={i}>

            {/* ICON */}
            <div className="contact-icon">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3>{item.title}</h3>

            {/* DESC */}
            <p>{item.desc}</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ContactInfoSection;