// Signature dishes, sweets and drinks. Used by the "What should I eat?" quiz and the Food Passport.
// Rule-based and written from public knowledge. No AI is involved.
//
// kind     : dish | sweet | snack | drink
// veg      : true if normally vegetarian
// spice    : 1 mild, 2 medium, 3 hot
// sweet    : true for sweets and desserts
// moods    : comfort | adventure | celebrate | quick
// where    : districts where it is easy to find (must exist in the app)
// states   : states where it is found "across the state" (used when a district is not listed)
// heritageId: links to a Heritage Hub item when one exists
// group    : used for badges (biryani | sweets | spicy | coastal)

const AP = "Andhra Pradesh";
const TS = "Telangana";

export const DISHES = [
  { id: "d-hyd-biryani", name: "Hyderabadi dum biryani", emoji: "🍛", kind: "dish", veg: false, spice: 2, sweet: false, moods: ["celebrate", "comfort"], where: ["Hyderabad"], states: [TS], group: "biryani", blurb: "Rice and meat sealed in a pot and cooked on a slow flame, usually with raita and mirchi ka salan." },
  { id: "d-vizag-biryani", name: "Fry-piece biryani", emoji: "🍗", kind: "dish", veg: false, spice: 3, sweet: false, moods: ["celebrate", "adventure"], where: ["Visakhapatnam"], states: [], group: "biryani", blurb: "A Visakhapatnam favourite where fried chicken pieces are layered into the biryani." },
  { id: "d-haleem", name: "Haleem", emoji: "🍲", kind: "dish", veg: false, spice: 2, sweet: false, moods: ["adventure", "celebrate"], where: ["Hyderabad"], states: [], group: "biryani", heritageId: "h-haleem", blurb: "Wheat, lentils and meat slow-cooked to a rich porridge. Most popular in Ramadan." },
  { id: "d-nihari", name: "Nihari and paya breakfast", emoji: "🥣", kind: "dish", veg: false, spice: 2, sweet: false, moods: ["adventure", "comfort"], where: ["Hyderabad"], states: [], blurb: "A slow-cooked early-morning stew eaten with bread, a Hyderabad Old City tradition." },
  { id: "d-meals", name: "Andhra full meals", emoji: "🍽️", kind: "dish", veg: true, spice: 2, sweet: false, moods: ["comfort"], where: [], states: [AP], blurb: "Rice with pappu (dal), several curries, pickle, rasam and curd, served on a banana leaf or a steel plate." },
  { id: "d-pesarattu", name: "Pesarattu with upma", emoji: "🥞", kind: "snack", veg: true, spice: 1, sweet: false, moods: ["quick", "comfort"], where: ["Srikakulam", "Visakhapatnam", "NTR", "East Godavari"], states: [], blurb: "A crisp green gram dosa, often served with ginger chutney and a spoon of upma inside." },
  { id: "d-tiffin", name: "Idli, vada and dosa tiffins", emoji: "🥘", kind: "snack", veg: true, spice: 1, sweet: false, moods: ["quick", "comfort"], where: [], states: [AP, TS], blurb: "Light South Indian breakfast plates found in tiffin centres everywhere." },
  { id: "d-gongura-mutton", name: "Gongura mutton", emoji: "🍖", kind: "dish", veg: false, spice: 3, sweet: false, moods: ["adventure"], where: [], states: [AP, TS], group: "spicy", blurb: "Mutton cooked with tangy gongura (sorrel) leaves. Sour, hot and unmistakably Telugu." },
  { id: "d-natu-kodi", name: "Natu kodi pulusu", emoji: "🍗", kind: "dish", veg: false, spice: 3, sweet: false, moods: ["adventure", "comfort"], where: [], states: [AP, TS], group: "spicy", blurb: "Country chicken in a tamarind-and-chilli gravy, best with rice or ragi sangati." },
  { id: "d-kodi-vepudu", name: "Andhra chicken fry (kodi vepudu)", emoji: "🍗", kind: "dish", veg: false, spice: 3, sweet: false, moods: ["adventure", "quick"], where: [], states: [AP], group: "spicy", blurb: "Dry-fried chicken with curry leaves and plenty of chilli." },
  { id: "d-chepala", name: "Chepala pulusu (fish curry)", emoji: "🐟", kind: "dish", veg: false, spice: 3, sweet: false, moods: ["adventure", "comfort"], where: ["Srikakulam", "Visakhapatnam", "Kakinada", "Krishna", "Bapatla", "Sri Potti Sriramulu Nellore", "Prakasam"], states: [], group: "coastal", blurb: "Tangy tamarind fish curry. Coastal districts do it best, close to the catch." },
  { id: "d-seafood", name: "Fried fish and prawns", emoji: "🍤", kind: "snack", veg: false, spice: 2, sweet: false, moods: ["quick", "adventure"], where: ["Srikakulam", "Visakhapatnam", "Kakinada", "Krishna", "Bapatla", "Sri Potti Sriramulu Nellore"], states: [], group: "coastal", blurb: "Freshly fried seafood from beach-side stalls." },
  { id: "d-bamboo-chicken", name: "Bamboo chicken", emoji: "🎋", kind: "dish", veg: false, spice: 2, sweet: false, moods: ["adventure"], where: ["Alluri Sitharama Raju", "Polavaram", "Parvathipuram Manyam"], states: [], blurb: "Tribal-style chicken cooked inside a bamboo tube over a fire." },
  { id: "d-ragi-sangati", name: "Ragi sangati with chicken curry", emoji: "🍚", kind: "dish", veg: false, spice: 3, sweet: false, moods: ["adventure", "comfort"], where: ["Anantapur", "Kurnool", "YSR Kadapa", "Chittoor", "Nandyal", "Annamayya", "Sri Sathya Sai"], states: [], group: "spicy", blurb: "Finger-millet balls swallowed with a hot Rayalaseema curry." },
  { id: "d-ulavacharu", name: "Ulava charu", emoji: "🥣", kind: "dish", veg: true, spice: 2, sweet: false, moods: ["comfort"], where: [], states: [AP], blurb: "A rich horse gram soup, a classic Andhra comfort food." },
  { id: "d-pulihora", name: "Pulihora (tamarind rice)", emoji: "🍋", kind: "dish", veg: true, spice: 2, sweet: false, moods: ["comfort", "quick"], where: ["Tirupati"], states: [AP, TS], blurb: "Tangy rice that is a staple at festivals and temple prasadam." },
  { id: "d-mirchi-bajji", name: "Mirchi bajji", emoji: "🌶️", kind: "snack", veg: true, spice: 3, sweet: false, moods: ["quick"], where: ["Guntur", "Kurnool"], states: [AP, TS], group: "spicy", blurb: "Large chillies dipped in gram flour batter and fried, a street-side snack." },
  { id: "d-avakaya", name: "Guntur avakaya", emoji: "🥭", kind: "snack", veg: true, spice: 3, sweet: false, moods: ["comfort"], where: ["Guntur"], states: [], group: "spicy", heritageId: "h-guntur-avakaya", blurb: "The famous fiery raw-mango pickle, eaten with hot rice and ghee." },
  { id: "d-sakinalu", name: "Sakinalu", emoji: "🥨", kind: "snack", veg: true, spice: 2, sweet: false, moods: ["quick"], where: ["Karimnagar"], states: [TS], blurb: "A crunchy rice-flour spiral snack made in Telangana homes, especially around Sankranti." },
  { id: "d-sarva-pindi", name: "Sarva Pindi", emoji: "🥞", kind: "snack", veg: true, spice: 2, sweet: false, moods: ["comfort", "quick"], where: ["Karimnagar"], states: [TS], heritageId: "h-sarva-pindi", blurb: "A spicy rice-flour pancake, a Telangana speciality." },
  { id: "d-irani-chai", name: "Irani chai and Osmania biscuit", emoji: "☕", kind: "drink", veg: true, spice: 1, sweet: true, moods: ["quick", "comfort"], where: ["Hyderabad"], states: [], heritageId: "h-osmania-biscuit", blurb: "Sweet, milky Irani chai with a crumbly, salty-sweet Osmania biscuit." },
  { id: "d-araku-coffee", name: "Araku Valley coffee", emoji: "☕", kind: "drink", veg: true, spice: 1, sweet: false, moods: ["comfort", "quick"], where: ["Alluri Sitharama Raju"], states: [], heritageId: "h-araku-coffee", blurb: "Mellow hill-grown Arabica from tribal farming communities." },
  { id: "d-khubani", name: "Khubani ka meetha", emoji: "🍑", kind: "sweet", veg: true, spice: 1, sweet: true, moods: ["celebrate"], where: ["Hyderabad"], states: [], group: "sweets", heritageId: "h-khubani", blurb: "Stewed dried apricots, served with cream or ice cream." },
  { id: "d-double-ka-meetha", name: "Double ka meetha", emoji: "🍞", kind: "sweet", veg: true, spice: 1, sweet: true, moods: ["celebrate", "comfort"], where: ["Hyderabad"], states: [], group: "sweets", blurb: "A rich bread pudding made with ghee, milk and dry fruit." },
  { id: "d-bobbatlu", name: "Bobbatlu", emoji: "🥮", kind: "sweet", veg: true, spice: 1, sweet: true, moods: ["celebrate"], where: [], states: [AP, TS], group: "sweets", blurb: "Soft flatbreads stuffed with sweet lentil filling, made for festivals like Ugadi." },
  { id: "d-putharekulu", name: "Putharekulu", emoji: "🍬", kind: "sweet", veg: true, spice: 1, sweet: true, moods: ["celebrate"], where: ["Dr. B.R. Ambedkar Konaseema"], states: [], group: "sweets", heritageId: "h-putharekulu", blurb: "Paper-thin rice sheets folded around sugar and ghee." },
  { id: "d-kaja", name: "Kakinada kaja", emoji: "🥐", kind: "sweet", veg: true, spice: 1, sweet: true, moods: ["celebrate", "quick"], where: ["Kakinada"], states: [], group: "sweets", heritageId: "h-kakinada-kaja", blurb: "Layered, syrup-soaked sweet made in Kakinada and Tapeswaram." },
  { id: "d-bandar-laddu", name: "Bandar laddu", emoji: "🟠", kind: "sweet", veg: true, spice: 1, sweet: true, moods: ["celebrate"], where: ["Krishna"], states: [], group: "sweets", heritageId: "h-bandar-laddu", blurb: "A soft, melt-in-the-mouth laddu from Machilipatnam (Bandar)." },
  { id: "d-tirupati-laddu", name: "Tirupati laddu", emoji: "🟡", kind: "sweet", veg: true, spice: 1, sweet: true, moods: ["celebrate"], where: ["Tirupati"], states: [], group: "sweets", heritageId: "h-tirupati-laddu", blurb: "The famous laddu offered as prasadam at Tirumala." },
  { id: "d-banaganapalle", name: "Banaganapalle mango", emoji: "🥭", kind: "sweet", veg: true, spice: 1, sweet: true, moods: ["quick", "comfort"], where: ["Nandyal"], states: [], group: "sweets", heritageId: "h-banaganapalle", blurb: "A large, sweet GI-tagged mango, best in summer (roughly April to June)." },
];

export const DISH_BY_ID = Object.fromEntries(DISHES.map((d) => [d.id, d]));
