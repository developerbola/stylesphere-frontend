import {
  Facebook,
  Instagram,
  Mail,
  MessageSquareText,
  Phone,
  Twitter,
} from "lucide-react";

const CustomerService = () => {
  return (
    <div className="px-6 md:px-10 min-h-screen pt-[85px] flex items-center justify-center">
      <div className="max-w-4xl p-8 flex flex-col gap-6 text-gray-800">
        <h1 className="text-4xl font-bold text-gray-900">Customer Service - Style Sphere</h1>
        <p className="text-lg">
          At <span className="font-semibold">Style Sphere</span>, we are
          committed to providing the best shopping experience for premium{" "}
          <span className="font-medium">shoes, clothing, and watches</span>.
          Whether you need assistance with an order, have product questions, or
          require support, we are here to help.
        </p>

        <div className="p-5 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900">
            How We Can Assist You
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Order tracking and status updates</li>
            <li>Returns and exchanges</li>
            <li>Sizing and product inquiries</li>
            <li>Payment and billing issues</li>
            <li>Shipping and delivery information</li>
            <li>General feedback and suggestions</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
          <p className="flex items-center gap-1">
            <Mail size={20} />
            <strong>Email:</strong> support@stylesphere.com
          </p>
          <p className="flex items-center gap-1">
            <Phone size={20} /> <strong>Phone:</strong> +1 (800) 123-4567
            (Mon-Fri, 9 AM - 6 PM EST)
          </p>
          <p className="flex items-center gap-1">
            <MessageSquareText size={20} /> <strong>Live Chat:</strong>{" "}
            Available on our website
          </p>
        </div>

        <div className="p-5 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900">
            Returns & Exchanges
          </h2>
          <p className="text-gray-700">
            We offer hassle-free returns within <strong>30 days</strong> of
            delivery. Items must be in original condition with all tags
            attached. Visit our{" "}
            <span className="text-blue-500 underline">Returns Portal</span> to
            start a return.
          </p>
        </div>

        <div className="p-5 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900">
            Shipping & Delivery
          </h2>
          <p className="text-gray-700">
            We offer fast and reliable shipping across the country and
            internationally:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>Standard Shipping:</strong> 5-7 business days
            </li>
            <li>
              <strong>Express Shipping:</strong> 2-3 business days
            </li>
            <li>
              <strong>International Shipping:</strong> Varies by location
            </li>
          </ul>
          <p className="text-gray-700">
            Tracking information will be provided once your order ships.
          </p>
        </div>

        <div className="p-5 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900">
            Stay Connected
          </h2>
          <p className="text-gray-700">
            Follow us on social media for exclusive deals and updates:
          </p>
          <p className="flex items-center gap-1 text-gray-700">
            <Instagram size={20}/> Instagram:
            <span className="text-blue-500 underline">
              @stylesphereofficial
            </span>
          </p>
          <p className="flex items-center gap-1 text-gray-700">
            <Facebook size={20}/> Facebook:
            <span className="text-blue-500 underline">Style Sphere</span>
          </p>
          <p className="flex items-center gap-1 text-gray-700">
            <Twitter size={20}/>
            Twitter:
            <span className="text-blue-500 underline">@stylesphere</span>
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Your satisfaction is our top priority. Thank you for choosing{" "}
          <strong>Style Sphere</strong>!
        </p>
      </div>
    </div>
  );
};

export default CustomerService;
