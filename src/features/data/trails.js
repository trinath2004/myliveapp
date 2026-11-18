// Curated Trails: ready-made themed routes built from this app's own data.
//
// stops : { district, name, type } where type is "place" (Famous places) or "shop" (Shops & markets) and
//         name must match an entry in src/data/famousPlaces.js or src/data/shopsMarkets.js exactly.
// items : Heritage Hub ids that belong to the trail. "Add to my Cultural Trail" saves these.
// The order of stops is a suggested order. Please check road distances before travelling.

export const TRAILS = [
  {
    id: "pilgrim", name: "Pilgrim Trail", emoji: "🛕", hue: ["#f59e0b", "#b91c1c"], days: "8 to 10 days",
    blurb: "Some of the best-known temples of both states, from Tirumala to Bhadrachalam.",
    stops: [
      { district: "Tirupati", name: "Tirumala Venkateswara Temple", type: "place" },
      { district: "Tirupati", name: "Srikalahasti Temple", type: "place" },
      { district: "Kurnool", name: "Mantralayam Raghavendra Swamy Mutt", type: "place" },
      { district: "Nandyal", name: "Srisailam Mallikarjuna Temple", type: "place" },
      { district: "NTR", name: "Kanaka Durga Temple Bazaar", type: "place" },
      { district: "Bhadradri Kothagudem", name: "Bhadrachalam Sri Rama Temple", type: "place" },
      { district: "Yadadri Bhuvanagiri", name: "Yadagirigutta Lakshmi Narasimha Temple", type: "place" },
      { district: "Nirmal", name: "Basar Gnana Saraswati Temple", type: "place" },
    ],
    items: ["h-tirupati-laddu", "h-srikalahasti", "h-tirupati-idols", "h-nirmal"],
  },
  {
    id: "handloom-ts", name: "Handloom Trail: Telangana", emoji: "🧵", hue: ["#be185d", "#7c3aed"], days: "4 to 5 days",
    blurb: "Weaving towns of Telangana, from ikat at Pochampally to durries in Warangal.",
    stops: [
      { district: "Yadadri Bhuvanagiri", name: "Pochampally Handloom Park", type: "shop" },
      { district: "Siddipet", name: "Siddipet Gollabhama Sarees", type: "shop" },
      { district: "Rajanna Sircilla", name: "Sircilla Textile Market", type: "shop" },
      { district: "Warangal", name: "Warangal Dhurries", type: "shop" },
      { district: "Jogulamba Gadwal", name: "Gadwal Sarees", type: "shop" },
      { district: "Narayanpet", name: "Narayanpet Handloom Sarees", type: "shop" },
    ],
    items: ["h-pochampally", "h-puttapaka", "h-gollabhama", "h-sircilla", "h-warangal-durrie", "h-gadwal", "h-narayanpet"],
  },
  {
    id: "handloom-ap", name: "Handloom Trail: Andhra Pradesh", emoji: "🥻", hue: ["#0e7490", "#7c3aed"], days: "5 to 7 days",
    blurb: "Kalamkari, silk and cotton towns across Andhra Pradesh.",
    stops: [
      { district: "Srikakulam", name: "Palasa Cashew Market", type: "shop" },
      { district: "Kakinada", name: "Uppada Jamdani Sarees", type: "shop" },
      { district: "Krishna", name: "Machilipatnam Kalamkari", type: "shop" },
      { district: "Guntur", name: "Mangalagiri Handloom Sarees", type: "shop" },
      { district: "Bapatla", name: "Chirala Handloom Sarees", type: "shop" },
      { district: "Sri Sathya Sai", name: "Dharmavaram Silk Sarees", type: "shop" },
      { district: "Tirupati", name: "Venkatagiri Handloom Sarees", type: "shop" },
      { district: "Tirupati", name: "Srikalahasti Kalamkari", type: "shop" },
    ],
    items: ["h-ponduru-khadi", "h-uppada-jamdani", "h-machilipatnam-kalamkari", "h-pedana-kalamkari", "h-mangalagiri", "h-chirala", "h-dharmavaram", "h-venkatagiri", "h-srikalahasti"],
  },
  {
    id: "godavari-food", name: "Godavari Food Trail", emoji: "🍬", hue: ["#ea580c", "#be185d"], days: "3 to 4 days",
    blurb: "Sweets, snacks and river-delta flavours from Kakinada to Konaseema and the Godavari hills.",
    stops: [
      { district: "Kakinada", name: "Kotaiah Kaja", type: "shop" },
      { district: "Kakinada", name: "Subbayya Gari Hotel", type: "shop" },
      { district: "East Godavari", name: "Innespeta Shopping Area", type: "shop" },
      { district: "Dr. B.R. Ambedkar Konaseema", name: "Atreyapuram Putharekulu", type: "shop" },
      { district: "West Godavari", name: "Narsapur Crochet Lace", type: "shop" },
      { district: "Polavaram", name: "Maredumilli Bamboo Chicken", type: "shop" },
    ],
    items: ["h-kakinada-kaja", "h-putharekulu", "h-narsapur-lace"],
  },
  {
    id: "forts-ts", name: "Forts of Telangana", emoji: "🏰", hue: ["#475569", "#b45309"], days: "5 to 6 days",
    blurb: "A loop of Telangana's hill and plain forts. The items listed are crafts to look for along the way.",
    stops: [
      { district: "Hyderabad", name: "Golconda Fort", type: "place" },
      { district: "Yadadri Bhuvanagiri", name: "Bhongir Fort", type: "place" },
      { district: "Warangal", name: "Warangal Fort", type: "place" },
      { district: "Karimnagar", name: "Elgandal Fort", type: "place" },
      { district: "Nirmal", name: "Nirmal Fort", type: "place" },
      { district: "Nizamabad", name: "Nizamabad Fort", type: "place" },
      { district: "Medak", name: "Medak Fort", type: "place" },
    ],
    items: ["h-pearls", "h-warangal-durrie", "h-filigree", "h-nirmal"],
  },
  {
    id: "buddhist", name: "Buddhist Heritage Trail", emoji: "☸️", hue: ["#0f766e", "#1d4ed8"], days: "5 to 6 days",
    blurb: "Stupas, monasteries and island museums from the coast of Andhra to the hills of Telangana.",
    stops: [
      { district: "Visakhapatnam", name: "Thotlakonda Buddhist Complex", type: "place" },
      { district: "Anakapalli", name: "Bojjannakonda Buddhist Caves", type: "place" },
      { district: "Palnadu", name: "Amaravati Mahastupa", type: "place" },
      { district: "Nalgonda", name: "Nagarjuna Konda Island Museum", type: "place" },
      { district: "Nalgonda", name: "Buddhavanam", type: "place" },
      { district: "Khammam", name: "Nelakondapalli Buddhist Site", type: "place" },
      { district: "Sangareddy", name: "Kondapur Archaeological Museum", type: "place" },
    ],
    items: [],
  },
  {
    id: "araku", name: "Araku Hills & Coffee Trail", emoji: "☕", hue: ["#78350f", "#15803d"], days: "3 days",
    blurb: "From the Visakhapatnam coast up into the cool Eastern Ghats: toys, coffee, caves and waterfalls.",
    stops: [
      { district: "Visakhapatnam", name: "Kailasagiri Hill Park", type: "place" },
      { district: "Anakapalli", name: "Etikoppaka Lacquer Toys", type: "shop" },
      { district: "Alluri Sitharama Raju", name: "Araku Coffee House", type: "shop" },
      { district: "Alluri Sitharama Raju", name: "Borra Caves", type: "place" },
      { district: "Alluri Sitharama Raju", name: "Lambasingi", type: "place" },
      { district: "Alluri Sitharama Raju", name: "Katiki Waterfalls", type: "place" },
    ],
    items: ["h-etikoppaka", "h-araku-coffee"],
  },
  {
    id: "old-city", name: "Hyderabad Old City Trail", emoji: "🕌", hue: ["#7c3aed", "#db2777"], days: "1 to 2 days",
    blurb: "Charminar, bangles, pearls and the great food lanes of the Old City.",
    stops: [
      { district: "Hyderabad", name: "Charminar", type: "place" },
      { district: "Hyderabad", name: "Laad Bazaar", type: "shop" },
      { district: "Hyderabad", name: "Mecca Masjid", type: "place" },
      { district: "Hyderabad", name: "Chowmahalla Palace", type: "place" },
      { district: "Hyderabad", name: "Pista House", type: "shop" },
      { district: "Hyderabad", name: "Karachi Bakery", type: "shop" },
    ],
    items: ["h-haleem", "h-pearls", "h-lac-bangles", "h-khubani", "h-osmania-biscuit"],
  },
];
