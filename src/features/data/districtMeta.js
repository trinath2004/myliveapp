// Extra facts about every district, used by the District Guides, Map, Trip Planner, Compare and Near Me.
//
// ll      : [latitude, longitude] of the district headquarters. These are APPROXIMATE (good enough to
//           place a pin and sort districts by distance). Please verify them before any formal use.
// te      : district name in Telugu. Please have a native speaker check the spelling.
// knownFor: one short line. Written from public knowledge and from this app's own data.
//
// Keys must match the district names used in src/data/restaurants.js exactly.

export const DISTRICT_META = {
  "Andhra Pradesh": {
    "Srikakulam": { ll: [18.2949, 83.8938], te: "శ్రీకాకుళం", knownFor: "Arasavalli Sun Temple, Sri Kurmam, quiet beaches and Ponduru khadi." },
    "Parvathipuram Manyam": { ll: [18.7833, 83.425], te: "పార్వతీపురం మన్యం", knownFor: "Green tribal hill country of the Eastern Ghats." },
    "Vizianagaram": { ll: [18.1067, 83.3956], te: "విజయనగరం", knownFor: "Royal-town heritage, Bobbili Fort and the Bobbili veena." },
    "Visakhapatnam": { ll: [17.6868, 83.2185], te: "విశాఖపట్నం", knownFor: "Beaches, Kailasagiri, Simhachalam and a walk-through submarine museum." },
    "Alluri Sitharama Raju": { ll: [18.0833, 82.6667], te: "అల్లూరి సీతారామరాజు", knownFor: "Araku Valley coffee, Borra Caves and misty hill waterfalls." },
    "Anakapalli": { ll: [17.6913, 83.0037], te: "అనకాపల్లి", knownFor: "A big jaggery market, Etikoppaka lacquer toys and Bojjannakonda Buddhist caves." },
    "Kakinada": { ll: [16.9891, 82.2475], te: "కాకినాడ", knownFor: "Kakinada kaja, Uppada Jamdani sarees and Coringa mangrove wildlife." },
    "East Godavari": { ll: [17.0005, 81.804], te: "తూర్పు గోదావరి", knownFor: "Rajahmahendravaram, the Godavari Arch Bridge and Dowleswaram Barrage." },
    "Dr. B.R. Ambedkar Konaseema": { ll: [16.5786, 82.006], te: "డా. బి.ఆర్. అంబేడ్కర్ కోనసీమ", knownFor: "Coconut-fringed delta, backwaters and Atreyapuram putharekulu." },
    "Eluru": { ll: [16.7107, 81.0952], te: "ఏలూరు", knownFor: "Handmade carpets, Kolleru Lake birds and Dwaraka Tirumala." },
    "West Godavari": { ll: [16.5449, 81.5212], te: "పశ్చిమ గోదావరి", knownFor: "Pancharama temples, Narsapur crochet lace and Godavari-delta cooking." },
    "NTR": { ll: [16.5062, 80.648], te: "ఎన్టీఆర్", knownFor: "Vijayawada: Kanaka Durga Temple, Prakasam Barrage and Kondapalli toys." },
    "Krishna": { ll: [16.1875, 81.1389], te: "కృష్ణా", knownFor: "Machilipatnam kalamkari, Bandar laddu and Kuchipudi village." },
    "Guntur": { ll: [16.3067, 80.4365], te: "గుంటూరు", knownFor: "Guntur chilli, fiery avakaya pickle and Mangalagiri handlooms." },
    "Palnadu": { ll: [16.2351, 80.049], te: "పల్నాడు", knownFor: "The Amaravati Mahastupa and the temples of Kotappakonda and Macherla." },
    "Bapatla": { ll: [15.904, 80.467], te: "బాపట్ల", knownFor: "Chirala handlooms and a string of quiet beaches." },
    "Prakasam": { ll: [15.5057, 80.0499], te: "ప్రకాశం", knownFor: "Bhairavakona rock-cut caves, Kothapatnam beach and Chimakurthi granite." },
    "Markapuram": { ll: [15.735, 79.268], te: "మార్కాపురం", knownFor: "Markapuram slate, Cumbum Lake and the Chennakesava temple." },
    "Sri Potti Sriramulu Nellore": { ll: [14.4426, 79.9865], te: "శ్రీ పొట్టి శ్రీరాములు నెల్లూరు", knownFor: "Udayagiri Fort, Penchalakona, Somasila and Nellore's seafood and rice." },
    "Kurnool": { ll: [15.8281, 78.0373], te: "కర్నూలు", knownFor: "Mantralayam, the Kurnool Fort and the onion market yard." },
    "Nandyal": { ll: [15.4786, 78.4836], te: "నంద్యాల", knownFor: "Srisailam, Ahobilam, Belum Caves and Banaganapalle mangoes." },
    "Anantapur": { ll: [14.6819, 77.6006], te: "అనంతపురం", knownFor: "Gooty and Rayadurgam forts, groundnut and Tadipatri temples." },
    "Sri Sathya Sai": { ll: [14.165, 77.811], te: "శ్రీ సత్యసాయి", knownFor: "Lepakshi, Penukonda Fort, Puttaparthi and Dharmavaram silk." },
    "YSR Kadapa": { ll: [14.4673, 78.8242], te: "వైఎస్సార్ కడప", knownFor: "Gandikota canyon, Vontimitta temple and Kadapa slab stone." },
    "Annamayya": { ll: [14.057, 78.75], te: "అన్నమయ్య", knownFor: "Horsley Hills, Rishi Valley and the Madanapalle tomato market." },
    "Chittoor": { ll: [13.2172, 79.1003], te: "చిత్తూరు", knownFor: "Kanipakam Vinayaka Temple and Chittoor mango pulp." },
    "Tirupati": { ll: [13.6288, 79.4192], te: "తిరుపతి", knownFor: "Tirumala, Srikalahasti, Talakona Waterfall, Venkatagiri sarees and the Tirupati laddu." },
    "Polavaram": { ll: [17.44, 81.77], te: "పోలవరం", knownFor: "Papikondalu boat rides, Maredumilli bamboo chicken and tribal markets." },
  },
  "Telangana": {
    "Adilabad": { ll: [19.6641, 78.532], te: "ఆదిలాబాద్", knownFor: "Kuntala and Pochera waterfalls and Dokra metal craft." },
    "Bhadradri Kothagudem": { ll: [17.556, 80.619], te: "భద్రాద్రి కొత్తగూడెం", knownFor: "Bhadrachalam Sri Rama Temple, Parnasala and the Kinnerasani sanctuary." },
    "Hanumakonda": { ll: [18.0049, 79.558], te: "హనుమకొండ", knownFor: "The Thousand Pillar Temple and Bhadrakali Temple." },
    "Hyderabad": { ll: [17.385, 78.4867], te: "హైదరాబాద్", knownFor: "Charminar, Golconda, biryani, haleem, pearls and Laad Bazaar bangles." },
    "Jagtial": { ll: [18.7895, 78.912], te: "జగిత్యాల", knownFor: "Kondagattu Anjaneya Temple, Dharmapuri and Jagtial Fort." },
    "Jangaon": { ll: [17.7239, 79.152], te: "జనగామ", knownFor: "Pembarthi brass craft and the Palakurthi Someshwara Temple." },
    "Jayashankar Bhupalpally": { ll: [18.4337, 79.866], te: "జయశంకర్ భూపాలపల్లి", knownFor: "The Kaleshwaram temple and the Kaleshwaram lift irrigation project." },
    "Jogulamba Gadwal": { ll: [16.235, 77.8], te: "జోగులాంబ గద్వాల", knownFor: "Gadwal sarees, Alampur Navabrahma temples and Jurala Dam." },
    "Kamareddy": { ll: [18.32, 78.34], te: "కామారెడ్డి", knownFor: "Nizam Sagar Dam, Bhiknoor temple and Pocharam sanctuary." },
    "Karimnagar": { ll: [18.4386, 79.1288], te: "కరీంనగర్", knownFor: "Silver filigree, Elgandal Fort and Sarva Pindi." },
    "Khammam": { ll: [17.2473, 80.1514], te: "ఖమ్మం", knownFor: "Khammam Fort, Stambhadri temple and a large chilli market yard." },
    "Komaram Bheem Asifabad": { ll: [19.364, 79.285], te: "కొమురం భీమ్ ఆసిఫాబాద్", knownFor: "Forest country, the Jodeghat memorial and the Komaram Bheem Project." },
    "Mahabubabad": { ll: [17.6, 80.0], te: "మహబూబాబాద్", knownFor: "Kuravi Veerabhadra Swamy Temple and the Pakhal Lake area." },
    "Mahabubnagar": { ll: [16.7375, 77.985], te: "మహబూబ్‌నగర్", knownFor: "Pillalamarri, the giant banyan tree, and Koilkonda Fort." },
    "Mancherial": { ll: [18.87, 79.46], te: "మంచిర్యాల", knownFor: "Kawal Tiger Reserve and Godavari ghats." },
    "Medak": { ll: [18.0453, 78.26], te: "మెదక్", knownFor: "Medak Cathedral, Medak Fort and Edupayala Vana Durga Temple." },
    "Medchal-Malkajgiri": { ll: [17.63, 78.48], te: "మేడ్చల్-మల్కాజిగిరి", knownFor: "Keesaragutta temple and the busy northern edge of Hyderabad." },
    "Mulugu": { ll: [18.192, 79.939], te: "ములుగు", knownFor: "Ramappa Temple, Laknavaram Lake and the Medaram Jatara." },
    "Nagarkurnool": { ll: [16.48, 78.32], te: "నాగర్‌కర్నూల్", knownFor: "Umamaheshwaram, Mallela Theertham and the Amrabad Tiger Reserve." },
    "Nalgonda": { ll: [17.0575, 79.269], te: "నల్గొండ", knownFor: "Nagarjuna Sagar, Nagarjuna Konda and the Panagal temples." },
    "Narayanpet": { ll: [16.745, 77.496], te: "నారాయణపేట", knownFor: "Narayanpet handloom sarees and the Makthal temple." },
    "Nirmal": { ll: [19.096, 78.344], te: "నిర్మల్", knownFor: "Nirmal toys and paintings and the Basar Saraswati Temple." },
    "Nizamabad": { ll: [18.6725, 78.0941], te: "నిజామాబాద్", knownFor: "Nizamabad Fort, Alisagar Lake and a turmeric market yard." },
    "Peddapalli": { ll: [18.615, 79.372], te: "పెద్దపల్లి", knownFor: "Ramagundam's power and solar parks and the Manthani temples." },
    "Rajanna Sircilla": { ll: [18.388, 78.834], te: "రాజన్న సిరిసిల్ల", knownFor: "Sircilla textiles and the Vemulawada Raja Rajeshwara Temple." },
    "Rangareddy": { ll: [17.25, 78.38], te: "రంగారెడ్డి", knownFor: "Chilkur Balaji Temple, Ramoji Film City and the Osman Sagar lake." },
    "Sangareddy": { ll: [17.624, 78.087], te: "సంగారెడ్డి", knownFor: "Singur Dam, Manjira Wildlife Sanctuary and the Kondapur museum." },
    "Siddipet": { ll: [18.1018, 78.852], te: "సిద్దిపేట", knownFor: "Gollabhama sarees, Cheriyal scrolls and Komuravelli Mallanna Temple." },
    "Suryapet": { ll: [17.14, 79.62], te: "సూర్యాపేట", knownFor: "Pillalamarri temples and Mattapalli Narasimha Swamy Temple." },
    "Vikarabad": { ll: [17.338, 77.904], te: "వికారాబాద్", knownFor: "Ananthagiri Hills and Tandur red gram." },
    "Wanaparthy": { ll: [16.362, 78.061], te: "వనపర్తి", knownFor: "Wanaparthy Fort, Sarala Sagar and the Srirangapur temple." },
    "Warangal": { ll: [17.9689, 79.5941], te: "వరంగల్", knownFor: "Warangal Fort, Ramappa Temple, Pakhal Lake and handwoven durries." },
    "Yadadri Bhuvanagiri": { ll: [17.51, 78.89], te: "యాదాద్రి భువనగిరి", knownFor: "Yadagirigutta temple, Bhongir Fort and Pochampally ikat." },
  },
};

export const STATE_TE = { "Andhra Pradesh": "ఆంధ్రప్రదేశ్", Telangana: "తెలంగాణ" };
