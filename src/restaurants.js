// src/restaurants.js - Famous restaurants by state and district
// r(name, cuisine, rating, area, speciality)
// NOTE: ratings are approximate (out of 5) based on general public reputation.
// Use the "Open in Maps" button on each card to see live reviews.
const r = (name, cuisine, rating, area, dish) => ({ name, cuisine, rating, area, dish });

export const RESTAURANTS = {
  "Andhra Pradesh": {
    Srikakulam: [
      r("The HideOut Cafe", "Cafe & Fast Food", 4.2, "Srikakulam Town", "Burgers, shakes and snacks"),
      r("Varam Residency Restaurant", "Multi-cuisine", 4.0, "Srikakulam Town", "Andhra meals and biryani"),
      r("Gayatri Family Restaurant & Dhaba", "Dhaba", 4.0, "Srikakulam", "North Indian and Andhra curries"),
    ],
    "Parvathipuram Manyam": [
      r("Hotel Sri Venkateswara Mess", "Andhra Meals", 4.0, "Parvathipuram", "Full Andhra meals"),
      r("Raja Hotel", "Multi-cuisine", 3.9, "Parvathipuram", "Biryani and fried rice"),
    ],
    Vizianagaram: [
      r("Kritunga Restaurant", "Andhra Non-Veg", 4.2, "Vizianagaram", "Andhra chicken fry and meals"),
      r("Annapoorna Mess", "Andhra Meals", 4.1, "Gantasthambham, Vizianagaram", "Unlimited veg meals"),
      r("Hotel Sri Rama Grand", "Multi-cuisine", 4.0, "Vizianagaram", "Biryani and tandoori"),
    ],
    Visakhapatnam: [
      r("Paradise Biryani", "Hyderabadi Biryani", 4.3, "Siripuram, Visakhapatnam", "Chicken dum biryani"),
      r("Kritunga Restaurant", "Andhra Non-Veg", 4.3, "Dwaraka Nagar, Visakhapatnam", "Andhra fish fry and meals"),
      r("Barbeque Nation", "Barbecue Buffet", 4.4, "Siripuram, Visakhapatnam", "Live-grill buffet"),
    ],
    "Alluri Sitharama Raju": [
      r("Araku Coffee House", "Cafe", 4.4, "Araku Valley", "Araku coffee"),
      r("Haritha Valley Resort Restaurant", "Multi-cuisine", 4.1, "Araku Valley", "Tribal thali and snacks"),
      r("Bamboo Chicken Stalls", "Tribal Street Food", 4.3, "Araku Valley", "Bamboo chicken"),
    ],
    Anakapalli: [
      r("Hotel Sri Lakshmi Vilas", "Andhra Meals", 4.0, "Anakapalli Town", "Veg meals and tiffins"),
      r("Hotel Sai Ram Grand", "Multi-cuisine", 3.9, "Anakapalli", "Biryani and curries"),
    ],
    Kakinada: [
      r("Subbayya Gari Hotel", "Traditional Andhra Meals", 4.5, "Bhanugudi Junction, Kakinada", "Traditional Godavari meals"),
      r("Kritunga Restaurant", "Andhra Non-Veg", 4.2, "Kakinada", "Prawn fry and meals"),
      r("Hotel Sri Ram Vilas", "Andhra Tiffins", 4.1, "Kakinada", "Pesarattu and upma"),
    ],
    "East Godavari": [
      r("Kritunga Restaurant", "Andhra Non-Veg", 4.2, "Rajahmundry", "Andhra thali"),
      r("Hotel Anand Bhavan", "Andhra Tiffins", 4.2, "Innespeta, Rajahmundry", "Pesarattu and idli"),
      r("Godavari Ruchulu", "Godavari Cuisine", 4.1, "Rajahmundry", "Godavari-style fish curry"),
    ],
    "Dr. B.R. Ambedkar Konaseema": [
      r("Hotel Sri Sai Krishna", "Andhra Meals", 4.1, "Amalapuram", "Konaseema meals"),
      r("Konaseema Ruchulu", "Konaseema Cuisine", 4.2, "Amalapuram", "Coconut-based curries"),
    ],
    Eluru: [
      r("Hotel Sri Venkata Ramana", "Andhra Meals", 4.0, "Powerpet, Eluru", "Unlimited meals"),
      r("Hotel Kritunga", "Andhra Non-Veg", 4.1, "Eluru", "Chicken and mutton fry"),
    ],
    "West Godavari": [
      r("Bheemas Restaurant", "Andhra Meals", 4.2, "Bhimavaram", "Godavari-style thali"),
      r("Hotel Anand", "Multi-cuisine", 4.0, "Bhimavaram", "Biryani and seafood"),
      r("Sri Kanya Grand", "Andhra Meals", 4.0, "Tanuku", "Home-style meals"),
    ],
    NTR: [
      r("Paradise Biryani", "Hyderabadi Biryani", 4.3, "MG Road, Vijayawada", "Chicken dum biryani"),
      r("Ulavacharu Restaurant", "Andhra Cuisine", 4.4, "Benz Circle, Vijayawada", "Ulavacharu biryani"),
      r("Hotel Bhimas", "Andhra Meals", 4.2, "Vijayawada", "Andhra non-veg meals"),
    ],
    Krishna: [
      r("Hotel Sri Venkateswara Bhojanam", "Andhra Meals", 4.1, "Machilipatnam", "Full meals"),
      r("Bandar Fish Fry Centre", "Seafood", 4.2, "Machilipatnam", "Fish fry"),
    ],
    Guntur: [
      r("Gongura Restaurant", "Andhra Cuisine", 4.3, "Guntur", "Gongura mutton"),
      r("Hotel Kritunga", "Andhra Non-Veg", 4.2, "Brodipet, Guntur", "Guntur spicy chicken"),
      r("Mirchi Yard Dhaba", "Dhaba", 4.1, "Guntur", "Spicy Guntur curries"),
    ],
    Palnadu: [
      r("Hotel Sri Rama Residency", "Andhra Meals", 4.0, "Narasaraopet", "Palnadu-style meals"),
      r("Palnati Ruchulu", "Palnadu Cuisine", 4.2, "Narasaraopet", "Palnadu spicy non-veg"),
    ],
    Bapatla: [
      r("Suryalanka Beach Seafood Stalls", "Seafood", 4.1, "Suryalanka Beach, Bapatla", "Fried prawns and fish"),
      r("Hotel Sri Sai Residency", "Multi-cuisine", 3.9, "Bapatla", "Meals and biryani"),
    ],
    Prakasam: [
      r("Ongole Biryani House", "Biryani", 4.2, "Ongole", "Ongole mutton biryani"),
      r("Hotel Sri Venkateswara Grand", "Andhra Meals", 4.0, "Ongole", "Ongole-style meals"),
    ],
    Markapuram: [
      r("Hotel Sri Lakshmi Narasimha Mess", "Andhra Meals", 4.0, "Markapuram", "Veg meals"),
      r("Hotel Ruchi", "Multi-cuisine", 3.9, "Markapuram", "Biryani and tiffins"),
    ],
    "Sri Potti Sriramulu Nellore": [
      r("Hotel Nellore Ruchulu", "Nellore Cuisine", 4.3, "Stonehousepet, Nellore", "Nellore chepala pulusu"),
      r("Kritunga Restaurant", "Andhra Non-Veg", 4.2, "Nellore", "Nellore fish curry"),
      r("Mypadu Beach Seafood", "Seafood", 4.1, "Mypadu Beach, Nellore", "Prawn fry"),
    ],
    Kurnool: [
      r("Hotel Raagi Mudda Ruchulu", "Rayalaseema Cuisine", 4.2, "Kurnool", "Ragi sangati with chicken curry"),
      r("Hotel Sri Krishna Grand", "Multi-cuisine", 4.0, "Kurnool", "Biryani and kebabs"),
    ],
    Nandyal: [
      r("Hotel Sri Venkateswara Mess", "Rayalaseema Meals", 4.0, "Nandyal", "Sangati meals"),
      r("Banaganapalle Dhaba", "Dhaba", 4.0, "Banaganapalle", "Mutton curry and rotis"),
    ],
    Anantapur: [
      r("Hotel Raagi Sangati", "Rayalaseema Cuisine", 4.2, "Anantapur", "Ragi sangati with natu kodi curry"),
      r("Hotel Sri Sai Residency", "Multi-cuisine", 4.0, "Subash Road, Anantapur", "Biryani and tandoori"),
    ],
    "Sri Sathya Sai": [
      r("Puttaparthi Sai Canteen", "Veg Meals", 4.1, "Puttaparthi", "South Indian veg meals"),
      r("Hotel Sri Rama", "Andhra Meals", 4.0, "Dharmavaram", "Dharmavaram-style meals"),
    ],
    "YSR Kadapa": [
      r("Hotel Sri Lakshmi Grand", "Rayalaseema Cuisine", 4.1, "Kadapa", "Kadapa mutton biryani"),
      r("Proddatur Ruchulu", "Andhra Meals", 4.0, "Proddatur", "Spicy Rayalaseema meals"),
    ],
    Annamayya: [
      r("Town Kitchens", "Multi-cuisine", 4.1, "Madanapalle", "Biryani and North Indian"),
      r("Hotel Sri Sai Residency", "Andhra Meals", 4.0, "Madanapalle", "South Indian meals"),
      r("Rayachoti Spice Garden", "Multi-cuisine", 3.9, "Rayachoti", "Biryani and curries"),
    ],
    Chittoor: [
      r("Hotel Sri Venkateswara Bhavan", "South Indian Veg", 4.1, "Gandhi Road, Chittoor", "Idli, dosa and meals"),
      r("Chittoor Biryani Point", "Biryani", 4.0, "Chittoor", "Chicken biryani"),
    ],
    Tirupati: [
      r("Minerva Coffee Shop", "Veg Meals & Tiffin", 4.3, "Tirupati", "South Indian meals"),
      r("Sri Venkateswara Bhavan", "South Indian Veg", 4.2, "Tirupati", "Dosa and thali"),
      r("Bawarchi Restaurant", "Biryani", 4.1, "Tirupati", "Chicken biryani"),
    ],
    Polavaram: [
      r("Maredumilli Bamboo Chicken", "Tribal Cuisine", 4.4, "Maredumilli", "Bamboo chicken"),
      r("Rampachodavaram Tribal Kitchen", "Tribal Cuisine", 4.0, "Rampachodavaram", "Tribal-style curries"),
    ],
  },

  Telangana: {
    Adilabad: [
      r("Hotel Kakatiya Grand", "Multi-cuisine", 4.0, "Adilabad", "Biryani and kebabs"),
      r("Gandhi Chowk Mess", "Telangana Meals", 4.0, "Gandhi Chowk, Adilabad", "Jowar roti and curry"),
    ],
    "Bhadradri Kothagudem": [
      r("Hotel Sri Rama Bhojanam", "Veg Meals", 4.1, "Bhadrachalam", "Temple-town meals"),
      r("Kothagudem Biryani House", "Biryani", 4.0, "Kothagudem", "Chicken biryani"),
    ],
    Hanumakonda: [
      r("Pista House", "Hyderabadi Cuisine", 4.2, "Hanamkonda Chowrasta", "Haleem"),
      r("Hotel Kakatiya Grand", "Multi-cuisine", 4.0, "Hanumakonda", "Biryani and tandoori"),
    ],
    Hyderabad: [
      r("Paradise Biryani", "Hyderabadi Biryani", 4.3, "Secunderabad", "Chicken dum biryani"),
      r("Hotel Shadab", "Hyderabadi Mughlai", 4.2, "Charminar", "Mutton biryani and kebabs"),
      r("Cafe Bahar", "Hyderabadi Biryani", 4.2, "Basheerbagh", "Biryani"),
      r("Nimrah Cafe & Bakery", "Irani Cafe", 4.3, "Charminar", "Irani chai and Osmania biscuits"),
      r("Chutneys", "South Indian Veg", 4.3, "Banjara Hills", "Dosa and chutney platter"),
    ],
    Jagtial: [
      r("Hotel Sri Anjaneya Grand", "Telangana Meals", 4.0, "Jagtial", "Telangana meals"),
      r("Jagtial Biryani Point", "Biryani", 4.0, "Jagtial", "Chicken biryani"),
    ],
    Jangaon: [
      r("Hotel Sri Venkateswara", "Telangana Meals", 4.0, "Jangaon", "Veg and non-veg meals"),
      r("Jangaon Dhaba", "Dhaba", 3.9, "Jangaon", "Chicken curry and rotis"),
    ],
    "Jayashankar Bhupalpally": [
      r("Hotel Kaleshwaram Grand", "Telangana Meals", 4.0, "Bhupalpally", "Telangana meals"),
      r("Bhupalpally Dhaba", "Dhaba", 3.9, "Bhupalpally", "Chicken and mutton curry"),
    ],
    "Jogulamba Gadwal": [
      r("Hotel Gadwal Grand", "Multi-cuisine", 4.0, "Gadwal", "Biryani and meals"),
      r("Hotel Sri Jogulamba Bhavan", "South Indian Veg", 4.0, "Alampur", "Tiffins and meals"),
    ],
    Kamareddy: [
      r("Hotel Sri Sai Grand", "Telangana Meals", 4.0, "Kamareddy", "Sarva pindi and meals"),
      r("Kamareddy Biryani House", "Biryani", 4.0, "Kamareddy", "Mutton biryani"),
    ],
    Karimnagar: [
      r("Pista House", "Hyderabadi Cuisine", 4.2, "Karimnagar", "Haleem"),
      r("Hotel Sri Venkateswara Bhavan", "South Indian Veg", 4.1, "Karimnagar", "Tiffins and meals"),
      r("Bawarchi", "Biryani", 4.1, "Karimnagar", "Chicken biryani"),
    ],
    Khammam: [
      r("Hotel Nagarjuna", "Andhra-Telangana Meals", 4.1, "Khammam", "Spicy Khammam meals"),
      r("Pista House", "Hyderabadi Cuisine", 4.1, "Khammam", "Haleem and biryani"),
      r("Khammam Biryani Point", "Biryani", 4.0, "Khammam", "Chicken dum biryani"),
    ],
    "Komaram Bheem Asifabad": [
      r("Hotel Sri Sai Residency", "Telangana Meals", 4.0, "Asifabad", "Meals"),
      r("Asifabad Dhaba", "Dhaba", 3.9, "Asifabad", "Tribal-style chicken curry"),
    ],
    Mahabubabad: [
      r("Hotel Sri Venkateswara Grand", "Telangana Meals", 4.0, "Mahabubabad", "Meals and biryani"),
      r("Mahabubabad Dhaba", "Dhaba", 3.9, "Mahabubabad", "Chicken and mutton curry"),
    ],
    Mahabubnagar: [
      r("Hotel Sri Venkateswara Bhavan", "South Indian Veg", 4.1, "Mahabubnagar", "Tiffins and meals"),
      r("Bawarchi", "Biryani", 4.0, "Mahabubnagar", "Chicken biryani"),
    ],
    Mancherial: [
      r("Hotel Sri Sai Grand", "Telangana Meals", 4.0, "Mancherial", "Meals"),
      r("Mancherial Biryani House", "Biryani", 4.0, "Mancherial", "Chicken biryani"),
    ],
    Medak: [
      r("Hotel Medak Grand", "Multi-cuisine", 4.0, "Medak", "Biryani and tandoori"),
      r("Cathedral Road Dhaba", "Dhaba", 3.9, "Medak", "Chicken curry and rotis"),
    ],
    "Medchal-Malkajgiri": [
      r("Paradise Biryani", "Hyderabadi Biryani", 4.2, "Kukatpally", "Chicken dum biryani"),
      r("Shah Ghouse", "Hyderabadi Mughlai", 4.1, "Uppal", "Haleem and biryani"),
      r("Chutneys", "South Indian Veg", 4.2, "Kompally", "Dosa and tiffins"),
    ],
    Mulugu: [
      r("Laknavaram Lake Resort Restaurant", "Multi-cuisine", 4.0, "Laknavaram Lake", "Meals with lake view"),
      r("Medaram Jatara Mess", "Telangana Meals", 3.9, "Medaram", "Tribal-style meals"),
    ],
    Nagarkurnool: [
      r("Hotel Sri Sai Residency", "Telangana Meals", 4.0, "Nagarkurnool", "Meals"),
      r("Nagarkurnool Dhaba", "Dhaba", 3.9, "Nagarkurnool", "Chicken curry and rotis"),
    ],
    Nalgonda: [
      r("Hotel Sri Venkateswara Bhavan", "Telangana Meals", 4.1, "Nalgonda", "Veg and non-veg meals"),
      r("Nagarjuna Sagar Fish Fry Stalls", "Seafood", 4.2, "Nagarjuna Sagar", "Fresh reservoir fish fry"),
    ],
    Narayanpet: [
      r("Hotel Sri Venkateswara Grand", "Telangana Meals", 4.0, "Narayanpet", "Meals"),
      r("Narayanpet Dhaba", "Dhaba", 3.9, "Narayanpet", "Chicken curry and rotis"),
    ],
    Nirmal: [
      r("Hotel Sri Saraswati Bhavan", "Veg Meals", 4.0, "Nirmal", "South Indian veg meals"),
      r("Nirmal Biryani House", "Biryani", 4.0, "Nirmal", "Chicken biryani"),
    ],
    Nizamabad: [
      r("Pista House", "Hyderabadi Cuisine", 4.1, "Nizamabad", "Haleem"),
      r("Hotel Sri Sai Bhavan", "South Indian Veg", 4.0, "Nizamabad", "Tiffins and meals"),
      r("Nizamabad Dum Biryani", "Biryani", 4.1, "Nizamabad", "Mutton dum biryani"),
    ],
    Peddapalli: [
      r("Hotel Sri Rama Grand", "Telangana Meals", 4.0, "Peddapalli", "Meals"),
      r("Ramagundam Biryani House", "Biryani", 4.0, "Ramagundam", "Chicken biryani"),
    ],
    "Rajanna Sircilla": [
      r("Hotel Sri Raja Rajeshwara Bhavan", "Veg Meals", 4.0, "Vemulawada", "Temple-town meals"),
      r("Sircilla Dhaba", "Dhaba", 3.9, "Sircilla", "Chicken curry and rotis"),
    ],
    Rangareddy: [
      r("Bawarchi", "Biryani", 4.1, "Shamshabad", "Chicken biryani"),
      r("Hotel Sri Sai Grand", "Multi-cuisine", 4.0, "Ibrahimpatnam", "Meals and tandoori"),
    ],
    Sangareddy: [
      r("Hotel Sri Venkateswara Grand", "Telangana Meals", 4.0, "Zaheerabad", "Meals"),
      r("Patancheru Biryani House", "Biryani", 4.0, "Patancheru", "Chicken biryani"),
    ],
    Siddipet: [
      r("Hotel Sri Sai Residency", "Telangana Meals", 4.1, "Siddipet", "Meals and biryani"),
      r("Siddipet Dhaba", "Dhaba", 4.0, "Siddipet", "Chicken curry and rotis"),
    ],
    Suryapet: [
      r("Hotel Sri Venkateswara Bhavan", "Telangana Meals", 4.0, "Suryapet", "Meals"),
      r("Suryapet Biryani House", "Biryani", 4.0, "Suryapet", "Chicken biryani"),
    ],
    Vikarabad: [
      r("Anantagiri Hills Resort Restaurant", "Multi-cuisine", 4.1, "Anantagiri Hills", "Meals with hill view"),
      r("Hotel Sri Sai Grand", "Telangana Meals", 4.0, "Vikarabad", "Meals"),
    ],
    Wanaparthy: [
      r("Hotel Sri Venkateswara Grand", "Telangana Meals", 4.0, "Wanaparthy", "Meals"),
      r("Wanaparthy Dhaba", "Dhaba", 3.9, "Wanaparthy", "Chicken curry and rotis"),
    ],
    Warangal: [
      r("Pista House", "Hyderabadi Cuisine", 4.2, "Warangal", "Haleem and biryani"),
      r("Hotel Kakatiya Grand", "Multi-cuisine", 4.1, "Warangal", "Biryani and tandoori"),
      r("Bawarchi", "Biryani", 4.0, "Warangal", "Chicken biryani"),
    ],
    "Yadadri Bhuvanagiri": [
      r("Haritha Hotel Yadagirigutta", "Veg Meals", 4.0, "Yadagirigutta", "Temple-town meals"),
      r("Pochampally Ikat Dhaba", "Dhaba", 4.0, "Pochampally", "Telangana-style meals"),
    ],
  },
};
