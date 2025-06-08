
// Product data for Crochea Luxe
const products = [
  {
    id: 1,
    title: "Elegant Rose Hairband",
    price: 299,
    category: "hairbands",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop"
    ],
    description: "Handcrafted with premium cotton yarn featuring delicate rose patterns. Perfect for special occasions and daily wear. Each piece is uniquely made by Mahima Jadav with love and attention to detail.",
    features: {
      "Material": "100% Premium Cotton Yarn",
      "Size": "Adjustable (16-20 inches)",
      "Care": "Hand wash with mild detergent, air dry",
      "Delivery": "2-3 days within Ahmedabad",
      "Made by": "Mahima Jadav"
    },
    colors: ["Blush Pink", "Cream", "Lavender"],
    inStock: true
  },
  {
    id: 2,
    title: "Vintage Lace Hair Clip",
    price: 199,
    category: "clips",
    image: "../images/clips (1).jpeg",
    images: [
      "../images/clips (2).jpeg",
      "../images/clips (3).jpeg",
      "../images/clips (4).jpeg",
      "../images/clips (5).jpeg",
      "../images/clips (6).jpeg",
      "../images/clips (7).jpeg",
      "../images/clips (8).jpeg",
      "../images/clips (9).jpeg",
      "../images/clips (10).jpeg",
      "../images/clips (11).jpeg"
    ],
    description: "Vintage-inspired hair clip with intricate lace patterns. Adds elegance to any hairstyle. Handcrafted by Mahima using traditional crochet techniques.",
    features: {
      "Material": "Cotton Lace Yarn",
      "Size": "3 x 2 inches",
      "Care": "Spot clean only, handle with care",
      "Delivery": "Same day in Ahmedabad",
      "Made by": "Mahima Jadav"
    },
    colors: ["Cream", "Sage Green", "Blush Pink"],
    inStock: true
  },
  {
    id: 3,
    title: "Soft Dreams Scrunchie",
    price: 149,
    category: "scrunchies",
    image: "../images/chrunches (1).jpeg",
    images: [
      "../images/chrunches (2).jpeg",
      "../images/chrunches (3).jpeg",
      "../images/chrunches (4).jpeg",
      "../images/chrunches (5).jpeg",
      "../images/chrunches (6).jpeg"
    ],
    description: "Ultra-soft scrunchie that's gentle on your hair. Perfect for all hair types and daily use. Handcrafted with premium bamboo fiber yarn for ultimate comfort.",
    features: {
      "Material": "Bamboo Fiber Yarn",
      "Size": "Standard (4 inch diameter)",
      "Care": "Machine washable, gentle cycle",
      "Delivery": "1-2 days within Ahmedabad",
      "Made by": "Mahima Jadav"
    },
    colors: ["Sage Green", "Blush Pink", "Lavender"],
    inStock: true
  },
  {
    id: 4,
    title: "Boho Flower Hairband",
    price: 349,
    category: "hairbands",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop"
    ],
    description: "Bohemian-style hairband featuring handcrafted 3D flowers. A statement piece for festivals and special events. Each flower is individually crocheted by Mahima.",
    features: {
      "Material": "Mixed Yarn (Cotton & Silk)",
      "Size": "One size fits all",
      "Care": "Hand wash recommended, air dry",
      "Delivery": "3-4 days within Ahmedabad",
      "Made by": "Mahima Jadav"
    },
    colors: ["Multi-color", "Earth Tones", "Pastels"],
    inStock: true
  },
  {
    id: 5,
    title: "Pearl Accent Hair Clip",
    price: 249,
    category: "clips",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop"
    ],
    description: "Elegant hair clip adorned with faux pearls. Perfect for weddings and formal occasions. Handcrafted by Mahima with silk yarn and premium pearl beads.",
    features: {
      "Material": "Silk Yarn with Pearl Beads",
      "Size": "2.5 x 1.5 inches",
      "Care": "Handle with care, spot clean only",
      "Delivery": "2-3 days within Ahmedabad",
      "Made by": "Mahima Jadav"
    },
    colors: ["Cream with Pearls", "Blush with Pearls"],
    inStock: true
  },
  {
    id: 6,
    title: "Rainbow Twist Scrunchie",
    price: 179,
    category: "scrunchies",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop"
    ],
    description: "Colorful scrunchie with a fun twist pattern. Adds a pop of color to your everyday look. Handcrafted by Mahima using vibrant acrylic yarn blend.",
    features: {
      "Material": "Acrylic Yarn Blend",
      "Size": "Large (5 inch diameter)",
      "Care": "Machine washable cold water",
      "Delivery": "1-2 days within Ahmedabad",
      "Made by": "Mahima Jadav"
    },
    colors: ["Rainbow", "Sunset", "Ocean"],
    inStock: true
  }
];

// Gallery images
const galleryImages = [
  {
    id: 1,
    src: "../images/crocea (1).jpeg",
    alt: "Customer wearing elegant hairband",
    caption: "Priya styling her new Rose Hairband"
  },
  {
    id: 2,
    src: "../images/crocea (8).jpeg",
    alt: "Beautiful hair clip arrangement",
    caption: "Our vintage collection by Mahima"
  },
  {
    id: 3,
    src: "../images/crocea (9).jpeg",
    alt: "Scrunchies in natural setting",
    caption: "Soft and comfortable scrunchies"
  },
  {
    id: 4,
    src: "../images/crocea (4).jpeg",
    alt: "Boho style photoshoot",
    caption: "Bohemian elegance handcrafted"
  },
  {
    id: 5,
    src: "../images/crocea (5).jpeg",
    alt: "Wedding hair accessories",
    caption: "Perfect for special occasions"
  },
  {
    id: 6,
    src: "../images/crocea (11).jpeg",
    alt: "Daily wear collection",
    caption: "Everyday elegance by Mahima"
  },
  {
    id: 7,
    src: "../images/crocea (7).jpeg",
    alt: "Colorful scrunchie collection",
    caption: "Add color to your day"
  },
  {
    id: 8,
    src: "../images/crocea (10).jpeg",
    alt: "Handcrafted with love",
    caption: "Made with passion in Ahmedabad"
  }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Satellite, Ahmedabad",
    text: "Mahima's crochet work is absolutely stunning! The quality is exceptional and my daughter gets compliments everywhere she wears her hairband. The delivery was so quick too!",
    rating: 5
  },
  {
    id: 2,
    name: "Kavya Patel",
    location: "Bopal, Ahmedabad",
    text: "Beautiful handcrafted pieces that last long. The attention to detail in every stitch is incredible. I've ordered multiple items from Crochea Luxe and each one is perfect!",
    rating: 5
  },
  {
    id: 3,
    name: "Meera Joshi",
    location: "Vastrapur, Ahmedabad",
    text: "Fast delivery and gorgeous products. The scrunchies are so soft and don't damage my hair at all. Love supporting Mahima's beautiful work!",
    rating: 5
  },
  {
    id: 4,
    name: "Riya Shah",
    location: "Chandkheda, Ahmedabad",
    text: "I bought the pearl hair clip for my wedding and it was perfect! So many people asked where I got it from. Thank you Mahima for such beautiful work!",
    rating: 5
  },
  {
    id: 5,
    name: "Anjali Mehta",
    location: "Gota, Ahmedabad",
    text: "Love the boho hairband! It's exactly what I was looking for. The colors are vibrant and the quality is outstanding. Mahima is truly talented!",
    rating: 5
  }
];

// FAQ data
const faqData = [
  {
    question: "Do you deliver outside Ahmedabad?",
    answer: "Currently, we only deliver within Ahmedabad city limits. We're working on expanding our delivery areas and will update you soon!"
  },
  {
    question: "How long does delivery take?",
    answer: "We typically deliver within 2-5 business days across Ahmedabad. For urgent orders, please contact us on WhatsApp and we'll try our best to accommodate."
  },
  {
    question: "How to take care of crochet items?",
    answer: "Hand wash gently with mild detergent in cold water. Avoid wringing or stretching. Air dry away from direct sunlight. Avoid machine wash to preserve the delicate crochet work."
  },
  {
    question: "Can I customize colors or designs?",
    answer: "Yes! Mahima offers custom colors and designs for special occasions. Please contact us with your requirements and we'll provide a quote within 24 hours."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 7 days of delivery if the product is unused and in original condition. Since our products are handmade, minor variations are normal and not grounds for return."
  },
  {
    question: "Do you accept bulk orders?",
    answer: "Absolutely! We welcome bulk orders for events, parties, or retail. Please contact us for special pricing and customization options."
  },
  {
    question: "Are your products suitable for children?",
    answer: "Yes, all our products are made with child-safe materials. However, please supervise young children while wearing accessories with small decorative elements."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We currently accept Cash on Delivery (COD) for all orders within Ahmedabad. Online payment options will be available soon!"
  }
];

// Export all data
window.productsData = products;
window.galleryData = galleryImages;
window.testimonialsData = testimonials;
window.faqData = faqData;
