// Extra famous places and restaurants, merged with data.js / restaurants.js by catalog.js.
// PLACES entry:      [name, type, description, map search text]
// RESTAURANT entry:  [name, cuisine, rating or null, area, famous dish]
//   rating null = a well-known local food spot where no rating is claimed ("Local favourite").
// Ratings are approximate; use "Open in Maps" for live ratings and reviews.

export const MORE_PLACES = {
  "Andhra Pradesh": {
    Srikakulam: [
      ["Sri Kurmam Temple", "Temple", "Ancient temple of Vishnu as a tortoise (Kurma avatar), one of very few in India.", "Sri Kurmam Temple, Srikakulam"],
      ["Srimukhalingam Temple", "Heritage", "Group of 9th-century Kalinga-style temples on the Vamsadhara river.", "Srimukhalingam Temple, Srikakulam"],
      ["Kalingapatnam Beach", "Beach", "Quiet beach at the mouth of the Vamsadhara river with an old lighthouse.", "Kalingapatnam Beach, Srikakulam"],
      ["Baruva Beach", "Beach", "Peaceful coastal village beach surrounded by coconut groves.", "Baruva Beach, Srikakulam"],
    ],
    "Parvathipuram Manyam": [
      ["Gumma Laxmipuram Hills", "Tourism", "Green tribal hill region in the Eastern Ghats.", "Gummalakshmipuram, Parvathipuram Manyam"],
      ["Parvathipuram Town Temples", "Temple", "Local temples at the district headquarters.", "Parvathipuram, Parvathipuram Manyam"],
    ],
    Vizianagaram: [
      ["Ramatheertham Temple", "Temple", "Hilltop Rama temple with Buddhist and Jain remains nearby.", "Ramatheertham, Vizianagaram"],
      ["Bobbili Fort", "Fort", "18th-century fort and palace of the Bobbili rulers.", "Bobbili Fort, Vizianagaram"],
      ["Thatipudi Reservoir", "Lake", "Scenic reservoir and picnic spot near Gantyada.", "Thatipudi Reservoir, Vizianagaram"],
    ],
    Visakhapatnam: [
      ["Kailasagiri Hill Park", "Tourism", "Hilltop park with a giant Shiva-Parvati statue and a ropeway.", "Kailasagiri, Visakhapatnam"],
      ["Simhachalam Temple", "Temple", "Famous Varaha Lakshmi Narasimha temple on a hill.", "Simhachalam Temple, Visakhapatnam"],
      ["INS Kursura Submarine Museum", "Museum", "A real decommissioned submarine you can walk through on RK Beach.", "Kursura Submarine Museum, Visakhapatnam"],
      ["Rushikonda Beach", "Beach", "Golden-sand beach popular for water sports.", "Rushikonda Beach, Visakhapatnam"],
      ["Yarada Beach", "Beach", "Secluded beach surrounded by hills on three sides.", "Yarada Beach, Visakhapatnam"],
    ],
    "Alluri Sitharama Raju": [
      ["Borra Caves", "Cave", "Million-year-old limestone caves with stalactites and stalagmites.", "Borra Caves, Alluri Sitharama Raju district"],
      ["Katiki Waterfalls", "Waterfall", "Waterfall near Borra Caves, best after the rains.", "Katiki Waterfalls, Alluri Sitharama Raju district"],
      ["Lambasingi", "Tourism", "Hill village known as the 'Kashmir of Andhra' for its winter frost.", "Lambasingi, Alluri Sitharama Raju district"],
      ["Chaparai Waterfalls", "Waterfall", "Stepped natural water slide near Araku.", "Chaparai Waterfalls, Araku Valley"],
    ],
    Anakapalli: [
      ["Bojjannakonda Buddhist Caves", "Heritage", "Ancient Buddhist rock-cut monuments at Sankaram.", "Bojjannakonda, Anakapalli"],
      ["Nookambika Temple", "Temple", "Famous goddess temple in Anakapalli town.", "Nookambika Temple, Anakapalli"],
      ["Kondakarla Ava Lake", "Lake", "Large lake and bird-watching spot.", "Kondakarla Ava, Anakapalli"],
    ],
    Kakinada: [
      ["Coringa Wildlife Sanctuary", "Wildlife", "Mangrove forest with boat rides, birds and fishing cats.", "Coringa Wildlife Sanctuary, Kakinada"],
      ["Annavaram Satyanarayana Temple", "Temple", "Famous hilltop temple of Lord Satyanarayana.", "Annavaram Temple, Kakinada district"],
      ["Samalkot Bhimeswara Temple", "Heritage", "One of the Pancharama Kshetras with a tall Shiva lingam.", "Samalkot Bhimeswara Temple, Kakinada"],
      ["Kakinada Beach", "Beach", "Long city beach beside the Bay of Bengal.", "Kakinada Beach, Kakinada"],
    ],
    "East Godavari": [
      ["Godavari Arch Bridge", "Tourism", "Historic railway bridge across the Godavari at Rajahmundry.", "Godavari Bridge, Rajahmundry"],
      ["Dowleswaram Barrage", "Dam", "Cotton barrage built across the Godavari, a scenic evening spot.", "Dowleswaram Barrage, East Godavari"],
      ["ISKCON Rajahmundry", "Temple", "Peaceful Krishna temple on the Godavari bank.", "ISKCON Temple, Rajahmundry"],
    ],
    "Dr. B.R. Ambedkar Konaseema": [
      ["Antarvedi Temple and Beach", "Temple", "Lakshmi Narasimha temple where the Godavari meets the sea.", "Antarvedi, Konaseema"],
      ["Ryali Jagannatha Swamy Temple", "Temple", "Popular temple in the heart of Konaseema.", "Ryali Jagannatha Temple, Konaseema"],
      ["Konaseema Backwaters", "Tourism", "Canals, coconut groves and boat rides, the 'Kerala of Andhra'.", "Konaseema Backwaters, Konaseema"],
    ],
    Eluru: [
      ["Kolleru Lake", "Lake", "Large freshwater lake famous for migratory pelicans.", "Kolleru Lake, Eluru"],
      ["Dwaraka Tirumala Temple", "Temple", "Sri Venkateswara temple, also called the 'Chinna Tirupati'.", "Dwaraka Tirumala, Eluru"],
      ["Eluru Clock Tower Area", "Heritage", "Central landmark of Eluru city.", "Clock Tower, Eluru"],
    ],
    "West Godavari": [
      ["Palakollu Kshira Ramalingeswara Temple", "Temple", "Pancharama temple with a tall gopuram.", "Palakollu Temple, West Godavari"],
      ["Bhimavaram Someswara Temple", "Temple", "Famous Pancharama Kshetra temple.", "Someswara Temple, Bhimavaram"],
      ["Narsapur Beach", "Beach", "Beach near the Vasishta Godavari estuary.", "Narsapur Beach, West Godavari"],
    ],
    NTR: [
      ["Prakasam Barrage", "Dam", "Landmark barrage across the Krishna river with sunset views.", "Prakasam Barrage, Vijayawada"],
      ["Bhavani Island", "Tourism", "River island with boating and picnic spots.", "Bhavani Island, Vijayawada"],
      ["Undavalli Caves", "Cave", "4th-century rock-cut caves with a giant reclining Vishnu.", "Undavalli Caves, Vijayawada"],
      ["Victoria Jubilee Museum", "Museum", "Oldest museum in Vijayawada with sculptures and relics.", "Victoria Museum, Vijayawada"],
      ["Kondapalli Fort", "Fort", "Hill fort of the Reddy kings near the toy village.", "Kondapalli Fort, NTR district"],
    ],
    Krishna: [
      ["Manginapudi Beach", "Beach", "Popular beach near Machilipatnam.", "Manginapudi Beach, Krishna"],
      ["Kuchipudi Village", "Heritage", "Birthplace of the Kuchipudi classical dance.", "Kuchipudi, Krishna"],
      ["Mopidevi Subramanya Swamy Temple", "Temple", "Famous snake-worship temple.", "Mopidevi Temple, Krishna"],
    ],
    Guntur: [
      ["Kondaveedu Fort", "Fort", "Reddy-era hill fort with temples and ruins.", "Kondaveedu Fort, Guntur"],
      ["Mangalagiri Panakala Narasimha Temple", "Temple", "Temple where the deity drinks jaggery water.", "Mangalagiri Panakala Narasimha Swamy Temple, Guntur"],
      ["Guntur Clock Tower", "Heritage", "Old landmark in the city centre.", "Clock Tower, Guntur"],
    ],
    Palnadu: [
      ["Amaravati Stupa", "Heritage", "Ancient Buddhist stupa and museum on the Krishna river.", "Amaravati Stupa, Palnadu"],
      ["Kotappakonda Temple", "Temple", "Famous hill temple with a Trikoteswara Swamy shrine.", "Kotappakonda, Palnadu"],
      ["Macherla Chennakesava Temple", "Temple", "Historic temple linked to the Palnadu war.", "Macherla Chennakesava Temple, Palnadu"],
    ],
    Bapatla: [
      ["Vodarevu Beach", "Beach", "Beach near Chirala with fishing boats and calm water.", "Vodarevu Beach, Bapatla"],
      ["Bhavanarayana Swamy Temple", "Temple", "Ancient temple in Bapatla town.", "Bhavanarayana Swamy Temple, Bapatla"],
    ],
    Prakasam: [
      ["Bhairavakona Caves", "Heritage", "Rock-cut Shiva temples in the Nallamala hills with a waterfall.", "Bhairavakona, Prakasam"],
      ["Kothapatnam Beach", "Beach", "Quiet fishing beach near Ongole.", "Kothapatnam Beach, Prakasam"],
    ],
    Markapuram: [
      ["Cumbum Lake", "Lake", "One of the oldest man-made lakes in Asia.", "Cumbum Lake, Markapuram"],
      ["Tripuranthakam Temple", "Heritage", "Ancient Shiva temple complex.", "Tripurantakam Temple, Markapuram"],
      ["Markapuram Chennakesava Swamy Temple", "Temple", "Popular temple in the district headquarters.", "Chennakesava Swamy Temple, Markapuram"],
    ],
    "Sri Potti Sriramulu Nellore": [
      ["Udayagiri Fort", "Fort", "Hill fort with temples and views of the Nallamala range.", "Udayagiri Fort, Nellore"],
      ["Ranganatha Swamy Temple", "Temple", "Historic Vishnu temple on the Penna river in Nellore.", "Ranganatha Swamy Temple, Nellore"],
      ["Somasila Reservoir", "Dam", "Large reservoir on the Penna river.", "Somasila Dam, Nellore"],
      ["Penchalakona", "Waterfall", "Forest temple and waterfall in the hills.", "Penchalakona, Nellore"],
    ],
    Kurnool: [
      ["Mantralayam Raghavendra Swamy Mutt", "Temple", "Holy Tungabhadra-side shrine of Sri Raghavendra Swamy.", "Mantralayam, Kurnool"],
      ["Orvakal Rock Garden", "Tourism", "Natural rock formations and a famous geological site.", "Orvakal Rock Garden, Kurnool"],
      ["Kurnool Fort", "Fort", "Old fort remains in the heart of the city.", "Kurnool Fort, Kurnool"],
    ],
    Nandyal: [
      ["Srisailam Mallikarjuna Temple", "Temple", "One of the 12 Jyotirlingas and a Shakti Peetha.", "Srisailam Temple, Nandyal"],
      ["Belum Caves", "Cave", "Second-largest cave system on the Indian subcontinent.", "Belum Caves, Nandyal"],
      ["Ahobilam Temples", "Temple", "Nine Narasimha temples in a forest valley.", "Ahobilam, Nandyal"],
      ["Yaganti Temple", "Temple", "Shiva temple with a lingam-bull stone that is said to grow.", "Yaganti Temple, Nandyal"],
    ],
    Anantapur: [
      ["Gooty Fort", "Fort", "Impressive hill fort of the Vijayanagara rulers.", "Gooty Fort, Anantapur"],
      ["Tadipatri Chintalarayaswamy Temple", "Heritage", "Vijayanagara temple with fine stone carving.", "Chintala Venkataramana Temple, Tadipatri"],
      ["Rayadurgam Fort", "Fort", "Hill fort in the rocky landscape of Anantapur.", "Rayadurg Fort, Anantapur"],
    ],
    "Sri Sathya Sai": [
      ["Lepakshi Veerabhadra Temple", "Heritage", "Famous hanging pillar and the giant Nandi statue nearby.", "Lepakshi Temple, Sri Sathya Sai"],
      ["Penukonda Fort", "Fort", "Vijayanagara fort and second capital of the empire.", "Penukonda Fort, Sri Sathya Sai"],
      ["Thimmamma Marrimanu", "Tourism", "World's largest banyan tree, spread over about five acres.", "Thimmamma Marrimanu, Sri Sathya Sai"],
      ["Kadiri Lakshmi Narasimha Temple", "Temple", "Ancient Narasimha temple at Kadiri.", "Kadiri Lakshmi Narasimha Swamy Temple, Sri Sathya Sai"],
    ],
    "YSR Kadapa": [
      ["Gandikota Fort and Canyon", "Tourism", "The 'Grand Canyon of India' on the Penna river.", "Gandikota, YSR Kadapa"],
      ["Vontimitta Kodandarama Temple", "Temple", "Historic Rama temple built in Vijayanagara style.", "Vontimitta Kodandarama Temple, Kadapa"],
      ["Devuni Kadapa Temple", "Temple", "Gateway-to-Tirumala Venkateswara temple.", "Devuni Kadapa, YSR Kadapa"],
      ["Pushpagiri Temples", "Temple", "Ancient temple complex on the Penna river bank.", "Pushpagiri, YSR Kadapa"],
    ],
    Annamayya: [
      ["Rishi Valley School", "Heritage", "Famous school campus founded by J. Krishnamurti, set among hills.", "Rishi Valley, Madanapalle"],
      ["Tallapaka Temples", "Temple", "Birthplace of the poet Annamacharya.", "Tallapaka, Annamayya"],
      ["Rayachoti Veerabhadra Swamy Temple", "Temple", "Well-known temple in Rayachoti.", "Veerabhadra Swamy Temple, Rayachoti"],
    ],
    Chittoor: [
      ["Kaundinya Wildlife Sanctuary", "Wildlife", "Elephant reserve in the forests near Palamaner.", "Kaundinya Wildlife Sanctuary, Chittoor"],
      ["Chittoor Fort Area", "Heritage", "Historic old town and fort remains.", "Chittoor Fort, Chittoor"],
      ["Kanipakam Vinayaka Temple", "Temple", "Famous Ganesha temple on the Bahuda river.", "Kanipakam Temple, Chittoor"],
    ],
    Tirupati: [
      ["Tirumala Venkateswara Temple", "Temple", "One of the world's most visited shrines.", "Tirumala Venkateswara Temple, Tirupati"],
      ["Sri Padmavathi Temple, Tiruchanoor", "Temple", "Temple of Goddess Padmavathi.", "Padmavathi Temple, Tiruchanoor, Tirupati"],
      ["Srikalahasti Temple", "Temple", "Famous Vayu Lingam temple on the Swarnamukhi river.", "Srikalahasti Temple, Tirupati district"],
      ["Chandragiri Fort", "Fort", "Vijayanagara-era fort and museum.", "Chandragiri Fort, Tirupati"],
      ["Talakona Waterfall", "Waterfall", "Tallest waterfall in Andhra Pradesh inside a national park.", "Talakona Waterfall, Tirupati district"],
    ],
    Polavaram: [
      ["Papikondalu Boat Ride", "Tourism", "Scenic Godavari river cruise through the Papi Hills.", "Papikondalu, Polavaram"],
      ["Polavaram Project View Point", "Dam", "Viewpoint over the Polavaram irrigation project.", "Polavaram Project, Polavaram district"],
      ["Perantalapalli Temple", "Temple", "Riverside Veerabhadra temple at the start of Papikondalu trips.", "Perantalapalli, Polavaram"],
    ],
  },

  Telangana: {
    Adilabad: [
      ["Kuntala Waterfall", "Waterfall", "Tallest waterfall in Telangana, in a forested gorge.", "Kuntala Waterfalls, Adilabad"],
      ["Pochera Waterfall", "Waterfall", "Scenic waterfall on the Kadam river.", "Pochera Waterfalls, Adilabad"],
      ["Gayatri Waterfalls", "Waterfall", "Seasonal waterfall near Neredigonda.", "Gayatri Waterfalls, Adilabad"],
    ],
    "Bhadradri Kothagudem": [
      ["Bhadrachalam Sri Rama Temple", "Temple", "Famous Rama temple on the bank of the Godavari.", "Bhadrachalam Temple, Bhadradri Kothagudem"],
      ["Parnasala", "Temple", "Place linked to the Ramayana where Sita is said to have lived.", "Parnasala, Bhadradri Kothagudem"],
      ["Kinnerasani Wildlife Sanctuary", "Wildlife", "Dam, deer park and sanctuary near Paloncha.", "Kinnerasani, Bhadradri Kothagudem"],
    ],
    Hanumakonda: [
      ["Bhadrakali Temple", "Temple", "Ancient temple of Goddess Bhadrakali beside a lake.", "Bhadrakali Temple, Hanumakonda"],
      ["Thousand Pillar Temple", "Heritage", "12th-century Kakatiya temple of Shiva, Vishnu and Surya.", "Thousand Pillar Temple, Hanumakonda"],
      ["Hanumakonda Padmakshi Temple", "Temple", "Hilltop temple with views of the city.", "Padmakshi Temple, Hanumakonda"],
    ],
    Hyderabad: [
      ["Charminar", "Heritage", "The 16th-century monument and symbol of Hyderabad.", "Charminar, Hyderabad"],
      ["Golconda Fort", "Fort", "Grand fort known for its acoustics and light-and-sound show.", "Golconda Fort, Hyderabad"],
      ["Hussain Sagar Lake and Buddha Statue", "Lake", "Lake with a giant Buddha statue and boat rides.", "Hussain Sagar, Hyderabad"],
      ["Salar Jung Museum", "Museum", "One of the largest one-man collections of art in the world.", "Salar Jung Museum, Hyderabad"],
      ["Chowmahalla Palace", "Heritage", "Palace of the Nizams with grand courtyards.", "Chowmahalla Palace, Hyderabad"],
    ],
    Jagtial: [
      ["Kondagattu Anjaneya Swamy Temple", "Temple", "Hilltop Hanuman temple, very popular with pilgrims.", "Kondagattu Temple, Jagtial"],
      ["Dharmapuri Narasimha Temple", "Temple", "Ancient temple on the Godavari bank.", "Dharmapuri Temple, Jagtial"],
      ["Jagtial Fort", "Fort", "Historic fort built by Ibrahim Qutb Shah.", "Jagtial Fort, Jagtial"],
    ],
    Jangaon: [
      ["Palakurthi Someshwara Temple", "Temple", "Ancient Shiva temple.", "Palakurthi, Jangaon"],
      ["Jangaon Fort Area", "Heritage", "Old town landmark.", "Jangaon Fort, Jangaon"],
    ],
    "Jayashankar Bhupalpally": [
      ["Kaleshwaram Mukteswara Temple", "Temple", "Famous twin-lingam temple at the confluence of the Godavari and Pranahita.", "Kaleshwaram Temple, Jayashankar Bhupalpally"],
      ["Kaleshwaram Lift Irrigation Project", "Dam", "One of the largest lift irrigation projects, with a Medigadda barrage.", "Medigadda Barrage, Jayashankar Bhupalpally"],
    ],
    "Jogulamba Gadwal": [
      ["Jurala Dam", "Dam", "Large dam on the Krishna river, scenic after the monsoon.", "Jurala Dam, Jogulamba Gadwal"],
      ["Alampur Navabrahma Temples", "Heritage", "Group of nine 7th-century Chalukya temples.", "Navabrahma Temples, Alampur"],
      ["Gadwal Fort", "Fort", "Fort built by the Gadwal rulers.", "Gadwal Fort, Jogulamba Gadwal"],
    ],
    Kamareddy: [
      ["Nizam Sagar Dam", "Dam", "Large historic dam built across the Manjira river.", "Nizam Sagar Dam, Kamareddy"],
      ["Bhiknoor Siddhi Ramalingeswara Temple", "Temple", "Popular Shiva temple near Kamareddy.", "Bhiknoor Temple, Kamareddy"],
      ["Pocharam Wildlife Sanctuary", "Wildlife", "Forest sanctuary and lake near Medak.", "Pocharam Wildlife Sanctuary, Kamareddy"],
    ],
    Karimnagar: [
      ["Elgandal Fort", "Fort", "Old fort with a mosque and hilltop views.", "Elgandal Fort, Karimnagar"],
      ["Lower Manair Dam and Park", "Dam", "Reservoir, garden and evening spot in the city.", "Lower Manair Dam, Karimnagar"],
      ["Ujwala Park", "Tourism", "Family park with a lake in Karimnagar.", "Ujwala Park, Karimnagar"],
    ],
    Khammam: [
      ["Lakaram Lake", "Lake", "Large lake and sunset spot in Khammam.", "Lakaram Lake, Khammam"],
      ["Stambadri Lakshmi Narasimha Temple", "Temple", "Hilltop temple overlooking the city.", "Stambadri Temple, Khammam"],
      ["Nelakondapalli Buddhist Site", "Heritage", "Ancient Buddhist stupa site near Khammam.", "Nelakondapalli Buddhist Site, Khammam"],
    ],
    "Komaram Bheem Asifabad": [
      ["Komaram Bheem Project", "Dam", "Scenic dam and reservoir on the Peddavagu river.", "Komaram Bheem Project, Asifabad"],
      ["Sirpur Kagaznagar Area", "Tourism", "Industrial town known for its paper mill and nearby forests.", "Sirpur Kagaznagar, Komaram Bheem Asifabad"],
    ],
    Mahabubabad: [
      ["Kuravi Veerabhadra Swamy Temple", "Temple", "Ancient temple with fine sculptures.", "Kuravi Temple, Mahabubabad"],
      ["Pakhal Lake Area", "Lake", "Beautiful lake and wildlife area near Mahabubabad.", "Pakhal Lake, Mahabubabad"],
    ],
    Mahabubnagar: [
      ["Pillalamarri Banyan Tree", "Tourism", "A 700-year-old banyan tree spread over several acres.", "Pillalamarri, Mahabubnagar"],
      ["Mahabubnagar Mini Tank Bund", "Lake", "Lakeside park in the city.", "Mini Tank Bund, Mahabubnagar"],
      ["Koilkonda Fort", "Fort", "Hill fort built by the Golconda Sultans.", "Koilkonda Fort, Mahabubnagar"],
    ],
    Mancherial: [
      ["Kawal Tiger Reserve", "Wildlife", "Dense teak forest reserve with tigers and bison.", "Kawal Tiger Reserve, Mancherial"],
      ["Gudem Satyanarayana Swamy Temple", "Temple", "Hilltop temple on the Godavari.", "Gudem Temple, Mancherial"],
      ["Ramakrishnapur Godavari Ghat", "Tourism", "Peaceful river ghat.", "Godavari Ghat, Mancherial"],
    ],
    Medak: [
      ["Medak Cathedral", "Heritage", "One of the largest churches in Asia, built in the 20th century.", "Medak Cathedral, Medak"],
      ["Medak Fort", "Fort", "Kakatiya-era fort on a hill.", "Medak Fort, Medak"],
      ["Edupayala Vana Durga Temple", "Temple", "Temple of the Goddess Durga on the Manjira river.", "Edupayala Temple, Medak"],
    ],
    "Medchal-Malkajgiri": [
      ["Kompally Gardens", "Tourism", "Popular family spot in north Hyderabad.", "Kompally, Medchal-Malkajgiri"],
      ["Keesaragutta Temple", "Temple", "Hilltop Shiva temple near Hyderabad.", "Keesaragutta Temple, Medchal-Malkajgiri"],
    ],
    Mulugu: [
      ["Bogatha Waterfall", "Waterfall", "The 'Niagara of Telangana' in the forests of Mulugu.", "Bogatha Waterfalls, Mulugu"],
      ["Eturnagaram Wildlife Sanctuary", "Wildlife", "One of the oldest sanctuaries in Telangana.", "Eturnagaram Wildlife Sanctuary, Mulugu"],
      ["Ramappa Lake", "Lake", "Lake built next to the Ramappa Temple.", "Ramappa Lake, Mulugu"],
    ],
    Nagarkurnool: [
      ["Mallela Theertham Waterfall", "Waterfall", "Waterfall in the Nallamala forest, reached by a long stair.", "Mallela Theertham, Nagarkurnool"],
      ["Srisailam Backwaters Viewpoint", "Lake", "Scenic Krishna river backwaters.", "Srisailam Backwaters, Nagarkurnool"],
      ["Nagarkurnool Fort", "Fort", "Old hill fort near the district headquarters.", "Nagarkurnool Fort, Nagarkurnool"],
    ],
    Nalgonda: [
      ["Nagarjuna Sagar Dam", "Dam", "One of the world's largest masonry dams on the Krishna river.", "Nagarjuna Sagar Dam, Nalgonda"],
      ["Panagal Chhaya Someswara Temple", "Temple", "Temple famous for a shadow that never moves.", "Chhaya Someswara Temple, Panagal, Nalgonda"],
      ["Nagarjuna Konda Island Museum", "Museum", "Buddhist island museum reachable by boat.", "Nagarjunakonda Museum, Nalgonda"],
    ],
    Narayanpet: [
      ["Makthal Venugopala Swamy Temple", "Temple", "Historic temple near Makthal.", "Makthal Temple, Narayanpet"],
      ["Koilsagar Dam", "Dam", "Dam on the Peddavagu river.", "Koilsagar Dam, Narayanpet"],
    ],
    Nirmal: [
      ["Basar Gnana Saraswati Temple", "Temple", "One of the few Saraswati temples in India, on the Godavari bank.", "Basar Saraswati Temple, Nirmal"],
      ["Kuntala Waterfalls Gorge", "Waterfall", "Dramatic waterfall in forested hills.", "Kuntala Waterfalls, Nirmal"],
      ["Nirmal Fort", "Fort", "Historic fort in Nirmal town.", "Nirmal Fort, Nirmal"],
    ],
    Nizamabad: [
      ["Nizamabad Fort", "Fort", "Historic fort in the centre of the city.", "Nizamabad Fort, Nizamabad"],
      ["Alisagar Lake", "Lake", "Scenic lake with a deer park.", "Alisagar Lake, Nizamabad"],
      ["Dichpally Ramalayam", "Temple", "Beautiful 13th-century Rama temple.", "Dichpally Temple, Nizamabad"],
    ],
    Peddapalli: [
      ["Ramagundam NTPC Solar Park", "Tourism", "Large power plant complex and floating solar site.", "NTPC Ramagundam, Peddapalli"],
      ["Manthani Temples", "Temple", "Ancient temples on the Godavari bank.", "Manthani, Peddapalli"],
    ],
    "Rajanna Sircilla": [
      ["Vemulawada Raja Rajeshwara Temple", "Temple", "Famous Shiva temple, also called Dakshina Kashi.", "Vemulawada Temple, Rajanna Sircilla"],
      ["Mid Manair Dam", "Dam", "Large reservoir near Sircilla.", "Mid Manair Dam, Rajanna Sircilla"],
    ],
    Rangareddy: [
      ["Chilkur Balaji Temple", "Temple", "The 'Visa Balaji' temple near Hyderabad.", "Chilkur Balaji Temple, Rangareddy"],
      ["Ramoji Film City", "Tourism", "World's largest film studio complex.", "Ramoji Film City, Hayathnagar, Rangareddy"],
      ["Mrugavani National Park", "Wildlife", "Deer park near Chilkur.", "Mrugavani National Park, Rangareddy"],
    ],
    Sangareddy: [
      ["Singur Dam", "Dam", "Scenic dam on the Manjira river.", "Singur Dam, Sangareddy"],
      ["Kondapur Archaeological Museum", "Museum", "Ancient Satavahana-era site and museum.", "Kondapur Museum, Sangareddy"],
      ["Manjira Wildlife Sanctuary", "Wildlife", "Bird sanctuary on the Manjira river.", "Manjira Wildlife Sanctuary, Sangareddy"],
    ],
    Siddipet: [
      ["Komuravelli Mallanna Temple", "Temple", "Famous temple of Lord Mallikarjuna.", "Komuravelli Temple, Siddipet"],
      ["Mallanna Sagar Reservoir", "Dam", "Huge reservoir near Siddipet.", "Mallanna Sagar, Siddipet"],
      ["Koheda Market Yard", "Tourism", "One of the largest fruit markets near Hyderabad.", "Koheda, Siddipet"],
    ],
    Suryapet: [
      ["Pillalamarri Temples", "Heritage", "Kakatiya-era temples with carved pillars.", "Pillalamarri, Suryapet"],
      ["Lingamantula Swamy Temple", "Temple", "Ancient hill temple.", "Lingamantula Temple, Suryapet"],
      ["Mattapalli Narasimha Temple", "Temple", "Popular Narasimha temple on the Krishna river bank.", "Mattapalli Narasimha Temple, Suryapet"],
    ],
    Vikarabad: [
      ["Ananthagiri Hills", "Tourism", "Hill forest and viewpoint near Hyderabad.", "Ananthagiri Hills, Vikarabad"],
      ["Tandur Kagna River Viewpoint", "Tourism", "Scenic river spot near Tandur.", "Kagna River, Tandur, Vikarabad"],
      ["Mahaveer Harina Vanasthali", "Wildlife", "Deer park near the Hyderabad border.", "Mahavir Harina Vanasthali National Park, Hyderabad"],
    ],
    Wanaparthy: [
      ["Sarala Sagar Dam", "Dam", "Historic siphon dam, one of Asia's first.", "Sarala Sagar, Wanaparthy"],
      ["Wanaparthy Fort", "Fort", "Palace and fort of the Wanaparthy estate.", "Wanaparthy Fort, Wanaparthy"],
    ],
    Warangal: [
      ["Warangal Fort", "Fort", "Majestic Kakatiya fort with grand stone gateways.", "Warangal Fort, Warangal"],
      ["Pakhal Lake", "Lake", "Lake and wildlife sanctuary built in the 13th century.", "Pakhal Lake, Warangal"],
      ["Ramappa Temple", "Heritage", "UNESCO World Heritage site with floating-brick sculptures.", "Ramappa Temple, Palampet, Warangal"],
      ["Bhadrakali Lake", "Lake", "Scenic lake next to the Bhadrakali temple.", "Bhadrakali Lake, Warangal"],
    ],
    "Yadadri Bhuvanagiri": [
      ["Yadagirigutta Lakshmi Narasimha Temple", "Temple", "Popular hilltop pilgrimage site.", "Yadagirigutta Temple, Yadadri Bhuvanagiri"],
      ["Bhongir Fort", "Fort", "Huge monolithic rock fort, a popular trek.", "Bhongir Fort, Yadadri Bhuvanagiri"],
      ["Kolanupaka Jain Temple", "Heritage", "Ancient Jain temple with a famous Mahavira statue.", "Kolanupaka Temple, Yadadri Bhuvanagiri"],
    ],
  },
};

export const MORE_RESTAURANTS = {
  "Andhra Pradesh": {
    Srikakulam: [
      ["Kalingapatnam Beach Seafood Stalls", "Seafood", null, "Kalingapatnam, Srikakulam", "Fresh fried fish and prawns"],
      ["Srikakulam Sweet and Tiffin Stalls", "Tiffins & Sweets", null, "Srikakulam Town", "Pesarattu, idli and local sweets"],
    ],
    "Parvathipuram Manyam": [
      ["Local Tribal Food Stalls", "Tribal Cuisine", null, "Parvathipuram Manyam", "Bamboo chicken and millet dishes"],
    ],
    Vizianagaram: [
      ["Bobbili Local Mess", "Andhra Meals", null, "Bobbili, Vizianagaram", "Simple Andhra meals"],
      ["Vizianagaram Tiffin Centres", "Tiffins", null, "Vizianagaram Town", "Idli, vada and pesarattu"],
    ],
    Visakhapatnam: [
      ["The Spicy Venue", "Multi-cuisine", 4.2, "Siripuram, Visakhapatnam", "Seafood and Andhra specials"],
      ["Sea Inn", "Seafood", 4.1, "Beach Road, Visakhapatnam", "Seafood with a sea view"],
      ["Kailasagiri View Cafes", "Cafe", null, "Kailasagiri, Visakhapatnam", "Snacks and tea with a hill view"],
    ],
    "Alluri Sitharama Raju": [
      ["Tribal Bamboo Chicken Stalls", "Tribal Street Food", 4.3, "Araku Valley", "Bamboo chicken"],
      ["Lambasingi Roadside Tea Stalls", "Tea & Snacks", null, "Lambasingi", "Hot tea and local snacks in the cold"],
    ],
    Anakapalli: [
      ["Jaggery Market Sweet Stalls", "Sweets", null, "Anakapalli", "Fresh jaggery sweets"],
      ["Sankaram Roadside Dhabas", "Dhaba", null, "Sankaram, Anakapalli", "Simple dhaba meals"],
    ],
    Kakinada: [
      ["Kakinada Beach Seafood Stalls", "Seafood", null, "Kakinada Beach", "Fried prawns and fish"],
      ["Annavaram Prasadam Counters", "Sweets", null, "Annavaram, Kakinada", "Wheat rava prasadam"],
    ],
    "East Godavari": [
      ["Godavari Bank Tiffin Stalls", "Tiffins", null, "Rajahmundry", "Local Godavari-style tiffins"],
      ["Rajahmundry Pulasa Fish Curry Spots", "Seafood", null, "Rajahmundry", "Seasonal pulasa fish curry"],
    ],
    "Dr. B.R. Ambedkar Konaseema": [
      ["Konaseema Coconut Chutney Meals", "Konaseema Cuisine", null, "Amalapuram", "Coconut-based local meals"],
      ["Atreyapuram Putharekulu Shops", "Sweets", null, "Atreyapuram", "Paper sweet with GI status"],
    ],
    Eluru: [
      ["Eluru Biryani Points", "Biryani", null, "Eluru", "Chicken biryani"],
      ["Kolleru Fish Fry Stalls", "Seafood", null, "Kolleru, Eluru", "Fresh lake fish fry"],
    ],
    "West Godavari": [
      ["Bhimavaram Prawn Fry Centres", "Seafood", null, "Bhimavaram", "Prawn fry"],
      ["Palakollu Tiffin Stalls", "Tiffins", null, "Palakollu", "Local tiffins"],
    ],
    NTR: [
      ["Hotel Minerva Grand", "South Indian Veg", 4.2, "Vijayawada", "Meals and tiffins"],
      ["Spicy Venue", "Multi-cuisine", 4.1, "Vijayawada", "Andhra and Chinese"],
      ["Prakasam Barrage Evening Snack Stalls", "Street Food", null, "Prakasam Barrage, Vijayawada", "Bajji, mirchi and snacks"],
    ],
    Krishna: [
      ["Bandar Laddu Shops", "Sweets", null, "Machilipatnam", "Famous Bandar laddu"],
      ["Manginapudi Beach Seafood Stalls", "Seafood", null, "Manginapudi Beach, Krishna", "Fish fry"],
    ],
    Guntur: [
      ["Guntur Chilli Dhabas", "Dhaba", null, "Guntur", "Spicy Guntur chicken curry"],
      ["Guntur Mirchi Bajji Stalls", "Street Food", null, "Guntur", "Chilli bajji"],
    ],
    Palnadu: [
      ["Narasaraopet Palnadu Meal Spots", "Palnadu Cuisine", null, "Narasaraopet", "Spicy non-veg meals"],
      ["Macherla Dhabas", "Dhaba", null, "Macherla, Palnadu", "Rural-style curries"],
    ],
    Bapatla: [
      ["Chirala Seafood Spots", "Seafood", null, "Chirala, Bapatla", "Fresh fish curry"],
      ["Suryalanka Evening Snack Stalls", "Street Food", null, "Suryalanka, Bapatla", "Beach snacks"],
    ],
    Prakasam: [
      ["Ongole Mutton Biryani Spots", "Biryani", null, "Ongole", "Mutton biryani"],
      ["Kothapatnam Fish Fry Stalls", "Seafood", null, "Kothapatnam, Prakasam", "Fish fry"],
    ],
    Markapuram: [
      ["Markapuram Tiffin Centres", "Tiffins", null, "Markapuram", "Idli and vada"],
      ["Cumbum Roadside Dhabas", "Dhaba", null, "Cumbum, Markapuram", "Simple dhaba meals"],
    ],
    "Sri Potti Sriramulu Nellore": [
      ["Nellore Chepala Pulusu Spots", "Nellore Cuisine", null, "Nellore", "Famous fish curry"],
      ["Nellore Andhra Meals Hotels", "Andhra Meals", null, "Nellore", "Spicy Nellore meals"],
    ],
    Kurnool: [
      ["Kurnool Biryani Points", "Biryani", null, "Kurnool", "Kurnool biryani"],
      ["Mantralayam Prasadam Dining", "Veg Meals", null, "Mantralayam, Kurnool", "Temple-style veg meals"],
    ],
    Nandyal: [
      ["Srisailam Temple Dining Halls", "Veg Meals", null, "Srisailam, Nandyal", "Temple prasadam meals"],
      ["Nandyal Biryani Spots", "Biryani", null, "Nandyal", "Chicken biryani"],
    ],
    Anantapur: [
      ["Anantapur Ragi Sangati Hotels", "Rayalaseema Cuisine", null, "Anantapur", "Ragi sangati with curry"],
      ["Tadipatri Tiffin Centres", "Tiffins", null, "Tadipatri, Anantapur", "Local tiffins"],
    ],
    "Sri Sathya Sai": [
      ["Puttaparthi Veg Canteens", "Veg Meals", null, "Puttaparthi", "Simple South Indian veg meals"],
      ["Kadiri Dhabas", "Dhaba", null, "Kadiri, Sri Sathya Sai", "Rayalaseema curries"],
    ],
    "YSR Kadapa": [
      ["Kadapa Mutton Biryani Spots", "Biryani", null, "Kadapa", "Rayalaseema mutton biryani"],
      ["Gandikota Roadside Dhabas", "Dhaba", null, "Gandikota, YSR Kadapa", "Simple village meals"],
    ],
    Annamayya: [
      ["Madanapalle Tomato Chutney Meals", "Andhra Meals", null, "Madanapalle", "Local Rayalaseema meals"],
      ["Rayachoti Tiffin Centres", "Tiffins", null, "Rayachoti", "Idli, dosa and vada"],
    ],
    Chittoor: [
      ["Chittoor Mango Juice Stalls", "Juice & Snacks", null, "Chittoor", "Fresh mango juice in season"],
      ["Kanipakam Prasadam Counters", "Sweets", null, "Kanipakam, Chittoor", "Temple prasadam"],
    ],
    Tirupati: [
      ["Hotel Bhimas Deluxe", "South Indian Veg", 4.1, "Tirupati", "Meals and tiffins"],
      ["Tirumala Laddu Prasadam", "Temple Prasadam", 4.8, "Tirumala, Tirupati", "The famous Tirupati laddu"],
      ["Tirupati Gandhi Road Tiffin Hotels", "Tiffins", null, "Gandhi Road, Tirupati", "Idli, dosa and vada"],
    ],
    Polavaram: [
      ["Papikondalu Boat Lunch Packs", "Local Meals", null, "Polavaram", "Boat-trip meals"],
      ["Rampachodavaram Tribal Kitchen Stalls", "Tribal Cuisine", null, "Rampachodavaram", "Bamboo chicken"],
    ],
  },

  Telangana: {
    Adilabad: [
      ["Adilabad Jowar Roti Hotels", "Telangana Meals", null, "Adilabad", "Jowar roti with curry"],
      ["Kuntala Falls Roadside Stalls", "Snacks", null, "Kuntala, Adilabad", "Tea and snacks"],
    ],
    "Bhadradri Kothagudem": [
      ["Bhadrachalam Prasadam Counters", "Sweets", null, "Bhadrachalam", "Temple laddu and pulihora"],
      ["Bhadrachalam Godavari Bank Eateries", "Veg Meals", null, "Bhadrachalam", "Pilgrim meals"],
    ],
    Hanumakonda: [
      ["Hanamkonda Mirchi Bajji Stalls", "Street Food", null, "Hanamkonda", "Mirchi bajji"],
      ["Kakatiya Tiffin Centres", "Tiffins", null, "Hanumakonda", "Idli and dosa"],
    ],
    Hyderabad: [
      ["Bawarchi", "Hyderabadi Biryani", 4.2, "RTC X Roads, Hyderabad", "Chicken dum biryani"],
      ["Ohri's", "Multi-cuisine", 4.1, "Banjara Hills, Hyderabad", "Multi-cuisine buffet"],
      ["Rameshwaram Cafe", "South Indian Veg", 4.5, "Madhapur, Hyderabad", "Ghee podi idli and filter coffee"],
      ["Cafe Niloufer", "Irani Cafe", 4.3, "Lakdikapul, Hyderabad", "Irani chai and Osmania biscuits"],
      ["Shah Ghouse Cafe", "Hyderabadi Mughlai", 4.1, "Tolichowki, Hyderabad", "Haleem and biryani"],
    ],
    Jagtial: [
      ["Kondagattu Prasadam Counters", "Sweets", null, "Kondagattu, Jagtial", "Temple prasadam"],
      ["Jagtial Mango Juice Stalls", "Juice", null, "Jagtial", "Fresh mango juice in season"],
    ],
    Jangaon: [
      ["Jangaon Tiffin Stalls", "Tiffins", null, "Jangaon", "Idli and dosa"],
    ],
    "Jayashankar Bhupalpally": [
      ["Kaleshwaram Godavari Fish Stalls", "Seafood", null, "Kaleshwaram", "River fish fry"],
      ["Bhupalpally Dhabas", "Dhaba", null, "Bhupalpally", "Telangana-style meals"],
    ],
    "Jogulamba Gadwal": [
      ["Jurala Dam Fish Fry Stalls", "Seafood", null, "Jurala Dam, Gadwal", "Dam-side fish fry"],
      ["Gadwal Mirchi Bajji Stalls", "Street Food", null, "Gadwal", "Mirchi bajji"],
    ],
    Kamareddy: [
      ["Nizam Sagar Fish Stalls", "Seafood", null, "Nizam Sagar, Kamareddy", "Fresh dam fish fry"],
      ["Kamareddy Tiffin Centres", "Tiffins", null, "Kamareddy", "Local tiffins"],
    ],
    Karimnagar: [
      ["Karimnagar Mutton Biryani Spots", "Biryani", null, "Karimnagar", "Mutton biryani"],
      ["Karimnagar Sarva Pindi Stalls", "Telangana Snacks", null, "Karimnagar", "Sarva pindi"],
    ],
    Khammam: [
      ["Khammam Spicy Chicken Fry Spots", "Telangana Meals", null, "Khammam", "Spicy chicken fry"],
      ["Khammam Mirchi Bajji Stalls", "Street Food", null, "Khammam", "Chilli bajji"],
    ],
    "Komaram Bheem Asifabad": [
      ["Asifabad Tribal Food Stalls", "Tribal Cuisine", null, "Asifabad", "Tribal-style curries"],
    ],
    Mahabubabad: [
      ["Mahabubabad Tiffin Centres", "Tiffins", null, "Mahabubabad", "Local tiffins"],
    ],
    Mahabubnagar: [
      ["Mahabubnagar Pillalamarri Food Stalls", "Snacks", null, "Pillalamarri, Mahabubnagar", "Tea and snacks"],
      ["Mahabubnagar Biryani Spots", "Biryani", null, "Mahabubnagar", "Chicken biryani"],
    ],
    Mancherial: [
      ["Mancherial Godavari Fish Curry Spots", "Seafood", null, "Mancherial", "River fish curry"],
    ],
    Medak: [
      ["Medak Cathedral Street Stalls", "Street Food", null, "Medak Cathedral, Medak", "Snacks and tea"],
      ["Medak Edupayala Dhabas", "Dhaba", null, "Edupayala, Medak", "Village-style meals"],
    ],
    "Medchal-Malkajgiri": [
      ["Kompally Multi-cuisine Restaurants", "Multi-cuisine", null, "Kompally", "Biryani and tandoori"],
      ["Uppal Tiffin Hotels", "Tiffins", null, "Uppal", "Idli and dosa"],
    ],
    Mulugu: [
      ["Eturnagaram Forest Camp Meals", "Local Meals", null, "Eturnagaram, Mulugu", "Forest-camp meals"],
      ["Medaram Jatara Food Stalls", "Telangana Meals", null, "Medaram, Mulugu", "Festival-time meals"],
    ],
    Nagarkurnool: [
      ["Srisailam Highway Dhabas", "Dhaba", null, "Nagarkurnool", "Rotis and curries"],
    ],
    Nalgonda: [
      ["Nagarjuna Sagar Reservoir Fish Fry Stalls", "Seafood", 4.2, "Nagarjuna Sagar", "Fresh fish fry"],
      ["Nalgonda Biryani Spots", "Biryani", null, "Nalgonda", "Chicken biryani"],
    ],
    Narayanpet: [
      ["Narayanpet Tiffin Hotels", "Tiffins", null, "Narayanpet", "Idli and dosa"],
    ],
    Nirmal: [
      ["Basar Temple Prasadam Counters", "Sweets", null, "Basar, Nirmal", "Temple prasadam"],
      ["Nirmal Tiffin Hotels", "Tiffins", null, "Nirmal", "Idli and vada"],
    ],
    Nizamabad: [
      ["Alisagar Lake Snack Stalls", "Snacks", null, "Alisagar, Nizamabad", "Tea and snacks"],
      ["Nizamabad Turmeric Chicken Curry Spots", "Telangana Meals", null, "Nizamabad", "Spicy chicken curry"],
    ],
    Peddapalli: [
      ["Ramagundam Tiffin Hotels", "Tiffins", null, "Ramagundam", "Idli and dosa"],
    ],
    "Rajanna Sircilla": [
      ["Vemulawada Temple Prasadam Counters", "Sweets", null, "Vemulawada", "Temple prasadam"],
    ],
    Rangareddy: [
      ["Chilkur Balaji Temple Area Eateries", "Veg Meals", null, "Chilkur, Rangareddy", "Simple veg meals"],
      ["Ramoji Film City Food Courts", "Multi-cuisine", null, "Ramoji Film City, Rangareddy", "Food court meals"],
    ],
    Sangareddy: [
      ["Singur Dam Fish Fry Stalls", "Seafood", null, "Singur Dam, Sangareddy", "Fresh fish fry"],
      ["Zaheerabad Tiffin Centres", "Tiffins", null, "Zaheerabad, Sangareddy", "Local tiffins"],
    ],
    Siddipet: [
      ["Komuravelli Prasadam Counters", "Sweets", null, "Komuravelli, Siddipet", "Temple prasadam"],
      ["Siddipet Biryani Spots", "Biryani", null, "Siddipet", "Chicken biryani"],
    ],
    Suryapet: [
      ["Suryapet Highway Dhabas", "Dhaba", null, "Suryapet", "Rotis and curries"],
    ],
    Vikarabad: [
      ["Ananthagiri Hills Roadside Stalls", "Snacks", null, "Ananthagiri Hills, Vikarabad", "Tea and snacks"],
      ["Tandur Dal Rice Meal Spots", "Telangana Meals", null, "Tandur, Vikarabad", "Tur dal meals"],
    ],
    Wanaparthy: [
      ["Wanaparthy Tiffin Hotels", "Tiffins", null, "Wanaparthy", "Idli and dosa"],
    ],
    Warangal: [
      ["Warangal Mirchi Bajji Stalls", "Street Food", null, "Warangal", "Famous mirchi bajji"],
      ["Warangal Fort Area Tiffin Stalls", "Tiffins", null, "Warangal Fort, Warangal", "Local tiffins"],
    ],
    "Yadadri Bhuvanagiri": [
      ["Yadagirigutta Prasadam Counters", "Sweets", null, "Yadagirigutta", "Laddu and pulihora"],
      ["Bhongir Tiffin Hotels", "Tiffins", null, "Bhongir, Yadadri Bhuvanagiri", "Idli and dosa"],
    ],
  },
};
