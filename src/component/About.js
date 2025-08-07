import React from "react";
import UserClass from "./UserClass"; // Import the user profile card

class About extends React.Component {
  render() {
    return (
      <div className="about-container">
        <header className="about-header">
          <h1>About Our Food Delivery Service</h1>
          <p>
            Welcome to the freshest, fastest food delivery experience! We bring your favorite meals right to your doorstep, with quality and care that you can trust. Our dedicated team partners with local restaurants to offer a diverse selection of delicious dishes tailored to your cravings. Whether you're in the mood for a quick snack or a gourmet feast, we've got you covered. Enjoy seamless ordering, real-time tracking, and prompt delivery that fits your schedule. We believe great food brings people together, and we're here to make every meal delightful and hassle-free. Your satisfaction is our priority — fresh ingredients, friendly service, and unbeatable convenience, all at your fingertips.
          </p>
          <h1>Our Founder's</h1>
        </header>

        <section className="about-user-profile">
          <UserClass />
        </section>
        
      </div>
    );
  }
}

export default About;
