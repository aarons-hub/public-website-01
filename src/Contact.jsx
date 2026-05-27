import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

function Contact() {
  const form = useRef();
  const contactRef = useRef();
  const [done, setDone] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_g21pr8h", "template_4m4a8ys", form.current, {
        publicKey: "WEnSV56Aows6oYiBB",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setDone(true);
          toast.success("Message sent successfully!");
          form.current.reset();

          setTimeout(() => setDone(false), 5000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send message. Try again later.");
        },
      );
  };

  return (
    <section className="contact">
      <div className="col left">
        <h1 className="lg-heading">
          Get in <span>touch.</span>
        </h1>
        <p className="contact-subheading">
          Have a project in mind? We'd love to hear from you! Whether you have
          questions, want to discuss a potential collaboration, or just want to
          say hello, feel free to reach out. Our team is here to help and
          provide you with the best solutions for your design needs.
        </p>
      </div>
      <div className="col right">
        <div className="formwrapper">
          <form ref={form} onSubmit={sendEmail}>
            <div className="formgroup">
              <label htmlFor="inputName" className="form-label">
                Name <span className="req-symbol">*</span>
              </label>
              <input
                placeholder="Your full name"
                type="text"
                name="from_name"
                className="form-control"
                id="inputName"
                required
              />

              <label htmlFor="inputEmail" className="form-label">
                Email <span className="req-symbol">*</span>
              </label>
              <input
                placeholder="Your email address"
                type="email"
                name="from_email"
                className="form-control"
                id="inputEmail"
                required
              />

              <label htmlFor="inputPhone" className="form-label">
                Phone <span className="req-symbol">*</span>
              </label>
              <input
                placeholder="Your phone number"
                type="tel"
                name="from_phone"
                className="form-control"
                id="inputPhone"
                required
              />

              <label htmlFor="inputSubject" className="form-label">
                Subject
              </label>
              <input
                placeholder="Subject"
                type="text"
                name="subject"
                className="form-control"
                id="inputSubject"
              />

              <label htmlFor="inputMessage" className="form-label">
                Message <span className="req-symbol">*</span>
              </label>
              <textarea
                placeholder="Type your message..."
                type="text"
                name="message"
                className="form-control message align-self-stretch"
                id="inputMessage"
              />
              <button type="submit" className="btn contact-btn" disabled={done}>
                {done ? "Sent" : "Submit"}
              </button>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
