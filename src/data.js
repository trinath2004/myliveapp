// src/data.js  -  Andhra Pradesh (28 districts) and Telangana (33 districts)
// Helper: s(name, type, description, mapSearchText)
const ICONS = {
  Market: "🛒", Shopping: "🛍️", Food: "🍛", Sweets: "🍬", Handloom: "🧵",
  Handicrafts: "🎎", Temple: "🛕", Bakery: "🍪", Bangles: "💍", Beach: "🏖️", Tourism: "🏞️",
};
const s = (name, type, desc, area) => ({ name, type, icon: ICONS[type] || "📍", desc, area });

export const DATA = {
  "Andhra Pradesh": {
    Srikakulam: [
      s("Palasa Cashew Market", "Market", "Palasa is well known for cashew processing and trade.", "Palasa Cashew Market, Srikakulam"),
      s("Arasavalli Sun Temple Bazaar", "Temple", "Shops for pooja items and souvenirs near the famous Sun Temple.", "Arasavalli Sun Temple, Srikakulam"),
      s("Day and Night Junction", "Shopping", "Central commercial junction of Srikakulam town.", "Day and Night Junction, Srikakulam"),
    ],
    "Parvathipuram Manyam": [
      s("Parvathipuram Main Market", "Market", "Main town market for daily needs and local produce.", "Parvathipuram Main Market, Parvathipuram Manyam"),
      s("Saluru Market", "Market", "Busy trading town market of the district.", "Saluru Market, Parvathipuram Manyam"),
    ],
    Vizianagaram: [
      s("Bobbili Veena Makers", "Handicrafts", "Bobbili is famous for its handmade veenas.", "Bobbili Veena, Bobbili, Vizianagaram"),
      s("Gantasthambham Market Area", "Shopping", "Clock tower area with the busiest shops in town.", "Gantasthambham, Vizianagaram"),
      s("Vizianagaram Fort", "Tourism", "Historic fort with nearby bazaars.", "Vizianagaram Fort, Vizianagaram"),
    ],
    Visakhapatnam: [
      s("Poorna Market", "Market", "Central market for vegetables, groceries and daily needs.", "Poorna Market, Visakhapatnam"),
      s("Jagadamba Centre", "Shopping", "Famous shopping junction with textile and jewellery stores.", "Jagadamba Junction, Visakhapatnam"),
      s("RK Beach Food Stalls", "Food", "Street snacks and seafood along the beach road.", "RK Beach, Visakhapatnam"),
    ],
    "Alluri Sitharama Raju": [
      s("Araku Coffee House", "Food", "Try the famous Araku Valley coffee.", "Araku Coffee House, Araku Valley"),
      s("Araku Tribal Museum", "Handicrafts", "Tribal culture and handicrafts of the Araku region.", "Tribal Museum, Araku Valley"),
      s("Paderu Weekly Market", "Market", "Tribal weekly market with local produce.", "Paderu Market, Alluri Sitharama Raju district"),
    ],
    Anakapalli: [
      s("Anakapalli Jaggery Market", "Market", "One of the largest jaggery markets in India.", "Anakapalli Jaggery Market, Anakapalli"),
      s("Etikoppaka Lacquer Toys", "Handicrafts", "Colourful lacquered wooden toys with GI status.", "Etikoppaka, Anakapalli district"),
    ],
    Kakinada: [
      s("Kotaiah Kaja", "Sweets", "Famous Kakinada Kaja sweet shop.", "Kotaiah Kaja, Kakinada"),
      s("Subbayya Gari Hotel", "Food", "Well-known traditional Andhra meals restaurant.", "Subbayya Gari Hotel, Kakinada"),
      s("Uppada Jamdani Sarees", "Handloom", "Uppada is famous for silk Jamdani sarees.", "Uppada Handloom, Kakinada district"),
    ],
    "East Godavari": [
      s("Innespeta Shopping Area", "Shopping", "Popular commercial area in Rajahmundry.", "Innespeta, Rajahmundry"),
      s("Pushkar Ghat Stalls", "Food", "Snacks and souvenirs along the Godavari river.", "Pushkar Ghat, Rajahmundry"),
    ],
    "Dr. B.R. Ambedkar Konaseema": [
      s("Atreyapuram Putharekulu", "Sweets", "Paper-thin sweet with GI status, made in Atreyapuram.", "Atreyapuram Putharekulu Shops, Konaseema"),
      s("Amalapuram Coconut Market", "Market", "Konaseema is known as the coconut belt of Andhra.", "Amalapuram Market, Konaseema"),
    ],
    Eluru: [
      s("Eluru Carpet Weavers", "Handicrafts", "Eluru is known for handmade woollen carpets.", "Eluru Carpets, Eluru"),
      s("Powerpet Market", "Shopping", "Main shopping locality of Eluru.", "Powerpet, Eluru"),
    ],
    "West Godavari": [
      s("Narsapur Crochet Lace", "Handicrafts", "Famous lace craft of Narsapuram with GI status.", "Narsapur Lace Park, West Godavari"),
      s("Bhimavaram Main Market", "Market", "Large commercial market of the district.", "Bhimavaram Main Market, West Godavari"),
      s("Tanuku Market", "Market", "Busy trading town market.", "Tanuku Market, West Godavari"),
    ],
    NTR: [
      s("Kondapalli Toys", "Handicrafts", "Wooden toys with GI status made at Kondapalli.", "Kondapalli Toys, NTR district"),
      s("Governorpet Market", "Shopping", "Busy shopping locality of Vijayawada.", "Governorpet, Vijayawada"),
      s("Kanaka Durga Temple Bazaar", "Temple", "Shops near the famous Indrakeeladri temple.", "Kanaka Durga Temple, Vijayawada"),
    ],
    Krishna: [
      s("Bandar Laddu", "Sweets", "Machilipatnam's famous laddu.", "Bandar Laddu, Machilipatnam"),
      s("Machilipatnam Kalamkari", "Handloom", "Block printed Kalamkari fabrics.", "Kalamkari, Machilipatnam"),
      s("Pedana Kalamkari", "Handloom", "Traditional hand-painted textile craft.", "Pedana Kalamkari, Krishna district"),
    ],
    Guntur: [
      s("Guntur Mirchi Yard", "Market", "One of Asia's largest red chilli markets.", "Mirchi Yard, Guntur"),
      s("Brodipet Market", "Shopping", "Popular area for clothes and household goods.", "Brodipet, Guntur"),
      s("Mangalagiri Handloom Sarees", "Handloom", "Mangalagiri is known for cotton sarees.", "Mangalagiri Handloom, Guntur district"),
    ],
    Palnadu: [
      s("Narasaraopet Main Bazaar", "Market", "Main commercial hub of Palnadu.", "Narasaraopet Main Bazaar, Palnadu"),
      s("Sattenapalli Market", "Market", "Large local market in Sattenapalli.", "Sattenapalli Market, Palnadu"),
    ],
    Bapatla: [
      s("Chirala Handloom Sarees", "Handloom", "Chirala is known for handloom cotton sarees.", "Chirala Handloom, Bapatla district"),
      s("Suryalanka Beach Stalls", "Beach", "Beach snacks and seafood stalls.", "Suryalanka Beach, Bapatla"),
      s("Bapatla Main Market", "Market", "Town market for daily needs.", "Bapatla Main Market, Bapatla"),
    ],
    Prakasam: [
      s("Ongole Main Market", "Market", "Central market of Ongole town.", "Ongole Main Market, Prakasam"),
      s("Chimakurthi Granite", "Market", "Chimakurthi is famous for black granite.", "Chimakurthi Granite, Prakasam district"),
    ],
    Markapuram: [
      s("Markapuram Slate Market", "Market", "Markapuram is known for its slate industry.", "Markapuram Slate, Markapuram"),
      s("Markapuram Main Bazaar", "Market", "Main bazaar of the new district headquarters.", "Markapuram Main Bazaar, Markapuram"),
    ],
    "Sri Potti Sriramulu Nellore": [
      s("Stonehousepet Market", "Shopping", "Main commercial area of Nellore.", "Stonehousepet, Nellore"),
      s("Mypadu Beach Seafood Stalls", "Food", "Fresh fish and prawn dishes near the beach.", "Mypadu Beach, Nellore"),
      s("Nellore Rice Market", "Market", "Nellore is known for rice varieties.", "Rice Market, Nellore"),
    ],
    Kurnool: [
      s("Kurnool Onion Market Yard", "Market", "Large agricultural market known for onions.", "Kurnool Market Yard, Kurnool"),
      s("Konda Reddy Fort Area Market", "Market", "Old city market near the historic fort.", "Konda Reddy Buruju, Kurnool"),
    ],
    Nandyal: [
      s("Banaganapalle Mango Market", "Market", "Famous for Banaganapalle mangoes.", "Banaganapalle Mango Market, Nandyal district"),
      s("Mahanandi Temple Bazaar", "Temple", "Shops near the famous Mahanandi temple.", "Mahanandi Temple, Nandyal"),
      s("Nandyal Main Market", "Market", "Central commercial market of Nandyal.", "Nandyal Main Market, Nandyal"),
    ],
    Anantapur: [
      s("Anantapur Groundnut Market Yard", "Market", "Anantapur is known for groundnut cultivation.", "Market Yard, Anantapur"),
      s("Subash Road Market", "Shopping", "Main shopping road of Anantapur.", "Subash Road, Anantapur"),
    ],
    "Sri Sathya Sai": [
      s("Dharmavaram Silk Sarees", "Handloom", "Dharmavaram is famed for silk sarees.", "Dharmavaram Silk Sarees, Sri Sathya Sai district"),
      s("Lepakshi Handicrafts Emporium", "Handicrafts", "Handicrafts near the historic Lepakshi temple.", "Lepakshi Handicrafts Emporium, Lepakshi"),
      s("Puttaparthi Prasanthi Nilayam Bazaar", "Shopping", "Shops and stalls around Puttaparthi.", "Puttaparthi Bazaar, Sri Sathya Sai district"),
    ],
    "YSR Kadapa": [
      s("Proddatur Market", "Market", "Large trading town known for gold and textiles.", "Proddatur Market, Kadapa"),
      s("Kadapa Slab Stone Market", "Market", "Kadapa is known for its natural stone slabs.", "Kadapa Slab Market, Kadapa"),
    ],
    Annamayya: [
      s("Madanapalle Tomato Market", "Market", "One of Asia's biggest tomato markets.", "Tomato Market, Madanapalle"),
      s("Rayachoti Market", "Market", "Main commercial market of Rayachoti.", "Rayachoti Market, Annamayya"),
      s("Horsley Hills", "Tourism", "Hill station near Madanapalle with local stalls.", "Horsley Hills, Annamayya"),
    ],
    Chittoor: [
      s("Chittoor Mango Pulp Units", "Food", "Chittoor is known for mango pulp processing.", "Mango Pulp Factory, Chittoor"),
      s("Kanipakam Temple Bazaar", "Temple", "Shops near the Vinayaka temple.", "Kanipakam Temple, Chittoor"),
      s("Gandhi Road Market", "Shopping", "Main shopping road of Chittoor.", "Gandhi Road, Chittoor"),
    ],
    Tirupati: [
      s("Gandhi Road Market", "Shopping", "Pilgrims' favourite street for sarees, idols and souvenirs.", "Gandhi Road, Tirupati"),
      s("Srikalahasti Kalamkari", "Handloom", "Hand-painted Kalamkari art from Srikalahasti.", "Srikalahasti Kalamkari Centre, Tirupati district"),
      s("Venkatagiri Handloom Sarees", "Handloom", "Famous fine cotton sarees of Venkatagiri.", "Venkatagiri Handloom, Tirupati district"),
      s("Tirumala Laddu Counter", "Sweets", "The famous Tirupati laddu prasadam.", "Tirumala Laddu Counter, Tirumala"),
    ],
    Polavaram: [
      s("Rampachodavaram Tribal Market", "Market", "Tribal produce and crafts in the district headquarters.", "Rampachodavaram Market, Polavaram district"),
      s("Maredumilli Bamboo Chicken", "Food", "Famous forest-style bamboo chicken.", "Maredumilli, Polavaram district"),
    ],
  },

  Telangana: {
    Adilabad: [
      s("Adilabad Dokra Crafts", "Handicrafts", "Traditional tribal metal casting craft.", "Dokra Craft, Adilabad"),
      s("Adilabad Cotton Market", "Market", "Important cotton trading market.", "Cotton Market, Adilabad"),
      s("Gandhi Chowk Market", "Shopping", "Central market of Adilabad.", "Gandhi Chowk, Adilabad"),
    ],
    "Bhadradri Kothagudem": [
      s("Bhadrachalam Temple Bazaar", "Temple", "Shops near the Sri Rama temple.", "Bhadrachalam Temple, Bhadradri Kothagudem"),
      s("Kothagudem Market", "Market", "Main commercial market of the district.", "Kothagudem Market, Bhadradri Kothagudem"),
    ],
    Hanumakonda: [
      s("Hanamkonda Chowrasta", "Shopping", "Busy commercial junction.", "Hanamkonda Chowrasta, Hanumakonda"),
      s("Thousand Pillar Temple Stalls", "Temple", "Souvenir stalls near the historic temple.", "Thousand Pillar Temple, Hanumakonda"),
    ],
    Hyderabad: [
      s("Laad Bazaar", "Bangles", "Historic market near Charminar for lac bangles and pearls.", "Laad Bazaar, Hyderabad"),
      s("Karachi Bakery", "Bakery", "Famous for fruit biscuits.", "Karachi Bakery, Hyderabad"),
      s("Pista House", "Food", "Well-known for Hyderabadi haleem.", "Pista House, Hyderabad"),
      s("Paradise Biryani", "Food", "Iconic Hyderabadi biryani restaurant.", "Paradise Biryani, Secunderabad"),
      s("Begum Bazaar", "Market", "Large wholesale market in the old city.", "Begum Bazaar, Hyderabad"),
    ],
    Jagtial: [
      s("Kondagattu Temple Stalls", "Temple", "Stalls near the Anjaneya Swamy temple.", "Kondagattu, Jagtial"),
      s("Jagtial Mango Market", "Market", "Local market known for mango trade.", "Jagtial Market, Jagtial"),
      s("Dharmapuri Temple Bazaar", "Temple", "Shops near the Narasimha temple.", "Dharmapuri Temple, Jagtial"),
    ],
    Jangaon: [
      s("Pembarthi Brass Craft", "Handicrafts", "Pembarthi is known for brass metal craft.", "Pembarthi, Jangaon"),
      s("Jangaon Market", "Market", "Main town market.", "Jangaon Market, Jangaon"),
    ],
    "Jayashankar Bhupalpally": [
      s("Kaleshwaram Temple Bazaar", "Temple", "Shops near the Kaleshwaram Mukteswara temple.", "Kaleshwaram Temple, Jayashankar Bhupalpally"),
      s("Bhupalpally Main Market", "Market", "Main market of the district.", "Bhupalpally Main Market, Jayashankar Bhupalpally"),
    ],
    "Jogulamba Gadwal": [
      s("Gadwal Sarees", "Handloom", "Famous Gadwal cotton-silk sarees.", "Gadwal Handloom Sarees, Jogulamba Gadwal"),
      s("Alampur Temple Bazaar", "Temple", "Shops near the Jogulamba temple.", "Alampur Temple, Jogulamba Gadwal"),
      s("Gadwal Fort Market", "Market", "Old market near the fort.", "Gadwal Fort, Jogulamba Gadwal"),
    ],
    Kamareddy: [
      s("Kamareddy Main Bazaar", "Market", "Central market of Kamareddy.", "Main Bazaar, Kamareddy"),
      s("Bhiknoor Temple Stalls", "Temple", "Stalls near the Siddi Ramalingeshwara temple.", "Bhiknoor Temple, Kamareddy"),
    ],
    Karimnagar: [
      s("Karimnagar Silver Filigree", "Handicrafts", "Famous silver filigree work with GI status.", "Silver Filigree, Karimnagar"),
      s("Karimnagar Main Market", "Market", "Central market of the city.", "Main Market, Karimnagar"),
    ],
    Khammam: [
      s("Khammam Chilli Market Yard", "Market", "One of the largest chilli markets in Asia.", "Chilli Market Yard, Khammam"),
      s("Khammam Fort", "Tourism", "Historic fort with nearby bazaars.", "Khammam Fort, Khammam"),
    ],
    "Komaram Bheem Asifabad": [
      s("Asifabad Main Market", "Market", "Main market of the district headquarters.", "Asifabad Market, Komaram Bheem Asifabad"),
      s("Jodeghat Memorial Stalls", "Tourism", "Stalls near the Komaram Bheem memorial.", "Jodeghat, Komaram Bheem Asifabad"),
    ],
    Mahabubabad: [
      s("Mahabubabad Main Market", "Market", "Central market of the district.", "Mahabubabad Market, Mahabubabad"),
      s("Kuravi Temple Stalls", "Temple", "Stalls near Kuravi Veerabhadra Swamy temple.", "Kuravi Temple, Mahabubabad"),
    ],
    Mahabubnagar: [
      s("Pillalamarri Banyan Tree", "Tourism", "Famous giant banyan tree with local stalls.", "Pillalamarri, Mahabubnagar"),
      s("Mahabubnagar Main Market", "Market", "Central market of the district.", "Main Market, Mahabubnagar"),
    ],
    Mancherial: [
      s("Mancherial Bazaar", "Market", "Main commercial market of the town.", "Mancherial Market, Mancherial"),
      s("Gudem Temple Stalls", "Temple", "Stalls near Gudem Satyanarayana temple.", "Gudem Temple, Mancherial"),
    ],
    Medak: [
      s("Medak Cathedral Stalls", "Tourism", "Souvenirs near the famous Medak Church.", "Medak Cathedral, Medak"),
      s("Medak Fort Market", "Market", "Market near the historic fort.", "Medak Fort, Medak"),
    ],
    "Medchal-Malkajgiri": [
      s("Kukatpally Market", "Shopping", "Large shopping area of Hyderabad's suburbs.", "Kukatpally, Medchal-Malkajgiri"),
      s("Uppal Market", "Shopping", "Popular commercial area in east Hyderabad.", "Uppal, Medchal-Malkajgiri"),
    ],
    Mulugu: [
      s("Ramappa Temple Stalls", "Temple", "Stalls near the UNESCO World Heritage temple.", "Ramappa Temple, Mulugu"),
      s("Medaram Jatara Market", "Market", "Market at the famous tribal Sammakka Sarakka Jatara.", "Medaram, Mulugu"),
      s("Laknavaram Lake Stalls", "Tourism", "Food stalls near the scenic lake.", "Laknavaram Lake, Mulugu"),
    ],
    Nagarkurnool: [
      s("Nagarkurnool Main Market", "Market", "Central market of the district.", "Nagarkurnool Market, Nagarkurnool"),
      s("Umamaheshwaram Temple Stalls", "Temple", "Stalls near the hill temple.", "Umamaheshwaram, Nagarkurnool"),
    ],
    Nalgonda: [
      s("Nalgonda Main Market", "Market", "Central market of the city.", "Main Market, Nalgonda"),
      s("Nagarjuna Sagar Market", "Market", "Stalls near the Nagarjuna Sagar dam.", "Nagarjuna Sagar, Nalgonda"),
    ],
    Narayanpet: [
      s("Narayanpet Handloom Sarees", "Handloom", "Famous Narayanpet cotton and silk sarees.", "Narayanpet Handloom Sarees, Narayanpet"),
      s("Narayanpet Main Market", "Market", "Central market of the district.", "Narayanpet Market, Narayanpet"),
    ],
    Nirmal: [
      s("Nirmal Toys and Paintings", "Handicrafts", "GI-tagged wooden toys and paintings.", "Nirmal Toys Craft Centre, Nirmal"),
      s("Basar Saraswati Temple Stalls", "Temple", "Stalls near the famous Basar temple.", "Basar Saraswati Temple, Nirmal"),
    ],
    Nizamabad: [
      s("Nizamabad Turmeric Market Yard", "Market", "One of India's major turmeric markets.", "Turmeric Market Yard, Nizamabad"),
      s("Nizamabad Fort Area Market", "Market", "Old city market near the fort.", "Nizamabad Fort, Nizamabad"),
    ],
    Peddapalli: [
      s("Ramagundam Market", "Market", "Large market in the industrial town.", "Ramagundam Market, Peddapalli"),
      s("Peddapalli Main Market", "Market", "Central market of the district.", "Peddapalli Market, Peddapalli"),
    ],
    "Rajanna Sircilla": [
      s("Sircilla Textile Market", "Handloom", "Sircilla is known as a textile town.", "Sircilla Textile, Rajanna Sircilla"),
      s("Vemulawada Temple Stalls", "Temple", "Stalls near Raja Rajeshwara Swamy temple.", "Vemulawada Temple, Rajanna Sircilla"),
    ],
    Rangareddy: [
      s("Shamshabad Market", "Market", "Commercial area near the airport.", "Shamshabad Market, Rangareddy"),
      s("Ibrahimpatnam Market", "Market", "Local market of Ibrahimpatnam.", "Ibrahimpatnam Market, Rangareddy"),
    ],
    Sangareddy: [
      s("Zaheerabad Market", "Market", "Main commercial market of Zaheerabad.", "Zaheerabad Market, Sangareddy"),
      s("Patancheru Market", "Market", "Busy market in the industrial town.", "Patancheru Market, Sangareddy"),
    ],
    Siddipet: [
      s("Siddipet Gollabhama Sarees", "Handloom", "GI-tagged Gollabhama sarees from Siddipet.", "Gollabhama Sarees, Siddipet"),
      s("Komuravelli Temple Stalls", "Temple", "Stalls near the Mallanna temple.", "Komuravelli Temple, Siddipet"),
      s("Siddipet Main Market", "Market", "Central market of the town.", "Siddipet Market, Siddipet"),
    ],
    Suryapet: [
      s("Suryapet Main Bazaar", "Market", "Central bazaar of Suryapet.", "Main Bazaar, Suryapet"),
      s("Suryapet Rice Market", "Market", "Rice trade centre of the district.", "Rice Market, Suryapet"),
    ],
    Vikarabad: [
      s("Tandur Red Gram Market", "Market", "Tandur is famous for red gram (toor dal).", "Tandur Market, Vikarabad"),
      s("Anantagiri Hills Stalls", "Tourism", "Hill station with local snack stalls.", "Anantagiri Hills, Vikarabad"),
      s("Vikarabad Main Market", "Market", "Central market of Vikarabad.", "Vikarabad Market, Vikarabad"),
    ],
    Wanaparthy: [
      s("Wanaparthy Main Market", "Market", "Central market of the district.", "Wanaparthy Market, Wanaparthy"),
      s("Pebbair Market", "Market", "Local trading market.", "Pebbair Market, Wanaparthy"),
    ],
    Warangal: [
      s("Enumamula Market Yard", "Market", "Major agricultural market for chilli and cotton.", "Enumamula Market Yard, Warangal"),
      s("Warangal Dhurries", "Handicrafts", "Traditional handwoven cotton rugs.", "Warangal Dhurries, Warangal"),
      s("Warangal Fort Stalls", "Tourism", "Souvenir stalls near the historic fort.", "Warangal Fort, Warangal"),
    ],
    "Yadadri Bhuvanagiri": [
      s("Pochampally Handloom Park", "Handloom", "Home of the famous Pochampally Ikat sarees.", "Pochampally Handloom Park, Yadadri Bhuvanagiri"),
      s("Yadadri Temple Prasadam Counter", "Sweets", "Prasadam at the Lakshmi Narasimha temple.", "Yadadri Temple, Yadadri Bhuvanagiri"),
      s("Bhuvanagiri Market", "Market", "Main town market.", "Bhuvanagiri Market, Yadadri Bhuvanagiri"),
    ],
  },
};