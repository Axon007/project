import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import FAQItem from './FAQItem';

const faqs = [
  {
    question: "What is your typical response time?",
    answer: "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend using our live chat feature for faster assistance."
  },
  {
    question: "How can I schedule a consultation?",
    answer: "You can schedule a consultation by filling out our contact form, calling our office directly, or using the live chat feature. One of our team members will get back to you to arrange a time that works for you."
  },
  {
    question: "Do you provide support outside of business hours?",
    answer: "While our office is open Monday through Friday from 9 AM to 6 PM, we provide emergency technical support for existing clients 24/7. For non-emergency inquiries outside business hours, please submit a request through our contact form."
  },
  {
    question: "How detailed should my project information be?",
    answer: "The more details you can provide about your project, the better we can understand your needs. Include information about your goals, timeline, budget, and any specific requirements. However, we understand if you're in the early stages, and we're happy to help you refine your vision."
  },
  {
    question: "Can we meet in person to discuss our project?",
    answer: "Yes, we welcome in-person meetings at our office. Please schedule an appointment in advance so we can ensure the right team members are available to discuss your specific project needs."
  }
];

const FAQSection = () => {
  const [visibleFaqs, setVisibleFaqs] = useState([]);
  
  useEffect(() => {
    // Start with first 2 FAQs visible immediately
    setVisibleFaqs(faqs.slice(0, 2));
    
    // Load the rest after a slight delay to optimize initial load
    const timer = setTimeout(() => {
      setVisibleFaqs(faqs);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about contacting us and our response time."
        />
        
        <div className="mt-12">
          {visibleFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 