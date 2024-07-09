import { Avatar, AvatarFallback, AvatarImage } from "@/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4 bg-white text-black">
        <Image src="/s-logo.png" alt="logo" width={100} height={100} />
        <ul className="flex gap-x-8">
          <Link className="hover:text-blue-400" href="/">
            Home
          </Link>
          <Link className="hover:text-blue-400" href="/about">
            About Us
          </Link>
          <Link className="hover:text-blue-400" href="/finance-solutions">
            Finance Solutions
          </Link>
          <Link className="hover:text-blue-400" href="/projects">
            Projects
          </Link>
          <Link className="hover:text-blue-400" href="/tenders">
            Tenders
          </Link>
          <Link className="hover:text-blue-400" href="/careers">
            Careers
          </Link>
          <Link className="hover:text-blue-400" href="/contact">
            Contact
          </Link>
        </ul>

        <div className="flex gap-x-4">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </nav>

      <section className="grid justify-items-center gap-y-4 py-12 bg-blue-500 text-white">
        <h1 className="text-4xl">
          Innovative and Affordable Housing Finance Solutions
        </h1>
        <p>
          Empowering South African Households with Quality Living Environments
        </p>
        <button className="py-2 px-4 bg-orange-400 text-white">Explore</button>
      </section>

      <section>
        <h1>About NHFC</h1>
        <p>
          The National Housing Finance Corporation (NHFC) is dedicated to making
          quality housing accessible and affordable for low to middle income
          South African households. We strive to be a world-class development
          finance institution that delivers innovative and affordable housing
          finance solutions to support the national priority of sustainable
          human settlements.
        </p>
        <button>Learn more about us</button>
      </section>

      <section>
        <h2>Our Purpose, Mission & Values</h2>

        <div>
          <div>
            <h2>Our Purpose</h2>
            <p>
              To make housing and home ownership accessible to more South
              Africans.
            </p>
          </div>
          <div>
            <h2>Our Misson</h2>
            <p>
              To be a world class DFI that leads in the development and funding
              of sustainable human settlements.
            </p>
          </div>
          <div>
            <h2>Our Values</h2>
            <p>
              Excellence, Innovation, Integrity, Partnership, Service Oriented.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>Our Mandate</h2>
        <p>
          The NHFC&apos;s mandate is to facilitate and fund the development of
          sustainable human settlements and to make housing and home ownership
          accessible to all South Africans. We do this by:
        </p>

        <ul>
          <li>Providing wholesale finance and support to intermediaries</li>
          <li>Leveraging private sector funding for housing development</li>
          <li>
            Facilitating increased and sustained lending by financial
            institutions to the affordable housing market
          </li>
          <li>
            Supporting the establishment of new housing intermediaries and
            financing institutions
          </li>
        </ul>
      </section>

      <section>
        <h2>Our Finance Solutions</h2>

        <div>
          <div>
            <h2>Social Housing Finance</h2>
            <p>
              Supporting the development of affordable rental housing for low to
              moderate income households.
            </p>
            <button>Learn More</button>
          </div>
          <div>
            <h2>Private Rental Housing Finance</h2>
            <p>
              Financing solutions for private landlords to develop and maintain
              quality rental properties.
            </p>
            <button>Learn More</button>
          </div>
          <div>
            <h2>Affordable Housing Bridging Finance</h2>
            <p>
              Short-term financing to bridge the gap in affordable housing
              development projects.
            </p>
            <button>Learn More</button>
          </div>
        </div>
      </section>
      <section>
        <h2>Our Projects</h2>

        <div>
          <div>
            <h2>Fleurhof Integrated Housing Development</h2>
            <p>
              A mixed-use development providing over 10,000 housing units in
              Johannesburg.
            </p>
            <button>Learn More</button>
          </div>
          <div>
            <h2>Belhar Social Housing Project</h2>
            <p>
              A social housing initiative delivering 629 units in Cape Town.
            </p>
            <button>Learn More</button>
          </div>
          <div>
            <h2>Westgate Social Housing Project</h2>
            <p>Providing 1,000 affordable rental units in Pietermaritzburg.</p>
            <button>Learn More</button>
          </div>
        </div>
      </section>

      <section>
        <h2>Success Stories</h2>

        <div>
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>{" "}
            <p>
              Thanks to NHFC&apos;s affordable housing finance, I now have a
              place to call home. The process was smooth and the support was
              incredible.
            </p>
            <span>Thabo M., Johannesburg</span>
          </div>
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>{" "}
            <p>
              As a single mother, owning a home seemed impossible. NHFC made it
              a reality for me and my children. I&aspos;m forever grateful.
            </p>
            <span>Nomsa K., Cape Town</span>
          </div>

          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>{" "}
            <p>
              NHFC&apos;s social housing project has given me access to quality,
              affordable housing near my workplace. It&apos;s changed my life.
            </p>
            <span>Sipho N., Durban</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Current Tenders</h2>

        <div>
          <div>
            <h2>Tender NHFC/03/2023</h2>
            <p>Provision of Legal Services</p>
            <button>View Details</button>
          </div>
          <div>
            <h2>Tender NHFC/04/2023</h2>
            <p>Supply and Delivery of Office Furniture</p>
            <button>View Details</button>
          </div>
        </div>
      </section>

      <section>
        <h2>Join our team</h2>
        <p>
          Be part of our mission to transform housing finance in South Africa.
          We offer exciting career opportunities, internship programs, and
          bursaries for deserving students.
        </p>
        <button>View Opportunities</button>
      </section>

      <footer>
        <div>
          <h3>Contact us</h3>
          <ul>
            <li>Phone: +27 11 644 9800</li>
            <li>Email: info@nhfc.co.za</li>
            <li>
              Address: Old Trafford 3, Isle of Houghton, 11 Boundary Road,
              Houghton, 2198
            </li>
          </ul>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li>About Us</li>
            <li>Finance Solutions</li>
            <li>Projects</li>
            <li>Tenders</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h3>Follow us</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
