const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
dotenv.config();

const products = [
  // Chocolates
  { name: 'Dry Fruit Chocolates', description: 'Premium homemade chocolates.', price: 140, unit: '10 pieces', stockQuantity: 100, category: 'Chocolates', imageUrl: 'https://visible-aquamarine-xzx4mmjxeg.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2012_45_48%20PM.png' },
  { name: 'Cranberry & Nuts Chocolates', description: 'Tangy cranberries and crunchy nuts.', price: 200, unit: '10 pieces', stockQuantity: 100, category: 'Chocolates', imageUrl: 'https://continued-amaranth-teftynqgk6.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_08_18%20PM.png' },
  { name: 'Pista Chocolates', description: 'Rich chocolate packed with pistachios.', price: 200, unit: '10 pieces', stockQuantity: 100, category: 'Chocolates', imageUrl: 'https://embarrassing-violet-mtaavgccah.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_12_39%20PM.png' },
  
  // Biscuits
  { name: 'Ragi & Multigrain Biscuits', description: 'Healthy, crunchy biscuits.', price: 80, unit: '10 pieces', stockQuantity: 100, category: 'Biscuits', imageUrl: 'https://successive-plum-qov3ugo9zf.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_33_01%20PM.png' },
  
  // Health Powders
  { name: 'Moringa Leaf Powder (Raw)', description: '100% pure raw moringa.', price: 160, unit: '100 gms', stockQuantity: 100, category: 'Health Powders', imageUrl: 'https://unexpected-indigo-szxhxbryzs.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_35_47%20PM.png' },
  { name: 'Moringa Chetny Podi', description: 'Spicy and healthy chutney powder.', price: 80, unit: '100 gms', stockQuantity: 100, category: 'Health Powders', imageUrl: 'https://filthy-green-an5g8c6xp7.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_42_42%20PM.png' },
  { name: 'Curry Leaf Chetny Podi', description: 'Traditional spice blend.', price: 90, unit: '100 gms', stockQuantity: 100, category: 'Health Powders', imageUrl: 'https://provincial-amethyst-s1dur0onsa.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_46_40%20PM.png' },
  
  // Laddus
  { name: 'Dry Fruit Laddus', description: 'Energy-packed dry fruit laddus.', price: 1100, unit: '1kg', stockQuantity: 50, category: 'Laddus', imageUrl: 'https://sweet-lime-ah0qwnr45f.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_50_01%20PM.png' },
  { name: 'Gondh Laddus', description: 'Traditional healthy edible gum laddus.', price: 1200, unit: '1kg', stockQuantity: 50, category: 'Laddus', imageUrl: 'https://scary-green-yfllw19ttu.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_52_45%20PM.png' },
  
  // Salads
  { name: 'Vegetable Salad', description: 'Freshly chopped mixed vegetables.', price: 25, unit: '100 gms', stockQuantity: 50, category: 'Salads', imageUrl: 'https://head-brown-3ucetqnigl.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2001_57_20%20PM.png' },
  { name: 'Boiled Sprouts & Vegetables', description: 'Nutritious mix of sprouts and veggies.', price: 30, unit: '100 gms', stockQuantity: 50, category: 'Salads', imageUrl: 'https://possible-fuchsia-pgfksbkwup.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_00_15%20PM.png' },
  { name: 'Paneer & Boiled Sprouts', description: 'High-protein paneer and sprouts.', price: 50, unit: '100 gms', stockQuantity: 50, category: 'Salads', imageUrl: 'https://asleep-teal-abar6a2upf.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_03_41%20PM.png' },
  { name: 'Mushrooms Salad', description: 'Healthy tossed mushroom salad (No added water).', price: 50, unit: '100 gms', stockQuantity: 50, category: 'Salads', imageUrl: 'https://bottom-amethyst-ysjpxvzhcz.edgeone.app/ChatGPT%20Image%20Mar%201,%202026,%2002_22_38%20PM.png' },
  
  // Juices
  { name: 'Carrot Juice', description: 'Freshly squeezed pure carrot juice.', price: 40, unit: '250ml', stockQuantity: 50, category: 'Juices', imageUrl: 'https://safe-green-daqascngvt.edgeone.app/Mar%201,%202026,%2002_28_41%20PM.png' },
  { name: 'Beetroot Juice', description: 'Iron-rich, freshly pressed beetroot juice.', price: 40, unit: '250ml', stockQuantity: 50, category: 'Juices', imageUrl: '/images/default.jpg' },
  { name: 'Carrot & Beetroot Mixed Juice', description: 'The perfect healthy blend of carrot and beetroot.', price: 40, unit: '250ml', stockQuantity: 50, category: 'Juices', imageUrl: '/images/default.jpg' }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    console.log('Clearing old menu...');
    await Product.deleteMany();
    
    console.log('Inserting new Fit Bite Kitchen menu...');
    await Product.insertMany(products);
    
    console.log('✅ Menu Preloaded Successfully! All juices added.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error Seeding Data:', error);
    process.exit(1);
  }
}).catch(err => {
  console.error('❌ Database Connection Error:', err);
  process.exit(1);
});