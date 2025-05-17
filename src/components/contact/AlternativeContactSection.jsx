import { Phone, MessageSquare, Mail } from "lucide-react";
import SectionHeader from './SectionHeader';
import ContactCard from './ContactCard';

const AlternativeContactSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Get in Touch"
          subtitle="We're here to help. Contact us through these channels or visit our office."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <ContactCard
            icon={<Phone className="w-6 h-6" />}
            title="Call Us"
            info="Our team is available Mon-Fri, 9am-6pm"
            link="tel:+12345678901"
            linkText="Call now"
          />
          
          <ContactCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Live Chat"
            info="Chat with our support team in real-time"
            link="#"
            linkText="Start chat"
          />
          
          <ContactCard
            icon={<Mail className="w-6 h-6" />}
            title="Email Us"
            info="We'll respond to your email within 24 hours"
            link="mailto:support@jasontechsolutions.com"
            linkText="Send email"
          />
        </div>
      </div>
    </section>
  );
};

export default AlternativeContactSection; 