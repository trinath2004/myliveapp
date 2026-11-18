// Festival & Season Calendar. Months only, because many festival dates follow the lunar calendar and
// change every year. Everything here comes from public knowledge: please confirm dates and details
// with the temple, tourism office or organisers before you plan a visit.
//
// Fields: id, name, emoji, months (1 = January ... 12 = December), districts (must exist in the app),
//         blurb, eat (what to eat), see (what to see), moves (true = date shifts each year), note.

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const MONTH_SHORT = MONTH_NAMES.map((m) => m.slice(0, 3));

export const FESTIVALS = [
  {
    id: "sankranti", name: "Sankranti / Pongal", emoji: "🪁", months: [1], districts: ["Dr. B.R. Ambedkar Konaseema", "East Godavari", "Hyderabad", "Krishna"],
    blurb: "The big harvest festival of both states, with rangoli, kites, bonfires and sweets. Godavari-delta villages are famous for their celebrations, and Hyderabad hosts a kite festival around the same time.",
    eat: ["Ariselu", "Sakinalu", "Putharekulu"], see: ["Village rangoli and bhogi fires", "Kite flying"],
    moves: false, note: "Usually mid-January.",
  },
  {
    id: "numaish", name: "Numaish (All India Industrial Exhibition)", emoji: "🛍️", months: [1, 2], districts: ["Hyderabad"],
    blurb: "A long-running winter exhibition ground in Hyderabad with stalls from across India: handlooms, handicrafts, snacks and rides.",
    eat: ["Exhibition snack stalls"], see: ["Handloom and handicraft stalls"],
    moves: false, note: "Normally runs from the start of the year for about six weeks.",
  },
  {
    id: "nagoba", name: "Nagoba Jatara", emoji: "🐍", months: [1, 2], districts: ["Adilabad"],
    blurb: "A tribal Gond festival at Keslapur in Adilabad district, held in honour of the serpent deity Nagoba.",
    eat: ["Local tribal food at the fair"], see: ["Gond tribal rituals and dance"],
    moves: true, note: "Follows the lunar calendar (around Pushya Amavasya).",
  },
  {
    id: "medaram", name: "Sammakka Saralamma Jatara (Medaram)", emoji: "🌿", months: [1, 2], districts: ["Mulugu"],
    blurb: "One of the largest tribal gatherings in the world, held in the forest at Medaram in Mulugu district.",
    eat: ["Jaggery offered as bangaram", "Fair-side stalls"], see: ["The shrine platforms in the forest", "Laknavaram Lake nearby"],
    moves: true, note: "Held once every two years (it was held in early 2026; the next one is expected in early 2028). Confirm dates with the authorities.",
  },
  {
    id: "rathasapthami", name: "Ratha Sapthami", emoji: "☀️", months: [1, 2], districts: ["Srikakulam", "Tirupati"],
    blurb: "A sun-worship festival. The Arasavalli Sun Temple in Srikakulam and Tirumala both mark the day.",
    eat: ["Temple prasadam"], see: ["Arasavalli Sun Temple", "Tirumala procession"],
    moves: true, note: "Around the seventh day after Magha month begins.",
  },
  {
    id: "shivaratri", name: "Maha Shivaratri", emoji: "🔱", months: [2, 3], districts: ["Nandyal", "Tirupati", "Rajanna Sircilla", "Nagarkurnool"],
    blurb: "A night of prayer at Shiva temples. Srisailam, Srikalahasti and Vemulawada are among the busiest.",
    eat: ["Fasting-day fruit and temple prasadam"], see: ["Srisailam Mallikarjuna Temple", "Srikalahasti Temple", "Vemulawada Raja Rajeshwara Temple"],
    moves: true, note: "Lunar date, usually February or March.",
  },
  {
    id: "haleem", name: "Haleem season (Ramadan)", emoji: "🍲", months: [2, 3], districts: ["Hyderabad"],
    blurb: "During Ramadan, Hyderabad's Old City comes alive in the evenings. Haleem, a slow-cooked wheat and meat dish, is the star, and the area around Charminar stays busy late into the night.",
    eat: ["Haleem", "Khubani ka meetha", "Irani chai"], see: ["Charminar and Laad Bazaar at night"],
    moves: true, note: "Ramadan shifts about 10 to 11 days earlier every year (roughly February to March in 2027, January to February in 2028).",
  },
  {
    id: "ugadi", name: "Ugadi (Telugu New Year)", emoji: "🌼", months: [3, 4], districts: ["Tirupati", "Hyderabad", "NTR"],
    blurb: "The Telugu new year. Homes make Ugadi pachadi, a mix of six tastes that stands for the flavours of life.",
    eat: ["Ugadi pachadi", "Bobbatlu", "Pulihora"], see: ["Temple panchanga sravanam readings"],
    moves: true, note: "Usually March or April.",
  },
  {
    id: "ramanavami", name: "Sri Rama Navami (Bhadrachalam)", emoji: "🏹", months: [3, 4], districts: ["Bhadradri Kothagudem"],
    blurb: "The celestial wedding of Sita and Rama is celebrated at the Bhadrachalam temple on the Godavari.",
    eat: ["Panakam (jaggery drink)", "Vadapappu"], see: ["Bhadrachalam Sri Rama Temple", "Parnasala"],
    moves: true, note: "Lunar date, usually March or April.",
  },
  {
    id: "chandanotsavam", name: "Chandanotsavam (Simhachalam)", emoji: "🛕", months: [4, 5], districts: ["Visakhapatnam"],
    blurb: "Once a year the deity at Simhachalam Temple is seen without the usual covering of sandalwood paste, which is why this festival draws large crowds.",
    eat: ["Temple prasadam"], see: ["Simhachalam Temple"],
    moves: true, note: "Held around Akshaya Tritiya.",
  },
  {
    id: "mango", name: "Mango season", emoji: "🥭", months: [4, 5, 6], districts: ["Nandyal", "Eluru", "Chittoor"],
    blurb: "Summer means mangoes. Banaganapalle (a GI-tagged variety) comes from Nandyal district, Nuzvid mangoes are famous in Eluru district and Chittoor is known for mango pulp.",
    eat: ["Banaganapalle mangoes", "Mango pulp and pickles"], see: ["Orchard and market-yard visits"],
    moves: false, note: "Peak is roughly April to June.",
  },
  {
    id: "bonalu", name: "Bonalu", emoji: "🌺", months: [7, 8], districts: ["Hyderabad"],
    blurb: "A month-long Telangana festival of the goddess Mahankali. Women carry decorated pots of food offerings to temples, starting at Golconda and moving through Secunderabad and the Old City.",
    eat: ["Offerings of rice, jaggery and curd"], see: ["Golconda Fort area temples", "Procession with pothuraju dancers"],
    moves: true, note: "Falls in the Ashada month, usually July to August.",
  },
  {
    id: "vinayaka", name: "Vinayaka Chavithi (Ganesh festival)", emoji: "🐘", months: [8, 9], districts: ["Hyderabad", "Chittoor", "NTR"],
    blurb: "Ganesh idols are installed in streets and homes. Hyderabad is known for its huge idols and the immersion procession to Hussain Sagar. Kanipakam in Chittoor district has a famous Vinayaka temple.",
    eat: ["Kudumulu", "Undrallu", "Laddu"], see: ["Hussain Sagar Lake", "Kanipakam Vinayaka Temple"],
    moves: true, note: "Usually late August or September.",
  },
  {
    id: "brahmotsavam", name: "Tirumala Srivari Brahmotsavam", emoji: "🛕", months: [9, 10], districts: ["Tirupati"],
    blurb: "The annual nine-day Brahmotsavam at Tirumala, with the deity taken in grand processions on different vahanas through the day and evening.",
    eat: ["Tirupati laddu", "Temple pulihora and prasadam"], see: ["Tirumala Venkateswara Temple", "Sri Padmavathi Temple, Tiruchanoor"],
    moves: true, note: "Usually September or October. Crowds are very large; book well ahead through the temple's official channels.",
  },
  {
    id: "bathukamma", name: "Bathukamma", emoji: "💐", months: [9, 10], districts: ["Hyderabad", "Warangal", "Karimnagar", "Hanumakonda"],
    blurb: "Telangana's own flower festival. Women stack seasonal flowers into a conical Bathukamma, sing, and carry it to a pond or lake over nine days.",
    eat: ["Sakinalu", "Sarva Pindi", "Sattu (peanut and jaggery sweets)"], see: ["Evening Bathukamma gatherings by lakes"],
    moves: true, note: "Nine days before Dasara, usually September or October.",
  },
  {
    id: "dasara", name: "Dasara at Indrakeeladri", emoji: "🔥", months: [9, 10], districts: ["NTR"],
    blurb: "During Navaratri, the Kanaka Durga Temple on Indrakeeladri hill in Vijayawada decorates the goddess in a different form each day.",
    eat: ["Temple prasadam"], see: ["Kanaka Durga Temple", "Prakasam Barrage and Bhavani Island"],
    moves: true, note: "Usually late September or October.",
  },
  {
    id: "karthika", name: "Karthika Masam", emoji: "🪔", months: [11], districts: ["Nandyal", "Tirupati", "Rajanna Sircilla", "Nagarkurnool"],
    blurb: "A holy month when lamps are lit at dusk and Shiva temples see long queues. Families also go on picnics under amla trees (vanabhojanalu).",
    eat: ["Picnic meals under the amla tree"], see: ["Srisailam", "Srikalahasti", "Vemulawada"],
    moves: true, note: "Lunar month, usually November.",
  },
  {
    id: "diwali", name: "Diwali", emoji: "🎆", months: [10, 11], districts: ["Hyderabad", "NTR", "Visakhapatnam"],
    blurb: "The festival of lights, with lamps, fireworks and a lot of sweets. Big-city markets are at their liveliest.",
    eat: ["Sweets and savoury snacks"], see: ["Illuminated markets"],
    moves: true, note: "Usually October or November.",
  },
  {
    id: "vaikunta", name: "Vaikunta Ekadasi", emoji: "🌅", months: [12, 1], districts: ["Tirupati", "Bhadradri Kothagudem", "Yadadri Bhuvanagiri"],
    blurb: "On this day the special north gate (Vaikunta Dwaram) is opened at Vishnu temples such as Tirumala and Bhadrachalam.",
    eat: ["Fasting-day food and prasadam"], see: ["Tirumala", "Bhadrachalam"],
    moves: true, note: "Lunar date, falling in December or January.",
  },
  {
    id: "araku", name: "Araku winter and coffee season", emoji: "☕", months: [11, 12, 1, 2], districts: ["Alluri Sitharama Raju"],
    blurb: "Cool, misty weather is the best time for the Eastern Ghats. Coffee is harvested in the cooler months, and the valley is at its most pleasant.",
    eat: ["Araku coffee", "Bamboo chicken"], see: ["Borra Caves", "Lambasingi", "Katiki Waterfalls"],
    moves: false, note: "Local tourism festivals are held in winter. Check dates with the tourism office.",
  },
];

// Long-cycle events that do not fit in a single month.
export const LONG_CYCLE = [
  { name: "Godavari Pushkaralu", text: "A river festival held every 12 years (the last was in 2015, so the next is due in 2027). Look for dates announced by the authorities. Rajahmahendravaram, Bhadrachalam and other Godavari ghats are central." },
  { name: "Krishna Pushkaralu", text: "Also a 12-year river festival (the last was in 2016, so the next is due in 2028). Vijayawada and the Krishna river ghats are the focus." },
];
