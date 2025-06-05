import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

 const footMenu = [
    {
        id: 1,
        title: "Help",
        menu: [
            {
                id: 1,
                link: "FAQs",
                path: "/"
            },
            {
                id: 2,
                link: "Track Order",
                path: "/"
            },
            {
                id: 3,
                link: "Cancel Order",
                path: "/"
            },
            {
                id: 4,
                link: "Return Order",
                path: "/"
            },
            {
                id: 5,
                link: "Warranty Info",
                path: "/"
            },
        ]
    },
    {
        id: 2,
        title: "Policies",
        menu: [
            {
                id: 1,
                link: "Return Policy",
                path: "/"
            },
            {
                id: 2,
                link: "Security",
                path: "/"
            },
            {
                id: 3,
                link: "Sitemap",
                path: "/"
            },
            {
                id: 4,
                link: "Privacy Policy",
                path: "/"
            },
            {
                id: 5,
                link: "Terms & Conditions",
                path: "/"
            },
        ]
    },
    {
        id: 3,
        title: "Company",
        menu: [
            {
                id: 1,
                link: "About Us",
                path: "/"
            },
            {
                id: 2,
                link: "Contact Us",
                path: "/"
            },
            {
                id: 3,
                link: "Service Centres",
                path: "/"
            },
            {
                id: 4,
                link: "Careers",
                path: "/"
            },
            {
                id: 5,
                link: "Affiliates",
                path: "/"
            },
        ]
    }
];

 const footSocial = [
    {
        id: 1,
        icon: <FaFacebookF />,
        path: "/",
    },
    {
        id: 2,
        icon: <FaTwitter />,
        path: "/",
    },
    {
        id: 3,
        icon: <FaInstagram />,
        path: "/",
    },
    {
        id: 4,
        icon: <FaLinkedinIn />,
        path: "/",
    },
];

const Footer = () => {
    return (
        <footer className="bg-gray-950 py-8 px-4">
    <div className="max-w-6xl mx-auto">
        {/* Email Subscription Section and Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Subscription Section - now takes full width on mobile, 2 cols on sm, and normal on lg+ */}
            <div className="sm:col-span-2 lg:col-span-1">
                <h2 className="text-2xl font-bold mb-4 text-white text-left">Tech-Shop</h2>
                <p className="mb-4 text-white text-left">Subscribe to our Email alerts to receive early discount offers, and new products info.</p>
                <div className="flex justify-start">
                    <input 
                        type="email" 
                        placeholder="Email Address*" 
                        className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-red-500 w-full max-w-xs text-white bg-transparent"
                    />
                    <button className="bg-red-600 text-white px-6 py-2 rounded-r hover:bg-red-700 transition-colors">
                        Subscribe
                    </button>
                </div>
            </div>
            
            {/* Footer Links Sections */}
            {footMenu.map((section) => (
                <div key={section.id} className="text-center sm:text-left">
                    <h3 className="font-bold text-lg mb-4 text-white">{section.title}</h3>
                    <ul className="space-y-2">
                        {section.menu.map((item) => (
                            <li key={item.id}>
                                <a href={item.path} className="text-gray-400 hover:text-red-600 transition-colors">
                                    {item.link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        {/* Social Media Links */}
       <div className="flex flex-col items-center">
    {/* Social Media Links */}
    <div className="flex justify-center space-x-4 mb-8">
        {footSocial.map((social) => (
            <a 
                key={social.id} 
                href={social.path}
                className="bg-gray-200 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors"
            >
                {social.icon}
            </a>
        ))}
    </div>
    
    {/* Copyright - now properly separated below social icons */}
    <div className="text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Tech-Shop. All rights reserved.</p>
    </div>
</div>
        {/* Copyright */}
        
    </div>
</footer>
    );
};

export default Footer;