export const MARKETS_DATA = [
    {
        'id': 1,
        'name': 'Spinneys',
        'delivery': false,
        'phone': '00123456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'beirut',
            'longitude': 100,
            'latitude': 200
        },
    },
    {
        'id': 2,
        'name': 'Fresh Mart',
        'delivery': true,
        'phone': '09123456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'beirut',
            'longitude': 120,
            'latitude': 250
        }
    },
    {
        'id': 3,
        'name': 'Bekai',
        'delivery': true,
        'phone': '09133356',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'beirut',
            'longitude': 220,
            'latitude': 550
        }
    },
    {
        'id': 4,
        'name': 'Total',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
    {
        'id': 5,
        'name': 'Tawfeer',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
    {
        'id': 6,
        'name': 'Charcutier ',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
    {
        'id': 7,
        'name': 'Carrefour ',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
    {
        'id': 8,
        'name': 'Hilaliyeh',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
    {
        'id': 9,
        'name': 'Al Forno',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
    {
        'id': 10,
        'name': 'Chamsine',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
    {
        'id': 11,
        'name': 'Spinneys',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
    {
        'id': 12,
        'name': 'Spinneys',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
    {
        'id': 13,
        'name': 'Spinneys',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
    {
        'id': 14,
        'name': 'Spinneys',
        'delivery': true,
        'phone': '09163456',
        'logo': '../../assets/fresh-mart.png',
        'address': {
            'text': 'tripoli',
            'longitude': 520,
            'latitude': 850
        }
    },
]

export const USERS_DATA = [
    {
        "id": 1,
        "first_name": 'Ghina',
        "last_name": 'Baassiri',
        "profile_image": '../../assets/woman.png',
        "phone": '33344455',
        "email": 'ghina@gmail.com',
        "address": {
            'text': 'tripoli',
            'longitude': 5120,
            'latitude': 8650
        }
    },
    {
        "id": 2,
        "first_name": 'John',
        "last_name": 'Doe',
        "profile_image": '../../assets/man.png',
        "phone": '33399455',
        "email": 'john@gmail.com',
        "address": {
            'text': 'saida',
            'longitude': 720,
            'latitude': 1650
        }
    }
]

export const PRODUCTS_DATA = [
    {
        "id": 1,
        "brand": 'Pepsi',
        "size": 150,
        "image": '../../assets/pepsi.png',
        "unit": {
            'id': 1,
            'name': 'ml'
        },
        'category': {
            'id': 1,
            'name': 'Drinks'
        }        
    },
    {
        "id": 2,
        "brand": 'Zup',
        "size": 150,
        "image": '../../assets/pepsi.png',
        "unit": {
            'id': 1,
            'name': 'ml'
        },
        'category': {
            'id': 1,
            'name': 'Drinks'
        }
    },
    {
        "id": 3,
        "brand": 'Sea Blue',
        "size": 500,
        "image": '../../assets/pepsi.png',
        "unit": {
            'id': 1,
            'name': 'mg'
        },
        'category': {
            'id': 2,
            'name': 'Sea Food'
        }
    }
]

export const PRICES_DATA = [
    {
        'product_id': 1,
        'market_id': 2,
        'price': 3000
    },
    {
        'product_id': 1,
        'market_id': 1,
        'price': 2500
    },
    {
        'product_id': 2,
        'market_id': 1,
        'price': 3000
    },
    {
        'product_id': 2,
        'market_id': 1,
        'price': null
    }
]

export const RATINGS_DATA = [
    {
        'user_id': 1,
        'market_id': 2,
        'rating': 5
    },
    {
        'user_id': 2,
        'market_id': 3,
        'rating': 5
    },
    {
        'user_id': 1,
        'market_id': 1,
        'rating': 4
    },
    {
        'user_id': 1,
        'market_id': 4,
        'rating': 3
    }
]