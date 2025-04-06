// This import is for future use with the Gemini API
// import axios from 'axios';

interface MoodAnalysis {
  response: string;
  foodSuggestions: Array<{
    name: string;
    description: string;
    recipe: string;
    orderLink: string;
    youtubeLink: string;
  }>;
  quote: string;
  poetry?: string;
  meme?: {
    imageUrl: string;
    caption: string;
    description: string;
  };
}

interface Meme {
  imageUrl: string;
  caption: string;
  description: string;
}

// Mock data for mood analysis
const moodResponses: Record<string, string> = {
  happy: "Your joy is as sweet as cotton candy! Keep spreading those positive vibes like sprinkles on a cupcake! 🌈✨",
  sad: "Even the sweetest chocolate starts as a bitter bean. Your mood will brighten like a rainbow after the rain! 🌈",
  stressed: "Take a deep breath and treat yourself to something sweet. You're doing great, one sugar cube at a time! 🍯",
  energetic: "Your energy is as vibrant as a bag of Skittles! Channel that sweetness into something amazing! 🌟",
  sleepy: "Time for a sugar rush to wake up those sleepy eyes! A little treat can go a long way! ☕️"
};

// Mock data for poetry
const moodPoetry: Record<string, string> = {
  happy: `Sugar and spice and everything nice,
That's what your mood is made of!
Like a lollipop in the sunshine,
Your joy is sweet and true! 🍭✨`,
  
  sad: `When clouds are gray and skies are blue,
Remember this simple truth:
Like chocolate melting in your hand,
Better days will come to you! 🍫🌈`,
  
  stressed: `Take a breath, count to three,
Like counting candies in a tree.
Each moment passes, sweet and slow,
Just like a caramel's gentle flow. 🍯`,
  
  energetic: `Bouncing like a bubble gum pop,
Your energy just won't stop!
Like a sugar rush in the morning light,
You're shining oh so bright! ⚡️`,
  
  sleepy: `Eyes heavy like honey drops,
Time for sweet dreams, no stops.
Like a marshmallow in hot cocoa,
Drift away, let your spirit flow. ☁️`
};

// Mock data for food suggestions with recipes and order links
const foodSuggestions: Record<string, Array<{
  name: string;
  description: string;
  recipe: string;
  orderLink: string;
  youtubeLink: string;
}>> = {
  happy: [
    {
      name: "Gulab Jamun",
      description: "Sweet, soft, and absolutely delightful! Perfect for your happy mood! 🎉",
      recipe: "1. Mix khoya and flour\n2. Make small balls\n3. Deep fry until golden\n4. Soak in sugar syrup",
      orderLink: "https://www.swiggy.com/search?query=gulab+jamun",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+gulab+jamun"
    },
    {
      name: "Rasmalai",
      description: "Creamy, soft, and heavenly! A perfect treat for your happy moments! 🌟",
      recipe: "1. Make soft paneer balls\n2. Cook in milk\n3. Add cardamom and saffron\n4. Chill and serve",
      orderLink: "https://www.swiggy.com/search?query=rasmalai",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+rasmalai"
    },
    {
      name: "Mango Ice Cream",
      description: "Tropical, creamy, and refreshing! A taste of sunshine! 🥭",
      recipe: "1. Blend ripe mangoes\n2. Mix with cream\n3. Freeze and churn\n4. Serve with mango chunks",
      orderLink: "https://www.swiggy.com/search?query=mango+ice+cream",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+mango+ice+cream"
    },
    {
      name: "Chocolate Lava Cake",
      description: "Warm, gooey, and decadent! A chocolate lover's dream! 🍫",
      recipe: "1. Melt chocolate and butter\n2. Mix with eggs and flour\n3. Bake until edges are set\n4. Serve warm with ice cream",
      orderLink: "https://www.swiggy.com/search?query=chocolate+lava+cake",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+lava+cake"
    },
    {
      name: "Rainbow Macarons",
      description: "Colorful, delicate, and joyful! A perfect happy treat! 🌈",
      recipe: "1. Make almond flour mixture\n2. Add food coloring\n3. Pipe and rest\n4. Fill with ganache",
      orderLink: "https://www.swiggy.com/search?query=macarons",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+macarons"
    },
    {
      name: "Birthday Cake Ice Cream",
      description: "Fun, festive, and full of sprinkles! A celebration in every bite! 🎂",
      recipe: "1. Make vanilla ice cream base\n2. Add cake pieces\n3. Mix in sprinkles\n4. Freeze until firm",
      orderLink: "https://www.swiggy.com/search?query=birthday+cake+ice+cream",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+birthday+cake+ice+cream"
    },
    {
      name: "Fruit Tart",
      description: "Fresh, colorful, and elegant! A happy summer treat! 🍓",
      recipe: "1. Make tart shell\n2. Fill with custard\n3. Arrange fruits\n4. Glaze and serve",
      orderLink: "https://www.swiggy.com/search?query=fruit+tart",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+fruit+tart"
    },
    {
      name: "Cookie Dough Ice Cream",
      description: "Creamy, sweet, and fun! A classic happy treat! 🍪",
      recipe: "1. Make cookie dough\n2. Prepare ice cream base\n3. Mix together\n4. Freeze until firm",
      orderLink: "https://www.swiggy.com/search?query=cookie+dough+ice+cream",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+cookie+dough+ice+cream"
    },
    {
      name: "Chocolate Covered Strawberries",
      description: "Sweet, elegant, and delightful! A perfect happy treat! 🍓",
      recipe: "1. Melt chocolate\n2. Dip strawberries\n3. Drizzle with white chocolate\n4. Chill until set",
      orderLink: "https://www.swiggy.com/search?query=chocolate+covered+strawberries",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+covered+strawberries"
    },
    {
      name: "Rainbow Cake",
      description: "Colorful, fun, and exciting! A celebration of happiness! 🌈",
      recipe: "1. Make different colored layers\n2. Stack with frosting\n3. Add sprinkles\n4. Serve with joy",
      orderLink: "https://www.swiggy.com/search?query=rainbow+cake",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+rainbow+cake"
    },
    {
      name: "Candy Land Cupcakes",
      description: "Sweet, playful, and fun! A journey through candy land! 🍬",
      recipe: "1. Make vanilla cupcakes\n2. Add candy decorations\n3. Top with frosting\n4. Add more candy",
      orderLink: "https://www.swiggy.com/search?query=candy+cupcakes",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+candy+cupcakes"
    },
    {
      name: "Chocolate Fountain",
      description: "Flowing, decadent, and exciting! A chocolate paradise! 🍫",
      recipe: "1. Melt chocolate\n2. Set up fountain\n3. Prepare dippers\n4. Enjoy the flow",
      orderLink: "https://www.swiggy.com/search?query=chocolate+fountain",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+fountain"
    }
  ],
  excited: [
    {
      name: "Rainbow Cake",
      description: "Colorful, fun, and exciting! Perfect for your excited mood! 🌈",
      recipe: "1. Make different colored layers\n2. Stack with frosting\n3. Add sprinkles\n4. Serve with joy",
      orderLink: "https://www.swiggy.com/search?query=rainbow+cake",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+rainbow+cake"
    },
    {
      name: "Cotton Candy",
      description: "Light, fluffy, and magical! A treat that matches your excitement! 🍬",
      recipe: "1. Heat sugar\n2. Spin into threads\n3. Collect into clouds\n4. Serve immediately",
      orderLink: "https://www.swiggy.com/search?query=cotton+candy",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+cotton+candy"
    },
    {
      name: "Popcorn Ball Sundae",
      description: "Crunchy, sweet, and fun! A party in your mouth! 🍿",
      recipe: "1. Make caramel sauce\n2. Mix with popcorn\n3. Form into balls\n4. Top with ice cream",
      orderLink: "https://www.swiggy.com/search?query=popcorn+ball",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+popcorn+ball"
    },
    {
      name: "Confetti Cupcakes",
      description: "Festive, colorful, and celebratory! Perfect for your excited mood! 🎉",
      recipe: "1. Make vanilla batter\n2. Add sprinkles\n3. Bake until done\n4. Top with frosting",
      orderLink: "https://www.swiggy.com/search?query=confetti+cupcakes",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+confetti+cupcakes"
    },
    {
      name: "Unicorn Cake",
      description: "Magical, colorful, and exciting! A dream come true! 🦄",
      recipe: "1. Make rainbow layers\n2. Stack with frosting\n3. Add unicorn decorations\n4. Serve with sparkles",
      orderLink: "https://www.swiggy.com/search?query=unicorn+cake",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+unicorn+cake"
    },
    {
      name: "Candy Land Cupcakes",
      description: "Sweet, playful, and fun! A journey through candy land! 🍬",
      recipe: "1. Make vanilla cupcakes\n2. Add candy decorations\n3. Top with frosting\n4. Add more candy",
      orderLink: "https://www.swiggy.com/search?query=candy+cupcakes",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+candy+cupcakes"
    },
    {
      name: "Chocolate Fountain",
      description: "Flowing, decadent, and exciting! A chocolate paradise! 🍫",
      recipe: "1. Melt chocolate\n2. Set up fountain\n3. Prepare dippers\n4. Enjoy the flow",
      orderLink: "https://www.swiggy.com/search?query=chocolate+fountain",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+fountain"
    },
    {
      name: "Ice Cream Sundae Bar",
      description: "Customizable, fun, and exciting! Build your dream sundae! 🍦",
      recipe: "1. Prepare ice cream flavors\n2. Set up toppings\n3. Add sauces\n4. Create your masterpiece",
      orderLink: "https://www.swiggy.com/search?query=ice+cream+sundae",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+ice+cream+sundae"
    },
    {
      name: "Rainbow Macarons",
      description: "Colorful, delicate, and exciting! A perfect treat! 🌈",
      recipe: "1. Make almond flour mixture\n2. Add food coloring\n3. Pipe and rest\n4. Fill with ganache",
      orderLink: "https://www.swiggy.com/search?query=macarons",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+macarons"
    },
    {
      name: "Birthday Cake Ice Cream",
      description: "Fun, festive, and full of sprinkles! A celebration in every bite! 🎂",
      recipe: "1. Make vanilla ice cream base\n2. Add cake pieces\n3. Mix in sprinkles\n4. Freeze until firm",
      orderLink: "https://www.swiggy.com/search?query=birthday+cake+ice+cream",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+birthday+cake+ice+cream"
    },
    {
      name: "Fruit Tart",
      description: "Fresh, colorful, and elegant! A happy summer treat! 🍓",
      recipe: "1. Make tart shell\n2. Fill with custard\n3. Arrange fruits\n4. Glaze and serve",
      orderLink: "https://www.swiggy.com/search?query=fruit+tart",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+fruit+tart"
    },
    {
      name: "Cookie Dough Ice Cream",
      description: "Creamy, sweet, and fun! A classic treat! 🍪",
      recipe: "1. Make cookie dough\n2. Prepare ice cream base\n3. Mix together\n4. Freeze until firm",
      orderLink: "https://www.swiggy.com/search?query=cookie+dough+ice+cream",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+cookie+dough+ice+cream"
    }
  ],
  grateful: [
    {
      name: "Apple Pie",
      description: "Warm, comforting, and full of gratitude! Perfect for thankful moments! 🥧",
      recipe: "1. Make pie crust\n2. Fill with spiced apples\n3. Bake until golden\n4. Serve with love",
      orderLink: "https://www.swiggy.com/search?query=apple+pie",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+apple+pie"
    },
    {
      name: "Honey Cookies",
      description: "Sweet, simple, and heartwarming! A treat to express gratitude! 🍯",
      recipe: "1. Mix honey and butter\n2. Add flour and spices\n3. Bake until golden\n4. Share with loved ones",
      orderLink: "https://www.swiggy.com/search?query=honey+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+honey+cookies"
    },
    {
      name: "Cinnamon Rolls",
      description: "Warm, gooey, and comforting! A hug in pastry form! 🥖",
      recipe: "1. Make dough\n2. Roll with cinnamon\n3. Bake until golden\n4. Top with icing",
      orderLink: "https://www.swiggy.com/search?query=cinnamon+rolls",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+cinnamon+rolls"
    },
    {
      name: "Pumpkin Bread",
      description: "Spiced, moist, and homey! A taste of gratitude! 🎃",
      recipe: "1. Mix pumpkin puree\n2. Add spices and flour\n3. Bake until done\n4. Slice and share",
      orderLink: "https://www.swiggy.com/search?query=pumpkin+bread",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+pumpkin+bread"
    },
    {
      name: "Family Recipe Cookies",
      description: "Traditional, warm, and full of love! A taste of home! 🏠",
      recipe: "1. Mix family recipe\n2. Shape with love\n3. Bake until perfect\n4. Share with family",
      orderLink: "https://www.swiggy.com/search?query=family+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+family+cookies"
    },
    {
      name: "Grandma's Apple Crisp",
      description: "Classic, comforting, and grateful! A family favorite! 🍎",
      recipe: "1. Slice apples\n2. Make crisp topping\n3. Bake until golden\n4. Serve with love",
      orderLink: "https://www.swiggy.com/search?query=apple+crisp",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+apple+crisp"
    },
    {
      name: "Homemade Bread",
      description: "Simple, warm, and thankful! The bread of life! 🥖",
      recipe: "1. Mix ingredients\n2. Knead with care\n3. Let rise\n4. Bake with gratitude",
      orderLink: "https://www.swiggy.com/search?query=homemade+bread",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+homemade+bread"
    },
    {
      name: "Family Recipe Cake",
      description: "Special, sweet, and grateful! A celebration of family! 🎂",
      recipe: "1. Follow family recipe\n2. Bake with love\n3. Frost with care\n4. Share with joy",
      orderLink: "https://www.swiggy.com/search?query=family+cake",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+family+cake"
    }
  ],
  hopeful: [
    {
      name: "Rainbow Smoothie Bowl",
      description: "Bright, colorful, and full of hope! Start your day right! 🌈",
      recipe: "1. Blend fruits\n2. Top with fresh fruits\n3. Add granola\n4. Garnish with flowers",
      orderLink: "https://www.swiggy.com/search?query=smoothie+bowl",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+smoothie+bowl"
    },
    {
      name: "Sunshine Cookies",
      description: "Bright, cheerful, and optimistic! Like a ray of sunshine! ☀️",
      recipe: "1. Make cookie dough\n2. Add citrus zest\n3. Shape like sun\n4. Bake until golden",
      orderLink: "https://www.swiggy.com/search?query=sunshine+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+sunshine+cookies"
    },
    {
      name: "Lemon Blueberry Muffins",
      description: "Fresh, bright, and hopeful! A taste of spring! 🍋",
      recipe: "1. Mix flour and berries\n2. Add lemon zest\n3. Bake until done\n4. Enjoy with tea",
      orderLink: "https://www.swiggy.com/search?query=lemon+blueberry+muffins",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+lemon+blueberry+muffins"
    },
    {
      name: "Orange Blossom Cake",
      description: "Light, fragrant, and uplifting! A cake full of hope! 🌸",
      recipe: "1. Make cake batter\n2. Add orange blossom water\n3. Bake until done\n4. Top with glaze",
      orderLink: "https://www.swiggy.com/search?query=orange+blossom+cake",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+orange+blossom+cake"
    },
    {
      name: "Spring Flower Cookies",
      description: "Fresh, bright, and hopeful! A taste of spring! 🌸",
      recipe: "1. Make cookie dough\n2. Cut flower shapes\n3. Decorate with colors\n4. Share hope",
      orderLink: "https://www.swiggy.com/search?query=flower+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+flower+cookies"
    },
    {
      name: "Rainbow Jelly",
      description: "Colorful, fun, and hopeful! A bright future ahead! 🌈",
      recipe: "1. Make different colored jellies\n2. Layer in glass\n3. Chill until set\n4. Serve with hope",
      orderLink: "https://www.swiggy.com/search?query=rainbow+jelly",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+rainbow+jelly"
    },
    {
      name: "Butterfly Cake",
      description: "Beautiful, delicate, and hopeful! A transformation of hope! 🦋",
      recipe: "1. Make cake layers\n2. Shape like butterfly\n3. Decorate with colors\n4. Share hope",
      orderLink: "https://www.swiggy.com/search?query=butterfly+cake",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+butterfly+cake"
    },
    {
      name: "Star Cookies",
      description: "Shining, bright, and hopeful! Reach for the stars! ⭐",
      recipe: "1. Make cookie dough\n2. Cut star shapes\n3. Decorate with sparkles\n4. Share dreams",
      orderLink: "https://www.swiggy.com/search?query=star+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+star+cookies"
    }
  ],
  peaceful: [
    {
      name: "Chamomile Tea Cookies",
      description: "Calm, soothing, and peaceful! Perfect for quiet moments! 🍵",
      recipe: "1. Infuse butter with tea\n2. Make cookie dough\n3. Shape and bake\n4. Serve with tea",
      orderLink: "https://www.swiggy.com/search?query=chamomile+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chamomile+cookies"
    },
    {
      name: "Lavender Shortbread",
      description: "Delicate, calming, and serene! A peaceful treat! 💜",
      recipe: "1. Mix butter and flour\n2. Add lavender\n3. Shape and chill\n4. Bake until light",
      orderLink: "https://www.swiggy.com/search?query=lavender+shortbread",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+lavender+shortbread"
    },
    {
      name: "Green Tea Tiramisu",
      description: "Light, delicate, and calming! A peaceful dessert! 🍵",
      recipe: "1. Make green tea cream\n2. Layer with cookies\n3. Chill overnight\n4. Dust with matcha",
      orderLink: "https://www.swiggy.com/search?query=green+tea+tiramisu",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+green+tea+tiramisu"
    },
    {
      name: "Vanilla Bean Panna Cotta",
      description: "Smooth, creamy, and tranquil! A peaceful indulgence! 🥛",
      recipe: "1. Heat cream with vanilla\n2. Add gelatin\n3. Chill until set\n4. Serve with berries",
      orderLink: "https://www.swiggy.com/search?query=panna+cotta",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+panna+cotta"
    },
    {
      name: "Zen Garden Cookies",
      description: "Calm, peaceful, and mindful! A moment of tranquility! 🧘‍♀️",
      recipe: "1. Make cookie dough\n2. Shape like garden\n3. Add decorations\n4. Serve with peace",
      orderLink: "https://www.swiggy.com/search?query=zen+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+zen+cookies"
    },
    {
      name: "Peaceful Panna Cotta",
      description: "Smooth, calm, and serene! A peaceful dessert! 🥛",
      recipe: "1. Heat cream\n2. Add gelatin\n3. Chill until set\n4. Serve with peace",
      orderLink: "https://www.swiggy.com/search?query=panna+cotta",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+panna+cotta"
    },
    {
      name: "Calming Chamomile Cake",
      description: "Soothing, gentle, and peaceful! A cake for tranquility! 🍵",
      recipe: "1. Infuse cream with chamomile\n2. Make cake batter\n3. Bake until done\n4. Serve with peace",
      orderLink: "https://www.swiggy.com/search?query=chamomile+cake",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chamomile+cake"
    },
    {
      name: "Peaceful Pudding",
      description: "Smooth, calm, and peaceful! A moment of peace! 🥄",
      recipe: "1. Cook milk and sugar\n2. Add vanilla\n3. Chill until set\n4. Serve with peace",
      orderLink: "https://www.swiggy.com/search?query=peaceful+pudding",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+peaceful+pudding"
    }
  ],
  sad: [
    {
      name: "Chocolate Brownie",
      description: "Rich, fudgy, and comforting! This will definitely lift your spirits! 🍫",
      recipe: "1. Melt dark chocolate\n2. Mix with butter and sugar\n3. Add eggs and flour\n4. Bake until fudgy",
      orderLink: "https://www.swiggy.com/search?query=chocolate+brownie",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+brownie"
    },
    {
      name: "Hot Chocolate",
      description: "Warm, creamy, and soothing! A hug in a cup! ☕",
      recipe: "1. Heat milk\n2. Add dark chocolate\n3. Whisk until smooth\n4. Top with whipped cream",
      orderLink: "https://www.swiggy.com/search?query=hot+chocolate",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+hot+chocolate"
    },
    {
      name: "Chocolate Chip Cookies",
      description: "Warm, gooey, and comforting! A classic pick-me-up! 🍪",
      recipe: "1. Cream butter and sugar\n2. Add chocolate chips\n3. Bake until golden\n4. Serve warm",
      orderLink: "https://www.swiggy.com/search?query=chocolate+chip+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+chip+cookies"
    },
    {
      name: "Chocolate Pudding",
      description: "Smooth, rich, and comforting! A spoonful of comfort! 🍯",
      recipe: "1. Cook chocolate and milk\n2. Add cornstarch\n3. Chill until set\n4. Top with whipped cream",
      orderLink: "https://www.swiggy.com/search?query=chocolate+pudding",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+pudding"
    },
    {
      name: "Comfort Chocolate Cake",
      description: "Rich, warm, and comforting! A hug in cake form! 🍫",
      recipe: "1. Mix chocolate and butter\n2. Add eggs and flour\n3. Bake until done\n4. Serve with love",
      orderLink: "https://www.swiggy.com/search?query=chocolate+cake",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+cake"
    },
    {
      name: "Warm Apple Cider",
      description: "Cozy, comforting, and warm! A hug in a cup! 🍎",
      recipe: "1. Heat apple cider\n2. Add spices\n3. Simmer gently\n4. Serve warm",
      orderLink: "https://www.swiggy.com/search?query=apple+cider",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+apple+cider"
    },
    {
      name: "Comfort Mac and Cheese",
      description: "Creamy, warm, and comforting! A classic comfort food! 🧀",
      recipe: "1. Cook pasta\n2. Make cheese sauce\n3. Combine and bake\n4. Serve warm",
      orderLink: "https://www.swiggy.com/search?query=mac+and+cheese",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+mac+and+cheese"
    },
    {
      name: "Warm Rice Pudding",
      description: "Creamy, sweet, and comforting! A warm hug in a bowl! 🥣",
      recipe: "1. Cook rice in milk\n2. Add sugar and vanilla\n3. Simmer until thick\n4. Serve warm",
      orderLink: "https://www.swiggy.com/search?query=rice+pudding",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+rice+pudding"
    }
  ],
  stressed: [
    {
      name: "Ice Cream Sundae",
      description: "Cool, creamy, and stress-busting! Take a break with this! 🍦",
      recipe: "1. Scoop vanilla ice cream\n2. Add chocolate sauce\n3. Top with nuts\n4. Add whipped cream",
      orderLink: "https://www.swiggy.com/search?query=ice+cream+sundae",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+ice+cream+sundae"
    },
    {
      name: "Fruit Smoothie",
      description: "Fresh, healthy, and refreshing! A natural stress buster! 🥤",
      recipe: "1. Blend mixed fruits\n2. Add yogurt\n3. Add honey\n4. Blend until smooth",
      orderLink: "https://www.swiggy.com/search?query=fruit+smoothie",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+fruit+smoothie"
    },
    {
      name: "Banana Bread",
      description: "Comforting, simple, and stress-relieving! A slice of calm! 🍌",
      recipe: "1. Mash ripe bananas\n2. Mix with flour\n3. Bake until done\n4. Slice and enjoy",
      orderLink: "https://www.swiggy.com/search?query=banana+bread",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+banana+bread"
    },
    {
      name: "Chocolate Covered Strawberries",
      description: "Sweet, elegant, and stress-relieving! A treat for yourself! 🍓",
      recipe: "1. Melt chocolate\n2. Dip strawberries\n3. Chill until set\n4. Enjoy slowly",
      orderLink: "https://www.swiggy.com/search?query=chocolate+covered+strawberries",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+covered+strawberries"
    }
  ],
  energetic: [
    {
      name: "Energy Balls",
      description: "Power-packed and delicious! Keep that energy going! 💪",
      recipe: "1. Mix dates and nuts\n2. Add oats and honey\n3. Roll into balls\n4. Chill and serve",
      orderLink: "https://www.swiggy.com/search?query=energy+balls",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+energy+balls"
    },
    {
      name: "Protein Shake",
      description: "Nutritious and energizing! Perfect for your active mood! 🥤",
      recipe: "1. Blend banana\n2. Add protein powder\n3. Add milk and honey\n4. Blend until smooth",
      orderLink: "https://www.swiggy.com/search?query=protein+shake",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+protein+shake"
    },
    {
      name: "Acai Bowl",
      description: "Fresh, vibrant, and energizing! A power-packed breakfast! 🥣",
      recipe: "1. Blend acai puree\n2. Top with fruits\n3. Add granola\n4. Garnish with seeds",
      orderLink: "https://www.swiggy.com/search?query=acai+bowl",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+acai+bowl"
    },
    {
      name: "Green Smoothie",
      description: "Nutrient-rich and energizing! A boost of vitality! 🥬",
      recipe: "1. Blend spinach\n2. Add banana and apple\n3. Add ginger\n4. Blend until smooth",
      orderLink: "https://www.swiggy.com/search?query=green+smoothie",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+green+smoothie"
    }
  ],
  sleepy: [
    {
      name: "Warm Cookies",
      description: "Comforting and cozy! Perfect for your sleepy mood! 🍪",
      recipe: "1. Mix butter and sugar\n2. Add flour and chocolate chips\n3. Bake until golden\n4. Serve warm",
      orderLink: "https://www.swiggy.com/search?query=chocolate+chip+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+chip+cookies"
    },
    {
      name: "Hot Milk with Honey",
      description: "Soothing and calming! A perfect bedtime treat! 🥛",
      recipe: "1. Heat milk\n2. Add honey\n3. Add cinnamon\n4. Stir and serve",
      orderLink: "https://www.swiggy.com/search?query=hot+milk",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+hot+milk+with+honey"
    },
    {
      name: "Chamomile Lavender Cookies",
      description: "Calming, soothing, and perfect for bedtime! A gentle treat! 🌙",
      recipe: "1. Infuse butter with herbs\n2. Make cookie dough\n3. Bake until light\n4. Serve with tea",
      orderLink: "https://www.swiggy.com/search?query=chamomile+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chamomile+cookies"
    },
    {
      name: "Warm Apple Cider",
      description: "Spiced, warm, and comforting! A cozy bedtime drink! 🍎",
      recipe: "1. Heat apple cider\n2. Add cinnamon and cloves\n3. Simmer gently\n4. Serve warm",
      orderLink: "https://www.swiggy.com/search?query=apple+cider",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+apple+cider"
    }
  ],
  anxious: [
    {
      name: "Calming Chamomile Cookies",
      description: "Soothing and gentle! Perfect for anxious moments! 🌼",
      recipe: "1. Infuse butter with chamomile\n2. Make cookie dough\n3. Shape and bake\n4. Serve with tea",
      orderLink: "https://www.swiggy.com/search?query=chamomile+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chamomile+cookies"
    },
    {
      name: "Berry Smoothie",
      description: "Calming and refreshing! A natural anxiety buster! 🫐",
      recipe: "1. Blend mixed berries\n2. Add yogurt\n3. Add honey\n4. Blend until smooth",
      orderLink: "https://www.swiggy.com/search?query=berry+smoothie",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+berry+smoothie"
    },
    {
      name: "Dark Chocolate Bark",
      description: "Rich, calming, and mood-lifting! A mindful treat! 🍫",
      recipe: "1. Melt dark chocolate\n2. Add nuts and dried fruit\n3. Chill until set\n4. Break into pieces",
      orderLink: "https://www.swiggy.com/search?query=dark+chocolate+bark",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+dark+chocolate+bark"
    },
    {
      name: "Lavender Hot Chocolate",
      description: "Soothing, warm, and calming! A hug in a cup! ☕",
      recipe: "1. Heat milk with lavender\n2. Add dark chocolate\n3. Strain and serve\n4. Top with whipped cream",
      orderLink: "https://www.swiggy.com/search?query=lavender+hot+chocolate",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+lavender+hot+chocolate"
    }
  ],
  nostalgic: [
    {
      name: "Classic Chocolate Chip Cookies",
      description: "Timeless and comforting! Just like grandma used to make! 🍪",
      recipe: "1. Cream butter and sugar\n2. Add chocolate chips\n3. Bake until golden\n4. Share memories",
      orderLink: "https://www.swiggy.com/search?query=chocolate+chip+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+chocolate+chip+cookies"
    },
    {
      name: "Old-Fashioned Apple Pie",
      description: "Traditional and heartwarming! A slice of nostalgia! 🥧",
      recipe: "1. Make pie crust\n2. Fill with spiced apples\n3. Bake until golden\n4. Serve with love",
      orderLink: "https://www.swiggy.com/search?query=apple+pie",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+apple+pie"
    },
    {
      name: "Rice Pudding",
      description: "Creamy, comforting, and nostalgic! A taste of childhood! 🥛",
      recipe: "1. Cook rice in milk\n2. Add sugar and vanilla\n3. Simmer until thick\n4. Top with cinnamon",
      orderLink: "https://www.swiggy.com/search?query=rice+pudding",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+rice+pudding"
    },
    {
      name: "Homemade Ice Cream",
      description: "Creamy, sweet, and nostalgic! A taste of summer memories! 🍦",
      recipe: "1. Mix cream and milk\n2. Add vanilla and sugar\n3. Churn until frozen\n4. Serve with toppings",
      orderLink: "https://www.swiggy.com/search?query=homemade+ice+cream",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+homemade+ice+cream"
    }
  ],
  inspired: [
    {
      name: "Creative Cake Pops",
      description: "Fun, artistic, and inspiring! Let your creativity flow! 🎨",
      recipe: "1. Make cake balls\n2. Dip in chocolate\n3. Add decorations\n4. Display with pride",
      orderLink: "https://www.swiggy.com/search?query=cake+pops",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+cake+pops"
    },
    {
      name: "Rainbow Macarons",
      description: "Colorful, delicate, and inspiring! A work of art! 🌈",
      recipe: "1. Make macaron shells\n2. Add colorful fillings\n3. Age overnight\n4. Share your creation",
      orderLink: "https://www.swiggy.com/search?query=macarons",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+macarons"
    },
    {
      name: "Decorative Sugar Cookies",
      description: "Artistic, fun, and inspiring! A canvas for creativity! 🎨",
      recipe: "1. Make cookie dough\n2. Cut into shapes\n3. Bake until done\n4. Decorate with icing",
      orderLink: "https://www.swiggy.com/search?query=sugar+cookies",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+sugar+cookies"
    },
    {
      name: "Fruit Tart",
      description: "Beautiful, colorful, and inspiring! A masterpiece of flavor! 🥧",
      recipe: "1. Make tart shell\n2. Fill with custard\n3. Arrange fruits\n4. Glaze and serve",
      orderLink: "https://www.swiggy.com/search?query=fruit+tart",
      youtubeLink: "https://www.youtube.com/results?search_query=how+to+make+fruit+tart"
    }
  ]
};

const quotes = [
  "Life is short, eat dessert first! 🍰",
  "A balanced diet is a cookie in each hand! 🍪",
  "Stressed spelled backwards is desserts! 🍦",
  "All you need is love and dessert! ❤️",
  "Keep calm and eat chocolate! 🍫",
  "Happiness is homemade dessert! 🏠",
  "Dessert is the best part of any meal! 🍮",
  "Sweet dreams are made of these! 🌙",
  "You can't buy happiness, but you can buy dessert! 🛍️",
  "Life is uncertain, eat dessert first! 🎲"
];

// Add Spotify playlist links for each mood with real playlists featuring top artists
export const moodSpotifyPlaylists: Record<string, string> = {
  happy: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0?si=1b9c9c9c9c9c9c9c", // Happy Hits featuring The Weeknd, Dua Lipa, etc.
  sad: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1?si=2b9c9c9c9c9c9c9c", // Sad Songs featuring The Weeknd, Travis Scott, etc.
  stressed: "https://open.spotify.com/playlist/37i9dQZF1DX0XUfTFmNBRM?si=3b9c9c9c9c9c9c9c", // Chill Vibes featuring Drake, Post Malone, etc.
  energetic: "https://open.spotify.com/playlist/37i9dQZF1DX76WTSH9u8Q1?si=4b9c9c9c9c9c9c9c", // Energy Boost featuring Travis Scott, Drake, etc.
  sleepy: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY?si=5b9c9c9c9c9c9c9c" // Sleepy Time featuring The Weeknd, Drake, etc.
};

// Function to analyze mood and return a response
export const analyzeMood = async (journalEntry: string, mood: string): Promise<MoodAnalysis> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Get all food suggestions for the mood
  const allSuggestions = foodSuggestions[mood] || [];
  
  // Randomly select 2 different suggestions
  const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
  const selectedSuggestions = shuffled.slice(0, 2);

  // Get random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return {
    response: moodResponses[mood] || "Your mood is as unique as a custom-made dessert! 🍰",
    foodSuggestions: selectedSuggestions,
    quote: randomQuote,
    poetry: moodPoetry[mood]
  };
};

// Function to generate memes based on mood
export const generateMeme = async (mood: string): Promise<Meme> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Meme data for different moods using actual Drake meme templates
  const moodMemes: Record<string, Meme> = {
    happy: {
      imageUrl: "https://i.imgflip.com/1g8my4.jpg", // Drake Happy
      caption: "When you're feeling happy and vibing",
      description: "Drake nodding in approval"
    },
    sad: {
      imageUrl: "https://i.imgflip.com/1bij.jpg", // Drake Disappointed
      caption: "When you're feeling down",
      description: "Drake looking disappointed"
    },
    stressed: {
      imageUrl: "https://i.imgflip.com/30b1gx.jpg", // Drake Stressed
      caption: "Me trying to handle stress",
      description: "Drake looking overwhelmed"
    },
    energetic: {
      imageUrl: "https://i.imgflip.com/1g8my4.jpg", // Drake Happy/Dancing
      caption: "When you're full of energy",
      description: "Drake dancing"
    },
    sleepy: {
      imageUrl: "https://i.imgflip.com/1bij.jpg", // Drake Tired
      caption: "Me trying to stay awake",
      description: "Drake looking sleepy"
    }
  };

  return moodMemes[mood] || {
    imageUrl: "https://i.imgflip.com/1g8my4.jpg", // Default to happy Drake
    caption: "Default meme",
    description: "Default description"
  };
}; 