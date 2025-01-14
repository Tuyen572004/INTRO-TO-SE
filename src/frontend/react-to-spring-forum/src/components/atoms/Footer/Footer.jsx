import React from "react";

function Footer() {
  return (
    <footer class="bg-dark text-light pt-5 pb-3">
      <div class="container">
        <div class="row">
          <div class="col-md-3 mb-4">
            <h5 class="text-uppercase">About the site</h5>
            <p>
              Connecting people and fostering communities worldwide. Your space
              to share and inspire.
            </p>
            <a href="#" class="text-light text-decoration-none">
              Learn more
            </a>
          </div>

          <div class="col-md-3 mb-4">
            <h5 class="text-uppercase">About us</h5>
            <p>React To Spring Team</p>
            <p>
              University of Science, Viet Nam National University Ho Chi Minh
              City
            </p>
            <a href="#" class="text-light text-decoration-none">
              Learn more
            </a>
          </div>

          <div class="col-md-3 mb-4">
            <h5 class="text-uppercase">Resources</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#" class="text-light text-decoration-none">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" class="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" class="text-light text-decoration-none">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" class="text-light text-decoration-none">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div class="col-md-3 mb-4">
            <h5 class="text-uppercase">Contact Us</h5>
            <p>Email: support@reacttospring.com</p>
            <p>Phone: +84 (000) 123-4567</p>
            <div class="social-icons mt-2">
              <a href="#" class="text-light me-3">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="text-light me-3">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="text-light me-3">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="text-light">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <hr class="border-light" />
        <div class="text-center mt-3">
          <p class="mb-0">&copy; 2025 React To Spring. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
