// Thanks to supermarketapi.com
var jsonStores = {
    "item1": {
        "location": ["Location:", "ShopRite"],
        "productBrand": ["Brand:", "Goya"],
        "productName": ["Name:", "Beans"],
        "description": ["Description:", "blackeyed peas dried beans"],
        "productRating": ["Rating:", "5"],
        "price": ["Price:", "0.79"],
        "tax": ["Taxable:", "Yes"],
        "datePurchased": ["Date:", "09/01/2013"],
        "size": ["Size:", "15 oz"]
    },
    "item2": {
        "location": ["Location:", "Acme"],
        "productBrand": ["Brand:", "Progresso"],
        "productName": ["Name:", "Soup"],
        "description": ["Description:", ""],
        "productRating": ["Rating:", "3"],
        "price": ["Price:", "1.50"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/02/2013"],
        "size": ["Size:", "15 oz"]
    },
    "item3": {
        "location": ["Location:", "SuperFresh"],
        "productBrand": ["Brand:", "Bush\'s"],
        "productName": ["Name:", "Baked Beans"],
        "description": ["Description:", "Veg"],
        "productRating": ["Rating:", "5"],
        "price": ["Price:", "0.99"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/03/2013"],
        "size": ["Size:", "24 oz"]
    },
    "item4": {
        "location": ["Location:", "Giant"],
        "productBrand": ["Brand:", "Scott"],
        "productName": ["Name:", "Paper Towels"],
        "description": ["Description:", "paper aisle"],
        "productRating": ["Rating:", "3"],
        "price": ["Price:", "5.99"],
        "tax": ["Taxable:", "Yes"],
        "datePurchased": ["Date:", "09/04/2013"],
        "size": ["Size:", "6rl"]
    },
    "item5": {
        "location": ["Location:", "Target"],
        "productBrand": ["Brand:", "Purex"],
        "productName": ["Name:", "Laundry Detergent"],
        "description": ["Description:", "tablets too"],
        "productRating": ["Rating:", "5"],
        "price": ["Price:", "1.88"],
        "tax": ["Taxable:", "Yes"],
        "datePurchased": ["Date:", "09/05/2013"],
        "size": ["Size:", "50 oz"]
    },
    "item6": {
        "location": ["Location:", "ShopRite"],
        "productBrand": ["Brand:", "Maier\'s"],
        "productName": ["Name:", "Italian Bread"],
        "description": ["Description:", ""],
        "productRating": ["Rating:", "1"],
        "price": ["Price:", "3.99"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/06/2013"],
        "size": ["Size:", "20 oz loaf"]
    },
    "item7": {
        "location": ["Location:", "Acme"],
        "productBrand": ["Brand:", "Klondike"],
        "productName": ["Name:", "Bars"],
        "description": ["Description:", "coupon only"],
        "productRating": ["Rating:", "3"],
        "price": ["Price:", "0.99"],
        "tax": ["Taxable:", "Yes"],
        "datePurchased": ["Date:", "09/07/2013"],
        "size": ["Size:", "6 bars"]
    },
    "item8": {
        "location": ["Location:", "SuperFresh"],
        "productBrand": ["Brand:", "Campbell\'s"],
        "productName": ["Name:", "Chunky Soups"],
        "description": ["Description:", "Chili"],
        "productRating": ["Rating:", "4"],
        "price": ["Price:", "1.67"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/08/2013"],
        "size": ["Size:", "19 oz"]
    },
    "item9": {
        "location": ["Location:", "Giant"],
        "productBrand": ["Brand:", "Prego"],
        "productName": ["Name:", "Pasta Sauce"],
        "description": ["Description:", ""],
        "productRating": ["Rating:", "4"],
        "price": ["Price:", "2.00"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/09/2013"],
        "size": ["Size:", "24 oz"]
    },
    "item10": {
        "location": ["Location:", "Target"],
        "productBrand": ["Brand:", "V8"],
        "productName": ["Name:", "Splash"],
        "description": ["Description:", "juice drink"],
        "productRating": ["Rating:", "4"],
        "price": ["Price:", "2.00"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/10/2013"],
        "size": ["Size:", "64 oz"]
    },
    "item11": {
        "location": ["Location:", "WalMart"],
        "productBrand": ["Brand:", "Gatorade"],
        "productName": ["Name:", "Sports Drink"],
        "description": ["Description:", "fruit punch grape lemon lime"],
        "productRating": ["Rating:", "3"],
        "price": ["Price:", "0.99"],
        "tax": ["Taxable:", "Yes"],
        "datePurchased": ["Date:", "09/11/2013"],
        "size": ["Size:", "32 oz"]
    },
    "item12": {
        "location": ["Location:", "ShopRite"],
        "productBrand": ["Brand:", "Del Monte"],
        "productName": ["Name:", "Canned Fruit"],
        "description": ["Description:", "pears fruit cocktail"],
        "productRating": ["Rating:", "4"],
        "price": ["Price:", "1.25"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/12/2013"],
        "size": ["Size:", "15 oz"]
    },
    "item13": {
        "location": ["Location:", "Acme"],
        "productBrand": ["Brand:", "Brach's"],
        "productName": ["Name:", "Candy Corn"],
        "description": ["Description:", ""],
        "productRating": ["Rating:", "4"],
        "price": ["Price:", "1.50"],
        "tax": ["Taxable:", "Yes"],
        "datePurchased": ["Date:", "09/13/2013"],
        "size": ["Size:", "9 or 15 oz"]
    },
    "item14": {
        "location": ["Location:", "SuperFresh"],
        "productBrand": ["Brand:", "Celeste"],
        "productName": ["Name:", "Pizza for One"],
        "description": ["Description:", "frozen pizza limit 4"],
        "productRating": ["Rating:", "5"],
        "price": ["Price:", "0.88"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/14/2013"],
        "size": ["Size:", "4-6 oz box"]
    },
    "item15": {
        "location": ["Location:", "Giant"],
        "productBrand": ["Brand:", "Stouffer\'s"],
        "productName": ["Name:", "Mac & Cheese"],
        "description": ["Description:", "Veg"],
        "productRating": ["Rating:", "5"],
        "price": ["Price:", "1.88"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/15/2013"],
        "size": ["Size:", "12 oz"]
    },
    "item16": {
        "location": ["Location:", "Target"],
        "productBrand": ["Brand:", "Barilla"],
        "productName": ["Name:", "Pasta"],
        "description": ["Description:", "pasta"],
        "productRating": ["Rating:", "5"],
        "price": ["Price:", "0.88"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/16/2013"],
        "size": ["Size:", "24 oz"]
    },
    "item17": {
        "location": ["Location:", "WalMart"],
        "productBrand": ["Brand:", "Kellogg\'s"],
        "productName": ["Name:", "Cereal"],
        "description": ["Description:", "apple jacks selected varieties"],
        "productRating": ["Rating:", "5"],
        "price": ["Price:", "1.77"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/17/2013"],
        "size": ["Size:", "8.7 oz box"]
    },
    "item18": {
        "location": ["Location:", "ShopRite"],
        "productBrand": ["Brand:", "Betty Crocker"],
        "productName": ["Name:", "Brownies"],
        "description": ["Description:", "i like cheesecake brownies :)"],
        "productRating": ["Rating:", "5"],
        "price": ["Price:", "1.99"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/18/2013"],
        "size": ["Size:", "16 oz mix"]
    },
    "item19": {
        "location": ["Location:", "Acme"],
        "productBrand": ["Brand:", "Clorox"],
        "productName": ["Name:", "Bleach"],
        "description": ["Description:", "lemon scent"],
        "productRating": ["Rating:", "5"],
        "price": ["Price:", "1.50"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/19/2013"],
        "size": ["Size:", "64 oz"]
    },
    "item20": {
        "location": ["Location:", "SuperFresh"],
        "productBrand": ["Brand:", "Chock Full o\' Nuts"],
        "productName": ["Name:", "Coffee"],
        "description": ["Description:", "coffee"],
        "productRating": ["Rating:", "3"],
        "price": ["Price:", "5.99"],
        "tax": ["Taxable:", "No"],
        "datePurchased": ["Date:", "09/20/2013"],
        "size": ["Size:", "33.9 oz can"]
    }
};