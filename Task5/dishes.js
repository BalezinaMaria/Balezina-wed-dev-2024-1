const dishes = [
    {
        keyword: 'gaspacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        count: '350 г',
        image: 'soups/gazpacho.jpg',
        kind: 'veg'
    },
    {
        keyword: 'mushroom_soup',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        count: '330 г',
        image: 'soups/mushroom_soup.jpg',
        kind: 'veg'
    },
    {
        keyword: 'norwegian_soup',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        count: '330 г',
        image: 'soups/norwegian_soup.jpg',
        kind: 'fish'
    },
    {
        keyword: 'ramen',
        name: 'Рамен',
        price: 375,
        category: 'soup',
        count: '425 г',
        image: 'soups/ramen.jpg',
        kind: 'meat'
    },
    {
        keyword: 'tom_yam',
        name: 'Том ям с креветками',
        price: 650,
        category: 'soup',
        count: '500 г',
        image: 'soups/tomyum.jpg',
        kind: 'fish'
    },
    {
        keyword: 'chiken_soup',
        name: 'Куриный суп',
        price: 330,
        category: 'soup',
        count: '350 г',
        image: 'soups/chicken.jpg',
        kind: 'meat'
    },
    {
        keyword: 'fried_potatos_with_mushrooms',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main_course',
        count: '250 г',
        image: 'main_course/friedpotatoeswithmushrooms1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'lasagna',
        name: 'Лазанья',
        price: 385,
        category: 'main_course',
        count: '310 г',
        image: 'main_course/lasagna.jpg',
        kind: 'meat'
    },
    {
        keyword: 'chicken_cutlets_and_mashed_potatoes',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 225,
        category: 'main_course',
        count: '280 г',
        image: 'main_course/chickencutletsandmashedpotatoes.jpg',
        kind: 'meat'
    },
    {
        keyword: "fish_cutlet_with_rice_and_asparagus",
        name: "Рыбная котлета с рисом и спаржей",
        price: 320,
        category: "main_course",
        count: "270 г",
        image: "main_course/fishrice.jpg",
        kind: "fish"
    },
    {
        keyword: "pizza_margarita",
        name: "Пицца Маргарита",
        price: 450,
        category: "main_course",
        count: "470 г",
        image: "main_course/pizza.jpg",
        kind: "veg"
    },
    {
        keyword: "pasta_with_shrimp",
        name: "Паста с креветками",
        price: 340,
        category: "main_course",
        count: "280 г",
        image: "main_course/shrimppasta.jpg",
        kind: "fish"
    },
    {
        keyword: "korean_salad_with_vegetables_and_egg",
        name: "Корейский салат с овощами и яйцом",
        price: 330,
        category: "salad",
        count: "250 г",
        image: "salads_starters/saladwithegg.jpg",
        kind: "veg"
    },
    {
        keyword: "caesar_with_chicken",
        name: "Цезарь с цыпленком",
        price: 370,
        category: "salad",
        count: "220 г",
        image: "salads_starters/caesar.jpg",
        kind: "meat"
    },
    {
        keyword: "caprese_with_mozzarella",
        name: "Капрезе с моцареллой",
        price: 350,
        category: "salad",
        count: "235 г",
        image: "salads_starters/caprese.jpg",
        kind: "veg"
    },
    {
        keyword: "tuna_salad",
        name: "Салат с тунцом",
        price: 480,
        category: "salad",
        count: "250 г",
        image: "salads_starters/tunasalad.jpg",
        kind: "fish"
    },
    {
        keyword: "french_fries_with_caesar_sauce",
        name: "Картофель фри с соусом Цезарь",
        price: 280,
        category: "salad",
        count: "235 г",
        image: "salads_starters/frenchfries1.jpg",
        kind: "veg"
    },
    {
        keyword: "french_fries_with_ketchup",
        name: "Картофель фри с кетчупом",
        price: 260,
        category: "salad",
        count: "235 г",
        image: "salads_starters/frenchfries2.jpg",
        kind: "veg"
    },
    {
        keyword: 'orange_juice',
        name: 'Апeльсиновый сок',
        price: 120,
        category: 'beverages',
        count: '300 мл',
        image: 'beverages/orangejuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'apple_juice',
        name: 'Яблочный сок',
        price: 90,
        category: 'beverages',
        count: '300 мл',
        image: 'beverages/applejuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'carrot_juice',
        name: 'Морковный сок',
        price: 120,
        category: 'beverages',
        count: '300 мл',
        image: 'beverages/carrotjuice.jpg',
        kind: 'cold'
    },
    {
        keyword: "cappuccino",
        name: "Капучино",
        price: 180,
        category: "beverages",
        count: "300 мл",
        image: "beverages/cappuccino.jpg",
        kind: "hot"
    },
    {
        keyword: "green_tea",
        name: "Зеленый чай",
        price: 100,
        category: "beverages",
        count: "300 мл",
        image: "beverages/greentea.jpg",
        kind: "hot"
    },
    {
        keyword: "black_tea",
        name: "Черный чай",
        price: 90,
        category: "beverages",
        count: "300 мл",
        image: "beverages/tea.jpg",
        kind: "hot"
    },
    {
        keyword: "baklava",
        name: "Пахлава",
        price: 220,
        category: "dessert",
        count: "300 г",
        image: "desserts/baklava.jpg",
        kind: "medium"
    },
    {
        keyword: "cheesecake",
        name: "Чизкейк",
        price: 240,
        category: "dessert",
        count: "125 г",
        image: "desserts/checheesecake.jpg",
        kind: "small"
    },
    {
        keyword: "chocolate_cheesecake",
        name: "Шоколадный чизкейк",
        price: 260,
        category: "dessert",
        count: "125 г",
        image: "desserts/chocolatecheesecake.jpg",
        kind: "small"
    },
    {
        keyword: "chocolate_cake",
        name: "Шоколадный торт",
        price: 270,
        category: "dessert",
        count: "140 г",
        image: "desserts/chocolatecake.jpg",
        kind: "small"
    },
    {
        keyword: "donuts_3",
        name: "Пончики (3 штуки)",
        price: 410,
        category: "dessert",
        count: "350 г",
        image: "desserts/donuts2.jpg",
        kind: "medium"
    },
    {
        keyword: "donuts_6",
        name: "Пончики (6 штук)",
        price: 650,
        category: "dessert",
        count: "700 г",
        image: "desserts/donuts.jpg",
        kind: "large"
    },
];

