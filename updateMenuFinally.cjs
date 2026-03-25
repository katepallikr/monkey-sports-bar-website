const fs = require('fs');
const file = './client/public/data/menu.json';
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.forEach(category => {
  category.items = category.items.filter(item => 
    !['New York Steak', 'Lamb Chops'].includes(item.name)
  );
});

const quickBites = data.find(c => c.name === 'Quick Bites');
if (quickBites) {
  const newId = (quickBites.items.length > 0) 
    ? quickBites.items[quickBites.items.length - 1].id + 1 
    : quickBites.id * 100 + 1;
    
  quickBites.items.push({
    id: newId,
    categoryId: quickBites.id,
    name: "Waffle Fries",
    description: "Crispy, golden waffle fries seasoned to perfection.",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=2000&auto=format&fit=crop",
    calories: null,
    isFeatured: false,
    isNew: true,
    allergens: null
  });
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Menu updated perfectly.');
