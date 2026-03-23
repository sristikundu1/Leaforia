import React from "react";
import toast from "react-hot-toast";

const Consultation = () => {
  const handleBooking = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    // show alert
    toast.success(
      `Thank you, ${name}! Your consultation request has been submitted.`,
      {
        icon: "🎉",
        style: {
          borderRadius: "10px",
          background: "#034e3b",
          color: "#fff",
        },
      },
    );

    // reset form
    e.target.reset();
  };
  return (
    <div className="grid grid-cols-12 gap-6 my-24">
      <div className="col-span-7">
        <div className="text-center mb-10">
          <h1 className="font-bold text-4xl text-primary mb-3">
            Book a Consultation
          </h1>
          <p className="text-[#716F6B] font-medium  text-lg  ">
            Schedule a free consultation with our expert. Fill in your details
            and we will contact you soon.
          </p>
        </div>

        <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleBooking} className="fieldset">
              {/* name  */}
              <label className="label text-xl">Name</label>
              <input
                type="text"
                name="name"
                className="input w-full"
                placeholder="Your Name"
                required
              />

              {/* email  */}
              <label className="label text-xl">Email</label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="Your Email"
                required
              />

              {/* topic  */}
              <label className="label text-xl">Topic</label>
              <textarea
                name="message"
                id=""
                cols="30"
                rows="10"
                className="textarea w-full "
                placeholder="Your Message"
              ></textarea>

              <button type="submit" className="btn btn-primary mt-4">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-span-5">
        <img
          className="w-full h-full object-cover rounded-xl shadow-2xl"
          src="https://i.ibb.co.com/JWkXtnqj/portrait-beautiful-female-gardener-standing-greenhouse.jpg"
          alt="consultant"
        />
      </div>
    </div>
  );
};

export default Consultation;
