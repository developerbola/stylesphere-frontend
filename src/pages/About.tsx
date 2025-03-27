import { Facebook, Instagram, Twitter, ShoppingBag, Star, Truck, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="px-6 md:px-10 min-h-screen pt-[85px] flex items-center justify-center">
      <div className="max-w-4xl p-8 flex flex-col gap-6 text-gray-800">
        <h1 className="text-4xl font-bold text-gray-900">About Style Sphere</h1>
        <p className="text-lg">
          Welcome to <span className="font-semibold">Style Sphere</span>, your go-to destination for{" "}
          <span className="font-medium">premium shoes, clothing, and watches</span>. We believe that fashion is 
          more than just what you wear—it’s a statement of confidence, individuality, and style.
        </p>

        <div className="p-5 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingBag size={24} /> Our Story
          </h2>
          <p className="text-gray-700">
            Founded with a passion for fashion, <strong>Style Sphere</strong> was created to bring stylish, high-quality, 
            and affordable apparel and accessories to trendsetters everywhere. Whether you're looking for the 
            perfect pair of sneakers, a timeless watch, or clothing that makes a statement, we’ve got you covered.
          </p>
        </div>

        <div className="p-5 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Star size={24} /> What We Offer
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>👟 Trendsetting sneakers and footwear</li>
            <li>👗 Stylish and comfortable clothing</li>
            <li>⌚ Elegant and modern watches</li>
            <li>🚀 Fast and reliable shipping worldwide</li>
            <li>🌟 24/7 customer support</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <ShieldCheck size={24} /> Why Choose Us?
          </h2>
          <p className="text-gray-700">
            At <strong>Style Sphere</strong>, we are committed to providing top-tier products and exceptional service. 
            Here's what sets us apart:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>✅ High-quality, handpicked fashion pieces</li>
            <li>✅ Affordable pricing without compromising style</li>
            <li>✅ Secure and seamless shopping experience</li>
            <li>✅ Fast shipping & hassle-free returns</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Truck size={24} /> Stay Connected
          </h2>
          <p className="text-gray-700">
            Follow us on social media for the latest fashion trends, exclusive deals, and style inspiration.
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <Instagram size={20} /> Instagram:{" "}
            <span className="text-blue-500 underline">@stylesphereofficial</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <Facebook size={20} /> Facebook:{" "}
            <span className="text-blue-500 underline">Style Sphere</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <Twitter size={20} /> Twitter:{" "}
            <span className="text-blue-500 underline">@stylesphere</span>
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Thank you for being part of <strong>Style Sphere</strong>. Your style, your way!
        </p>
      </div>
    </div>
  );
};

export default About;
