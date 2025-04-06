import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../features/home/components";
import AlertDialog from "../features/common/AlertDialog";

export default function Contact() {
  const [messageSent, setMessageSent] = useState(false);
  const [messageNotSent, setMessageNotSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const refForm = useRef();

  // the handleSubmit() in the form is giving us 2 parameters: data and event. So, we have to inlcude both the parameters to use the event as e.preventDefault(), otherwise, the event will be recognized as data of the form.
  const sendEmail = (data, e) => {
    e.preventDefault();
    // prettier-ignore
    emailjs.sendForm('service_u9bvfxr', 'template_4k3tk9u', refForm.current, 'qrslYH8TPe8t_5ymc')
      .then(
        () => {
          setMessageSent(true);
          window.location.reload(false);
        },
        (error) => {
          setMessageNotSent(true);
          console.log(error)
        }
      );
  };

  return (
    <section className="max-container padding-x py-10 h-screen flex flex-col">
      {messageSent && (
        <AlertDialog
          isOpen={true}
          message="Your message has successfully been sent!"
          onClose={() => setMessageSent(false)}
          primaryButtonText="Home"
          redirectPath={"/"}
        />
      )}
      {messageNotSent && (
        <AlertDialog
          isOpen={true}
          message="Your message could not be sent! Sorry for the inconvenience. Please try later."
          onClose={() => setMessageSent(false)}
          primaryButtonText="Home"
          redirectPath={"/"}
        />
      )}
      <div className="flex flex-col items-center gap-5 mb-6">
        <h2 className="text-4xl font-palanquin font-bold">
          Meet the <span className="text-coral-red">Developer</span>
        </h2>
        <p className="lg:max-w-3xl -mt-2 mb-2 font-montserrat text-slate-gray text-center">
          Want to connect with the mind behind this website? Fill out the form
          below to reach out. Whether it's feedback, collaboration, or just a
          friendly hello, I'd love to hear from you!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 overflow-hidden">
        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="aspect-square h-[450px] w-[450px] overflow-hidden rounded-xl">
            <img
              alt="Developer Contact"
              src="/sek c photu.png"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        <div className="lg:w-1/2 flex items-start justify-center  ">
          <form
            ref={refForm}
            onSubmit={handleSubmit(sendEmail)}
            className="flex flex-col gap-4 w-full"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-montserrat font-medium text-slate-gray"
              >
                Your Name
              </label>
              <input
                id="name"
                className="p-3 border border-slate-gray rounded-xl font-montserrat text-slate-gray"
                type="text"
                placeholder="NAME"
                {...register("name", { required: true, maxLength: 100 })}
              />
              {errors.name && (
                <p className="text-coral-red mt-1 font-montserrat">
                  {errors.name.type === "required" && "This field is required"}
                  {errors.name.type === "maxlength" &&
                    "Max length is 100 char."}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-montserrat font-medium text-slate-gray"
              >
                Your Email
              </label>
              <input
                id="email"
                className="p-3 border border-slate-gray rounded-xl font-montserrat text-slate-gray"
                type="text"
                placeholder="EMAIL"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9,-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <p className="text-coral-red mt-1 font-montserrat">
                  {errors.email.type === "required" && "This field is required"}
                  {errors.email.type === "pattern" && "Invalid email address"}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-montserrat font-medium text-slate-gray"
              >
                Your Message
              </label>
              <textarea
                id="message"
                className="p-3 border border-slate-gray rounded-xl font-montserrat text-slate-gray resize-none"
                type="text"
                placeholder="MESSAGE"
                rows="4"
                {...register("message", { required: true, maxLength: 2000 })}
              />
              {errors.message && (
                <p className="text-coral-red mt-1 font-montserrat">
                  {errors.message.type === "required" &&
                    "This field is required"}
                  {errors.message.type === "maxlength" &&
                    "Max length is 2000 char."}
                </p>
              )}
            </div>

            <div className="mt-6 self-end">
              <Button label="Send Message" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
