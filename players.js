const players = [
  {
    "id": "P001",
    "name": "Suryakumar Yadav",
    "category": "Batter",
    "team": "IND",
    "group": "A",
    "credits": 10
  },
  {
    "id": "P002",
    "name": "Abhishek Sharma",
    "category": "All-Rounder",
    "team": "IND",
    "group": "A",
    "credits": 11
  },
  {
    "id": "P003",
    "name": "Tilak Varma",
    "category": "Batter",
    "team": "IND",
    "group": "A",
    "credits": 9
  },
  {
    "id": "P004",
    "name": "Sanju Samson",
    "category": "Wicket-Keeper",
    "team": "IND",
    "group": "A",
    "credits": 7
  },
  {
    "id": "P005",
    "name": "Shivam Dube",
    "category": "All-Rounder",
    "team": "IND",
    "group": "A",
    "credits": 8.5
  },
  {
    "id": "P006",
    "name": "Ishan Kishan",
    "category": "Wicket-Keeper",
    "team": "IND",
    "group": "A",
    "credits": 11
  },
  {
    "id": "P007",
    "name": "Hardik Pandya",
    "category": "All-Rounder",
    "team": "IND",
    "group": "A",
    "credits": 10.5
  },
  {
    "id": "P008",
    "name": "Arshdeep Singh",
    "category": "Bowler",
    "team": "IND",
    "group": "A",
    "credits": 7.5
  },
  {
    "id": "P009",
    "name": "Jasprit Bumrah",
    "category": "Bowler",
    "team": "IND",
    "group": "A",
    "credits": 9.5
  },
  {
    "id": "P010",
    "name": "Harshit Rana",
    "category": "Bowler",
    "team": "IND",
    "group": "A",
    "credits": 7
  },
  {
    "id": "P011",
    "name": "Varun Chakaravarthy",
    "category": "Bowler",
    "team": "IND",
    "group": "A",
    "credits": 10
  },
  {
    "id": "P012",
    "name": "Kuldeep Yadav",
    "category": "Bowler",
    "team": "IND",
    "group": "A",
    "credits": 8
  },
  {
    "id": "P013",
    "name": "Axar Patel",
    "category": "All-Rounder",
    "team": "IND",
    "group": "A",
    "credits": 7.5
  },
  {
    "id": "P014",
    "name": "Washington Sundar",
    "category": "All-Rounder",
    "team": "IND",
    "group": "A",
    "credits": 7
  },
  {
    "id": "P015",
    "name": "Rinku Singh",
    "category": "Batter",
    "team": "IND",
    "group": "A",
    "credits": 8
  },
  {
    "id": "P016",
    "name": "Monank Patel",
    "category": "Wicket-Keeper",
    "team": "USA",
    "group": "A",
    "credits": 8
  },
  {
    "id": "P017",
    "name": "Jasdeep Singh",
    "category": "Bowler",
    "team": "USA",
    "group": "A",
    "credits": 7.5
  },
  {
    "id": "P018",
    "name": "Andries Gous",
    "category": "Wicket-Keeper",
    "team": "USA",
    "group": "A",
    "credits": 7
  },
  {
    "id": "P019",
    "name": "Shehan Jayasuriya",
    "category": "All-Rounder",
    "team": "USA",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P020",
    "name": "Milind Kumar",
    "category": "All-Rounder",
    "team": "USA",
    "group": "A",
    "credits": 7
  },
  {
    "id": "P021",
    "name": "Shayan Jahangir",
    "category": "Wicket-Keeper",
    "team": "USA",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P022",
    "name": "Saiteja Mukkamala",
    "category": "Batter",
    "team": "USA",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P023",
    "name": "Sanjay Krishnamurthi",
    "category": "All-Rounder",
    "team": "USA",
    "group": "A",
    "credits": 7
  },
  {
    "id": "P024",
    "name": "Harmeet Singh",
    "category": "All-Rounder",
    "team": "USA",
    "group": "A",
    "credits": 5.5
  },
  {
    "id": "P025",
    "name": "Nosthush Kenjige",
    "category": "Bowler",
    "team": "USA",
    "group": "A",
    "credits": 7
  },
  {
    "id": "P026",
    "name": "Shadley Van Schalkwyk",
    "category": "All-Rounder",
    "team": "USA",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P027",
    "name": "Saurabh Netravalkar",
    "category": "Bowler",
    "team": "USA",
    "group": "A",
    "credits": 7
  },
  {
    "id": "P028",
    "name": "Ali Khan",
    "category": "Bowler",
    "team": "USA",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P029",
    "name": "Mohammad Mohsin",
    "category": "All-Rounder",
    "team": "USA",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P030",
    "name": "Shubham Ranjane",
    "category": "All-Rounder",
    "team": "USA",
    "group": "A",
    "credits": 7.5
  },
  {
    "id": "P031",
    "name": "Gerhard Erasmus",
    "category": "All-Rounder",
    "team": "NAM",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P032",
    "name": "Zane Green",
    "category": "Wicket-Keeper",
    "team": "NAM",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P033",
    "name": "Bernard Scholtz",
    "category": "Bowler",
    "team": "NAM",
    "group": "A",
    "credits": 5.5
  },
  {
    "id": "P034",
    "name": "Ruben Trumpelmann",
    "category": "Bowler",
    "team": "NAM",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P035",
    "name": "JJ Smit",
    "category": "All-Rounder",
    "team": "NAM",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P036",
    "name": "Jan Frylinck",
    "category": "All-Rounder",
    "team": "NAM",
    "group": "A",
    "credits": 5.5
  },
  {
    "id": "P037",
    "name": "Louren Steenkamp",
    "category": "All-Rounder",
    "team": "NAM",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P038",
    "name": "Malan Kruger",
    "category": "Batter",
    "team": "NAM",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P039",
    "name": "Nicol Loftie-Eaton",
    "category": "Wicket-Keeper",
    "team": "NAM",
    "group": "A",
    "credits": 5
  },
  {
    "id": "P040",
    "name": "Jack Brassell",
    "category": "Bowler",
    "team": "NAM",
    "group": "A",
    "credits": 5.5
  },
  {
    "id": "P041",
    "name": "Ben Shikongo",
    "category": "Bowler",
    "team": "NAM",
    "group": "A",
    "credits": 5
  },
  {
    "id": "P042",
    "name": "Jan Balt",
    "category": "All-Rounder",
    "team": "NAM",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P043",
    "name": "Dylan Leicher",
    "category": "All-Rounder",
    "team": "NAM",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P044",
    "name": "Willem Myburgh",
    "category": "Bowler",
    "team": "NAM",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P045",
    "name": "Max Heingo",
    "category": "Bowler",
    "team": "NAM",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P046",
    "name": "Scott Edwards",
    "category": "Wicket-Keeper",
    "team": "NED",
    "group": "A",
    "credits": 7.5
  },
  {
    "id": "P047",
    "name": "Colin Ackermann",
    "category": "All-Rounder",
    "team": "NED",
    "group": "A",
    "credits": 7
  },
  {
    "id": "P048",
    "name": "Noah Croes",
    "category": "Batter",
    "team": "NED",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P049",
    "name": "Bas de Leede",
    "category": "All-Rounder",
    "team": "NED",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P050",
    "name": "Aryan Dutt",
    "category": "Bowler",
    "team": "NED",
    "group": "A",
    "credits": 5
  },
  {
    "id": "P051",
    "name": "Fred Klaassen",
    "category": "Bowler",
    "team": "NED",
    "group": "A",
    "credits": 5.5
  },
  {
    "id": "P052",
    "name": "Kyle Klein",
    "category": "Bowler",
    "team": "NED",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P053",
    "name": "Michael Levitt",
    "category": "All-Rounder",
    "team": "NED",
    "group": "A",
    "credits": 5.5
  },
  {
    "id": "P054",
    "name": "Zach Lion-Cachet",
    "category": "Batter",
    "team": "NED",
    "group": "A",
    "credits": 5
  },
  {
    "id": "P055",
    "name": "Max O'Dowd",
    "category": "Batter",
    "team": "NED",
    "group": "A",
    "credits": 5
  },
  {
    "id": "P056",
    "name": "Logan van Beek",
    "category": "Bowler",
    "team": "NED",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P057",
    "name": "Timm van der Gugten",
    "category": "All-Rounder",
    "team": "NED",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P058",
    "name": "Roelof van der Merwe",
    "category": "Bowler",
    "team": "NED",
    "group": "A",
    "credits": 5
  },
  {
    "id": "P059",
    "name": "Paul van Meekeren",
    "category": "Bowler",
    "team": "NED",
    "group": "A",
    "credits": 5.5
  },
  {
    "id": "P060",
    "name": "Saqib Zulfiqar",
    "category": "All-Rounder",
    "team": "NED",
    "group": "A",
    "credits": 5
  },
  {
    "id": "P061",
    "name": "Salman Ali Agha",
    "category": "All-Rounder",
    "team": "PAK",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P062",
    "name": "Abrar Ahmed",
    "category": "Bowler",
    "team": "PAK",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P063",
    "name": "Babar Azam",
    "category": "Batter",
    "team": "PAK",
    "group": "A",
    "credits": 0.5
  },
  {
    "id": "P064",
    "name": "Faheem Ashraf",
    "category": "All-Rounder",
    "team": "PAK",
    "group": "A",
    "credits": 5
  },
  {
    "id": "P065",
    "name": "Fakhar Zaman",
    "category": "Batter",
    "team": "PAK",
    "group": "A",
    "credits": 7
  },
  {
    "id": "P066",
    "name": "Khawaja Nafay",
    "category": "Wicket-Keeper",
    "team": "PAK",
    "group": "A",
    "credits": 4.5
  },
  {
    "id": "P067",
    "name": "Mohammad Nawaz",
    "category": "All-Rounder",
    "team": "PAK",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P068",
    "name": "Mohammad Salman Mirza",
    "category": "Bowler",
    "team": "PAK",
    "group": "A",
    "credits": 4
  },
  {
    "id": "P069",
    "name": "Naseem Shah",
    "category": "Bowler",
    "team": "PAK",
    "group": "A",
    "credits": 7.5
  },
  {
    "id": "P070",
    "name": "Sahibzada Farhan",
    "category": "Wicket-Keeper",
    "team": "PAK",
    "group": "A",
    "credits": 5
  },
  {
    "id": "P071",
    "name": "Saim Ayub",
    "category": "All-Rounder",
    "team": "PAK",
    "group": "A",
    "credits": 6.5
  },
  {
    "id": "P072",
    "name": "Shaheen Shah Afridi",
    "category": "Bowler",
    "team": "PAK",
    "group": "A",
    "credits": 8.5
  },
  {
    "id": "P073",
    "name": "Shadab Khan",
    "category": "All-Rounder",
    "team": "PAK",
    "group": "A",
    "credits": 6
  },
  {
    "id": "P074",
    "name": "Usman Khan",
    "category": "Wicket-Keeper",
    "team": "PAK",
    "group": "A",
    "credits": 5
  },
  {
    "id": "P075",
    "name": "Usman Tariq",
    "category": "Bowler",
    "team": "PAK",
    "group": "A",
    "credits": 3.5
  },
  {
    "id": "P076",
    "name": "Mitchell Marsh",
    "category": "All-Rounder",
    "team": "AUS",
    "group": "B",
    "credits": 10
  },
  {
    "id": "P077",
    "name": "Xavier Bartlett",
    "category": "Bowler",
    "team": "AUS",
    "group": "B",
    "credits": 7
  },
  {
    "id": "P078",
    "name": "Cooper Connolly",
    "category": "All-Rounder",
    "team": "AUS",
    "group": "B",
    "credits": 6.5
  },
  {
    "id": "P079",
    "name": "Tim David",
    "category": "Batter",
    "team": "AUS",
    "group": "B",
    "credits": 10.5
  },
  {
    "id": "P080",
    "name": "Ben Dwarshuis",
    "category": "Bowler",
    "team": "AUS",
    "group": "B",
    "credits": 6
  },
  {
    "id": "P081",
    "name": "Cameron Green",
    "category": "All-Rounder",
    "team": "AUS",
    "group": "B",
    "credits": 9
  },
  {
    "id": "P082",
    "name": "Nathan Ellis",
    "category": "Bowler",
    "team": "AUS",
    "group": "B",
    "credits": 8
  },
  {
    "id": "P083",
    "name": "Sean Abbott",
    "category": "Bowler",
    "team": "AUS",
    "group": "B",
    "credits": 7
  },
  {
    "id": "P084",
    "name": "Travis Head",
    "category": "Batter",
    "team": "AUS",
    "group": "B",
    "credits": 11
  },
  {
    "id": "P085",
    "name": "Josh Inglis",
    "category": "Wicket-Keeper",
    "team": "AUS",
    "group": "B",
    "credits": 7.5
  },
  {
    "id": "P086",
    "name": "Matthew Kuhnemann",
    "category": "Bowler",
    "team": "AUS",
    "group": "B",
    "credits": 5.5
  },
  {
    "id": "P087",
    "name": "Glenn Maxwell",
    "category": "All-Rounder",
    "team": "AUS",
    "group": "B",
    "credits": 1
  },
  {
    "id": "P088",
    "name": "Matthew Renshaw",
    "category": "Batter",
    "team": "AUS",
    "group": "B",
    "credits": 3.5
  },
  {
    "id": "P089",
    "name": "Marcus Stoinis",
    "category": "All-Rounder",
    "team": "AUS",
    "group": "B",
    "credits": 7.5
  },
  {
    "id": "P090",
    "name": "Adam Zampa",
    "category": "Bowler",
    "team": "AUS",
    "group": "B",
    "credits": 7
  },
  {
    "id": "P091",
    "name": "Dasun Shanaka",
    "category": "All-Rounder",
    "team": "SL",
    "group": "B",
    "credits": 8.5
  },
  {
    "id": "P092",
    "name": "Pathum Nissanka",
    "category": "Batter",
    "team": "SL",
    "group": "B",
    "credits": 9.5
  },
  {
    "id": "P093",
    "name": "Kamil Mishara",
    "category": "Wicket-Keeper",
    "team": "SL",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P094",
    "name": "Kusal Mendis",
    "category": "Wicket-Keeper",
    "team": "SL",
    "group": "B",
    "credits": 6.5
  },
  {
    "id": "P095",
    "name": "Kamindu Mendis",
    "category": "All-Rounder",
    "team": "SL",
    "group": "B",
    "credits": 7.5
  },
  {
    "id": "P096",
    "name": "Kusal Perera",
    "category": "Wicket-Keeper",
    "team": "SL",
    "group": "B",
    "credits": 7
  },
  {
    "id": "P097",
    "name": "Charith Asalanka",
    "category": "All-Rounder",
    "team": "SL",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P098",
    "name": "Janith Liyanage",
    "category": "All-Rounder",
    "team": "SL",
    "group": "B",
    "credits": 4.5
  },
  {
    "id": "P099",
    "name": "Pavan Rathnayake",
    "category": "Batter",
    "team": "SL",
    "group": "B",
    "credits": 4
  },
  {
    "id": "P100",
    "name": "Wanindu Hasaranga",
    "category": "All-Rounder",
    "team": "SL",
    "group": "B",
    "credits": 3
  },
  {
    "id": "P101",
    "name": "Dunith Wellalage",
    "category": "All-Rounder",
    "team": "SL",
    "group": "B",
    "credits": 5.5
  },
  {
    "id": "P102",
    "name": "Maheesh Theekshana",
    "category": "Bowler",
    "team": "SL",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P103",
    "name": "Dushmantha Chameera",
    "category": "Bowler",
    "team": "SL",
    "group": "B",
    "credits": 2
  },
  {
    "id": "P104",
    "name": "Matheesha Pathirana",
    "category": "Bowler",
    "team": "SL",
    "group": "B",
    "credits": 6
  },
  {
    "id": "P105",
    "name": "Eshan Malinga",
    "category": "Bowler",
    "team": "SL",
    "group": "B",
    "credits": 2
  },
  {
    "id": "P106",
    "name": "Sikandar Raza",
    "category": "All-Rounder",
    "team": "ZIM",
    "group": "B",
    "credits": 6
  },
  {
    "id": "P107",
    "name": "Brian Bennett",
    "category": "All-Rounder",
    "team": "ZIM",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P108",
    "name": "Ryan Burl",
    "category": "All-Rounder",
    "team": "ZIM",
    "group": "B",
    "credits": 3
  },
  {
    "id": "P109",
    "name": "Graeme Cremer",
    "category": "Bowler",
    "team": "ZIM",
    "group": "B",
    "credits": 5
  },
  {
    "id": "P110",
    "name": "Bradley Evans",
    "category": "All-Rounder",
    "team": "ZIM",
    "group": "B",
    "credits": 2
  },
  {
    "id": "P111",
    "name": "Clive Madande",
    "category": "Wicket-Keeper",
    "team": "ZIM",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P112",
    "name": "Tinotenda Maposa",
    "category": "All-Rounder",
    "team": "ZIM",
    "group": "B",
    "credits": 4
  },
  {
    "id": "P113",
    "name": "Tadiwanashe Marumani",
    "category": "Wicket-Keeper",
    "team": "ZIM",
    "group": "B",
    "credits": 3
  },
  {
    "id": "P114",
    "name": "Wellington Masakadza",
    "category": "Bowler",
    "team": "ZIM",
    "group": "B",
    "credits": 1.5
  },
  {
    "id": "P115",
    "name": "Tony Munyonga",
    "category": "All-Rounder",
    "team": "ZIM",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P116",
    "name": "Tashinga Musekiwa",
    "category": "Batter",
    "team": "ZIM",
    "group": "B",
    "credits": 3.5
  },
  {
    "id": "P117",
    "name": "Blessing Muzarabani",
    "category": "Bowler",
    "team": "ZIM",
    "group": "B",
    "credits": 4.5
  },
  {
    "id": "P118",
    "name": "Dion Myers",
    "category": "Batter",
    "team": "ZIM",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P119",
    "name": "Richard Ngarava",
    "category": "Bowler",
    "team": "ZIM",
    "group": "B",
    "credits": 4
  },
  {
    "id": "P120",
    "name": "Brendan Taylor",
    "category": "Wicket-Keeper",
    "team": "ZIM",
    "group": "B",
    "credits": 3.5
  },
  {
    "id": "P121",
    "name": "Paul Stirling",
    "category": "All-Rounder",
    "team": "IRE",
    "group": "B",
    "credits": 6
  },
  {
    "id": "P122",
    "name": "Mark Adair",
    "category": "Bowler",
    "team": "IRE",
    "group": "B",
    "credits": 4.5
  },
  {
    "id": "P123",
    "name": "Ross Adair",
    "category": "Batter",
    "team": "IRE",
    "group": "B",
    "credits": 2
  },
  {
    "id": "P124",
    "name": "Benjamin Calitz",
    "category": "Batter",
    "team": "IRE",
    "group": "B",
    "credits": 3.5
  },
  {
    "id": "P125",
    "name": "Curtis Campher",
    "category": "All-Rounder",
    "team": "IRE",
    "group": "B",
    "credits": 5
  },
  {
    "id": "P126",
    "name": "Gareth Delany",
    "category": "All-Rounder",
    "team": "IRE",
    "group": "B",
    "credits": 3.5
  },
  {
    "id": "P127",
    "name": "George Dockrell",
    "category": "All-Rounder",
    "team": "IRE",
    "group": "B",
    "credits": 3
  },
  {
    "id": "P128",
    "name": "Matthew Humphreys",
    "category": "All-Rounder",
    "team": "IRE",
    "group": "B",
    "credits": 4
  },
  {
    "id": "P129",
    "name": "Josh Little",
    "category": "Bowler",
    "team": "IRE",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P130",
    "name": "Barry McCarthy",
    "category": "Bowler",
    "team": "IRE",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P131",
    "name": "Harry Tector",
    "category": "Batter",
    "team": "IRE",
    "group": "B",
    "credits": 4.5
  },
  {
    "id": "P132",
    "name": "Tim Tector",
    "category": "Batter",
    "team": "IRE",
    "group": "B",
    "credits": 1.5
  },
  {
    "id": "P133",
    "name": "Lorcan Tucker",
    "category": "Wicket-Keeper",
    "team": "IRE",
    "group": "B",
    "credits": 3.5
  },
  {
    "id": "P134",
    "name": "Ben White",
    "category": "Bowler",
    "team": "IRE",
    "group": "B",
    "credits": 4
  },
  {
    "id": "P135",
    "name": "Craig Young",
    "category": "Bowler",
    "team": "IRE",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P136",
    "name": "Jatinder Singh",
    "category": "Batter",
    "team": "OMA",
    "group": "B",
    "credits": 5
  },
  {
    "id": "P137",
    "name": "Vinayak Shukla",
    "category": "Wicket-Keeper",
    "team": "OMA",
    "group": "B",
    "credits": 3.5
  },
  {
    "id": "P138",
    "name": "Mohammad Nadeem",
    "category": "All-Rounder",
    "team": "OMA",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P139",
    "name": "Shakeel Ahmad",
    "category": "Bowler",
    "team": "OMA",
    "group": "B",
    "credits": 1.5
  },
  {
    "id": "P140",
    "name": "Hammad Mirza",
    "category": "Wicket-Keeper",
    "team": "OMA",
    "group": "B",
    "credits": 3
  },
  {
    "id": "P141",
    "name": "Wasim Ali",
    "category": "All-Rounder",
    "team": "OMA",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P142",
    "name": "Karan Sonavale",
    "category": "All-Rounder",
    "team": "OMA",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P143",
    "name": "Shah Faisal",
    "category": "Bowler",
    "team": "OMA",
    "group": "B",
    "credits": 3.5
  },
  {
    "id": "P144",
    "name": "Nadeem Khan",
    "category": "Bowler",
    "team": "OMA",
    "group": "B",
    "credits": 3
  },
  {
    "id": "P145",
    "name": "Sufyan Mehmood",
    "category": "Bowler",
    "team": "OMA",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P146",
    "name": "Jay Odedra",
    "category": "All-Rounder",
    "team": "OMA",
    "group": "B",
    "credits": 3
  },
  {
    "id": "P147",
    "name": "Shafiq Jan",
    "category": "All-Rounder",
    "team": "OMA",
    "group": "B",
    "credits": 2
  },
  {
    "id": "P148",
    "name": "Ashish Odedara",
    "category": "Batter",
    "team": "OMA",
    "group": "B",
    "credits": 2.5
  },
  {
    "id": "P149",
    "name": "Jiten Ramanandi",
    "category": "All-Rounder",
    "team": "OMA",
    "group": "B",
    "credits": 3.5
  },
  {
    "id": "P150",
    "name": "Aamir Kaleem",
    "category": "All-Rounder",
    "team": "OMA",
    "group": "B",
    "credits": 3
  },
  {
    "id": "P151",
    "name": "Harry Brook",
    "category": "Batter",
    "team": "ENG",
    "group": "C",
    "credits": 9.5
  },
  {
    "id": "P152",
    "name": "Rehan Ahmed",
    "category": "All-Rounder",
    "team": "ENG",
    "group": "C",
    "credits": 6
  },
  {
    "id": "P153",
    "name": "Jofra Archer",
    "category": "Bowler",
    "team": "ENG",
    "group": "C",
    "credits": 6.5
  },
  {
    "id": "P154",
    "name": "Tom Banton",
    "category": "Wicket-Keeper",
    "team": "ENG",
    "group": "C",
    "credits": 7.5
  },
  {
    "id": "P155",
    "name": "Jacob Bethell",
    "category": "All-Rounder",
    "team": "ENG",
    "group": "C",
    "credits": 8
  },
  {
    "id": "P156",
    "name": "Jos Buttler",
    "category": "Wicket-Keeper",
    "team": "ENG",
    "group": "C",
    "credits": 11
  },
  {
    "id": "P157",
    "name": "Sam Curran",
    "category": "All-Rounder",
    "team": "ENG",
    "group": "C",
    "credits": 9
  },
  {
    "id": "P158",
    "name": "Liam Dawson",
    "category": "All-Rounder",
    "team": "ENG",
    "group": "C",
    "credits": 7
  },
  {
    "id": "P159",
    "name": "Ben Duckett",
    "category": "Batter",
    "team": "ENG",
    "group": "C",
    "credits": 8
  },
  {
    "id": "P160",
    "name": "Will Jacks",
    "category": "All-Rounder",
    "team": "ENG",
    "group": "C",
    "credits": 7.5
  },
  {
    "id": "P161",
    "name": "Jamie Overton",
    "category": "All-Rounder",
    "team": "ENG",
    "group": "C",
    "credits": 7
  },
  {
    "id": "P162",
    "name": "Adil Rashid",
    "category": "Bowler",
    "team": "ENG",
    "group": "C",
    "credits": 6.5
  },
  {
    "id": "P163",
    "name": "Phil Salt",
    "category": "Wicket-Keeper",
    "team": "ENG",
    "group": "C",
    "credits": 10.5
  },
  {
    "id": "P164",
    "name": "Josh Tongue",
    "category": "Bowler",
    "team": "ENG",
    "group": "C",
    "credits": 7
  },
  {
    "id": "P165",
    "name": "Luke Wood",
    "category": "Bowler",
    "team": "ENG",
    "group": "C",
    "credits": 5.5
  },
  {
    "id": "P166",
    "name": "Shai Hope",
    "category": "Wicket-Keeper",
    "team": "WI",
    "group": "C",
    "credits": 8.5
  },
  {
    "id": "P167",
    "name": "Shimron Hetmyer",
    "category": "Batter",
    "team": "WI",
    "group": "C",
    "credits": 6.5
  },
  {
    "id": "P168",
    "name": "Johnson Charles",
    "category": "Wicket-Keeper",
    "team": "WI",
    "group": "C",
    "credits": 6
  },
  {
    "id": "P169",
    "name": "Roston Chase",
    "category": "All-Rounder",
    "team": "WI",
    "group": "C",
    "credits": 4.5
  },
  {
    "id": "P170",
    "name": "Matthew Forde",
    "category": "Bowler",
    "team": "WI",
    "group": "C",
    "credits": 5
  },
  {
    "id": "P171",
    "name": "Jason Holder",
    "category": "All-Rounder",
    "team": "WI",
    "group": "C",
    "credits": 9
  },
  {
    "id": "P172",
    "name": "Akeal Hosein",
    "category": "Bowler",
    "team": "WI",
    "group": "C",
    "credits": 8.5
  },
  {
    "id": "P173",
    "name": "Shamar Joseph",
    "category": "Bowler",
    "team": "WI",
    "group": "C",
    "credits": 8
  },
  {
    "id": "P174",
    "name": "Brandon King",
    "category": "Batter",
    "team": "WI",
    "group": "C",
    "credits": 7
  },
  {
    "id": "P175",
    "name": "Gudakesh Motie",
    "category": "All-Rounder",
    "team": "WI",
    "group": "C",
    "credits": 6.5
  },
  {
    "id": "P176",
    "name": "Rovman Powell",
    "category": "Batter",
    "team": "WI",
    "group": "C",
    "credits": 5
  },
  {
    "id": "P177",
    "name": "Sherfane Rutherford",
    "category": "All-Rounder",
    "team": "WI",
    "group": "C",
    "credits": 9.5
  },
  {
    "id": "P178",
    "name": "Quentin Sampson",
    "category": "All-Rounder",
    "team": "WI",
    "group": "C",
    "credits": 6.5
  },
  {
    "id": "P179",
    "name": "Jayden Seales",
    "category": "Bowler",
    "team": "WI",
    "group": "C",
    "credits": 7.5
  },
  {
    "id": "P180",
    "name": "Romario Shepherd",
    "category": "All-Rounder",
    "team": "WI",
    "group": "C",
    "credits": 11
  },
  {
    "id": "P181",
    "name": "Wayne Madsen",
    "category": "Batter",
    "team": "ITA",
    "group": "C",
    "credits": 5
  },
  {
    "id": "P182",
    "name": "Marcus Campopiano",
    "category": "Wicket-Keeper",
    "team": "ITA",
    "group": "C",
    "credits": 4.5
  },
  {
    "id": "P183",
    "name": "Gian Meade",
    "category": "Wicket-Keeper",
    "team": "ITA",
    "group": "C",
    "credits": 4
  },
  {
    "id": "P184",
    "name": "Zain Ali",
    "category": "All-Rounder",
    "team": "ITA",
    "group": "C",
    "credits": 3.5
  },
  {
    "id": "P185",
    "name": "Ali Hasan",
    "category": "Bowler",
    "team": "ITA",
    "group": "C",
    "credits": 3
  },
  {
    "id": "P186",
    "name": "Crishan Kalugamage",
    "category": "Bowler",
    "team": "ITA",
    "group": "C",
    "credits": 2.5
  },
  {
    "id": "P187",
    "name": "Harry Manenti",
    "category": "All-Rounder",
    "team": "ITA",
    "group": "C",
    "credits": 2
  },
  {
    "id": "P188",
    "name": "Anthony Mosca",
    "category": "Batter",
    "team": "ITA",
    "group": "C",
    "credits": 1.5
  },
  {
    "id": "P189",
    "name": "Justin Mosca",
    "category": "Batter",
    "team": "ITA",
    "group": "C",
    "credits": 1
  },
  {
    "id": "P190",
    "name": "Syed Naqvi",
    "category": "All-Rounder",
    "team": "ITA",
    "group": "C",
    "credits": 1
  },
  {
    "id": "P191",
    "name": "Benjamin Manenti",
    "category": "Bowler",
    "team": "ITA",
    "group": "C",
    "credits": 1.5
  },
  {
    "id": "P192",
    "name": "Jaspreet Singh",
    "category": "All-Rounder",
    "team": "ITA",
    "group": "C",
    "credits": 2
  },
  {
    "id": "P193",
    "name": "JJ Smuts",
    "category": "All-Rounder",
    "team": "ITA",
    "group": "C",
    "credits": 2.5
  },
  {
    "id": "P194",
    "name": "Grant Stewart",
    "category": "Bowler",
    "team": "ITA",
    "group": "C",
    "credits": 3
  },
  {
    "id": "P195",
    "name": "Thomas Draca",
    "category": "Bowler",
    "team": "ITA",
    "group": "C",
    "credits": 4
  },
  {
    "id": "P196",
    "name": "Rohit Paudel",
    "category": "All-Rounder",
    "team": "NEP",
    "group": "C",
    "credits": 4.5
  },
  {
    "id": "P197",
    "name": "Dipendra Singh Airee",
    "category": "All-Rounder",
    "team": "NEP",
    "group": "C",
    "credits": 5
  },
  {
    "id": "P198",
    "name": "Sandeep Lamichhane",
    "category": "Bowler",
    "team": "NEP",
    "group": "C",
    "credits": 4.5
  },
  {
    "id": "P199",
    "name": "Kushal Bhurtel",
    "category": "Batter",
    "team": "NEP",
    "group": "C",
    "credits": 4
  },
  {
    "id": "P200",
    "name": "Aasif Sheikh",
    "category": "Wicket-Keeper",
    "team": "NEP",
    "group": "C",
    "credits": 3.5
  },
  {
    "id": "P201",
    "name": "Sundeep Jora",
    "category": "Batter",
    "team": "NEP",
    "group": "C",
    "credits": 3
  },
  {
    "id": "P202",
    "name": "Aarif Sheikh",
    "category": "All-Rounder",
    "team": "NEP",
    "group": "C",
    "credits": 2.5
  },
  {
    "id": "P203",
    "name": "Basir Ahamad",
    "category": "Bowler",
    "team": "NEP",
    "group": "C",
    "credits": 2
  },
  {
    "id": "P204",
    "name": "Sompal Kami",
    "category": "All-Rounder",
    "team": "NEP",
    "group": "C",
    "credits": 1.5
  },
  {
    "id": "P205",
    "name": "Karan KC",
    "category": "All-Rounder",
    "team": "NEP",
    "group": "C",
    "credits": 1
  },
  {
    "id": "P206",
    "name": "Nandan Yadav",
    "category": "All-Rounder",
    "team": "NEP",
    "group": "C",
    "credits": 1
  },
  {
    "id": "P207",
    "name": "Gulshan Jha",
    "category": "Bowler",
    "team": "NEP",
    "group": "C",
    "credits": 1.5
  },
  {
    "id": "P208",
    "name": "Lalit Rajbanshi",
    "category": "Bowler",
    "team": "NEP",
    "group": "C",
    "credits": 2
  },
  {
    "id": "P209",
    "name": "Sher Malla",
    "category": "Bowler",
    "team": "NEP",
    "group": "C",
    "credits": 2.5
  },
  {
    "id": "P210",
    "name": "Lokesh Bam",
    "category": "Wicket-Keeper",
    "team": "NEP",
    "group": "C",
    "credits": 3
  },
  {
    "id": "P211",
    "name": "Richie Berrington",
    "category": "All-Rounder",
    "team": "SCO",
    "group": "C",
    "credits": 3.5
  },
  {
    "id": "P212",
    "name": "Tom Bruce",
    "category": "All-Rounder",
    "team": "SCO",
    "group": "C",
    "credits": 4
  },
  {
    "id": "P213",
    "name": "Matthew Cross",
    "category": "Wicket-Keeper",
    "team": "SCO",
    "group": "C",
    "credits": 4.5
  },
  {
    "id": "P214",
    "name": "Bradley Currie",
    "category": "Bowler",
    "team": "SCO",
    "group": "C",
    "credits": 5
  },
  {
    "id": "P215",
    "name": "Oliver Davidson",
    "category": "Bowler",
    "team": "SCO",
    "group": "C",
    "credits": 3.5
  },
  {
    "id": "P216",
    "name": "Chris Greaves",
    "category": "Bowler",
    "team": "SCO",
    "group": "C",
    "credits": 4
  },
  {
    "id": "P217",
    "name": "Zainullah Ihsan",
    "category": "Bowler",
    "team": "SCO",
    "group": "C",
    "credits": 2.5
  },
  {
    "id": "P218",
    "name": "Michael Jones",
    "category": "Batter",
    "team": "SCO",
    "group": "C",
    "credits": 1.5
  },
  {
    "id": "P219",
    "name": "Michael Leask",
    "category": "All-Rounder",
    "team": "SCO",
    "group": "C",
    "credits": 3.5
  },
  {
    "id": "P220",
    "name": "Finlay McCreath",
    "category": "All-Rounder",
    "team": "SCO",
    "group": "C",
    "credits": 4
  },
  {
    "id": "P221",
    "name": "Brandon McMullen",
    "category": "All-Rounder",
    "team": "SCO",
    "group": "C",
    "credits": 2.5
  },
  {
    "id": "P222",
    "name": "George Munsey",
    "category": "Batter",
    "team": "SCO",
    "group": "C",
    "credits": 2
  },
  {
    "id": "P223",
    "name": "Safyaan Sharif",
    "category": "Bowler",
    "team": "SCO",
    "group": "C",
    "credits": 2.5
  },
  {
    "id": "P224",
    "name": "Mark Watt",
    "category": "Bowler",
    "team": "SCO",
    "group": "C",
    "credits": 3.5
  },
  {
    "id": "P225",
    "name": "Bradley Wheal",
    "category": "Bowler",
    "team": "SCO",
    "group": "C",
    "credits": 1.5
  },
  {
    "id": "P226",
    "name": "Aiden Markram",
    "category": "Batter",
    "team": "SA",
    "group": "D",
    "credits": 10.5
  },
  {
    "id": "P227",
    "name": "Corbin Bosch",
    "category": "All-Rounder",
    "team": "SA",
    "group": "D",
    "credits": 8
  },
  {
    "id": "P228",
    "name": "Dewald Brevis",
    "category": "Batter",
    "team": "SA",
    "group": "D",
    "credits": 11
  },
  {
    "id": "P229",
    "name": "Quinton de Kock",
    "category": "Wicket-Keeper",
    "team": "SA",
    "group": "D",
    "credits": 10
  },
  {
    "id": "P230",
    "name": "Marco Jansen",
    "category": "All-Rounder",
    "team": "SA",
    "group": "D",
    "credits": 9
  },
  {
    "id": "P231",
    "name": "George Linde",
    "category": "All-Rounder",
    "team": "SA",
    "group": "D",
    "credits": 8
  },
  {
    "id": "P232",
    "name": "Keshav Maharaj",
    "category": "Bowler",
    "team": "SA",
    "group": "D",
    "credits": 8.5
  },
  {
    "id": "P233",
    "name": "Kwena Maphaka",
    "category": "Bowler",
    "team": "SA",
    "group": "D",
    "credits": 6.5
  },
  {
    "id": "P234",
    "name": "David Miller",
    "category": "Batter",
    "team": "SA",
    "group": "D",
    "credits": 7
  },
  {
    "id": "P235",
    "name": "Lungi Ngidi",
    "category": "Bowler",
    "team": "SA",
    "group": "D",
    "credits": 7.5
  },
  {
    "id": "P236",
    "name": "Anrich Nortje",
    "category": "Bowler",
    "team": "SA",
    "group": "D",
    "credits": 8
  },
  {
    "id": "P237",
    "name": "Kagiso Rabada",
    "category": "Bowler",
    "team": "SA",
    "group": "D",
    "credits": 8.5
  },
  {
    "id": "P238",
    "name": "Ryan Rickelton",
    "category": "Wicket-Keeper",
    "team": "SA",
    "group": "D",
    "credits": 8
  },
  {
    "id": "P239",
    "name": "Jason Smith",
    "category": "Batter",
    "team": "SA",
    "group": "D",
    "credits": 6.5
  },
  {
    "id": "P240",
    "name": "Tristan Stubbs",
    "category": "Wicket-Keeper",
    "team": "SA",
    "group": "D",
    "credits": 9.5
  },
  {
    "id": "P241",
    "name": "Mitchell Santner",
    "category": "All-Rounder",
    "team": "NZ",
    "group": "D",
    "credits": 9
  },
  {
    "id": "P242",
    "name": "Finn Allen",
    "category": "Batter",
    "team": "NZ",
    "group": "D",
    "credits": 10
  },
  {
    "id": "P243",
    "name": "Michael Bracewell",
    "category": "All-Rounder",
    "team": "NZ",
    "group": "D",
    "credits": 7.5
  },
  {
    "id": "P244",
    "name": "Mark Chapman",
    "category": "Batter",
    "team": "NZ",
    "group": "D",
    "credits": 8
  },
  {
    "id": "P245",
    "name": "Devon Conway",
    "category": "Wicket-Keeper",
    "team": "NZ",
    "group": "D",
    "credits": 8.5
  },
  {
    "id": "P246",
    "name": "Jacob Duffy",
    "category": "Bowler",
    "team": "NZ",
    "group": "D",
    "credits": 10
  },
  {
    "id": "P247",
    "name": "Lockie Ferguson",
    "category": "Bowler",
    "team": "NZ",
    "group": "D",
    "credits": 9.5
  },
  {
    "id": "P248",
    "name": "Matt Henry",
    "category": "Bowler",
    "team": "NZ",
    "group": "D",
    "credits": 9
  },
  {
    "id": "P249",
    "name": "Kyle Jamieson",
    "category": "Bowler",
    "team": "NZ",
    "group": "D",
    "credits": 8.5
  },
  {
    "id": "P250",
    "name": "Daryl Mitchell",
    "category": "All-Rounder",
    "team": "NZ",
    "group": "D",
    "credits": 9
  },
  {
    "id": "P251",
    "name": "James Neesham",
    "category": "All-Rounder",
    "team": "NZ",
    "group": "D",
    "credits": 8.5
  },
  {
    "id": "P252",
    "name": "Glenn Phillips",
    "category": "All-Rounder",
    "team": "NZ",
    "group": "D",
    "credits": 10.5
  },
  {
    "id": "P253",
    "name": "Rachin Ravindra",
    "category": "All-Rounder",
    "team": "NZ",
    "group": "D",
    "credits": 1
  },
  {
    "id": "P254",
    "name": "Tim Seifert",
    "category": "Wicket-Keeper",
    "team": "NZ",
    "group": "D",
    "credits": 9.5
  },
  {
    "id": "P255",
    "name": "Ish Sodhi",
    "category": "Bowler",
    "team": "NZ",
    "group": "D",
    "credits": 7
  },
  {
    "id": "P256",
    "name": "Rashid Khan",
    "category": "All-Rounder",
    "team": "AFG",
    "group": "D",
    "credits": 9.5
  },
  {
    "id": "P257",
    "name": "Noor Ahmad",
    "category": "Bowler",
    "team": "AFG",
    "group": "D",
    "credits": 9
  },
  {
    "id": "P258",
    "name": "Abdullah Ahmadzai",
    "category": "Bowler",
    "team": "AFG",
    "group": "D",
    "credits": 6.5
  },
  {
    "id": "P259",
    "name": "Sediqullah Atal",
    "category": "Batter",
    "team": "AFG",
    "group": "D",
    "credits": 4.5
  },
  {
    "id": "P260",
    "name": "Fazal Haq Farooqi",
    "category": "Bowler",
    "team": "AFG",
    "group": "D",
    "credits": 7.5
  },
  {
    "id": "P261",
    "name": "Rahmanullah Gurbaz",
    "category": "Wicket-Keeper",
    "team": "AFG",
    "group": "D",
    "credits": 8
  },
  {
    "id": "P262",
    "name": "Naveen Ul Haq",
    "category": "Bowler",
    "team": "AFG",
    "group": "D",
    "credits": 6.5
  },
  {
    "id": "P263",
    "name": "Mohammad Ishaq",
    "category": "Wicket-Keeper",
    "team": "AFG",
    "group": "D",
    "credits": 5
  },
  {
    "id": "P264",
    "name": "Shahidullah Kamal",
    "category": "All-Rounder",
    "team": "AFG",
    "group": "D",
    "credits": 5.5
  },
  {
    "id": "P265",
    "name": "Mohammad Nabi",
    "category": "All-Rounder",
    "team": "AFG",
    "group": "D",
    "credits": 8.5
  },
  {
    "id": "P266",
    "name": "Gulbadin Naib",
    "category": "All-Rounder",
    "team": "AFG",
    "group": "D",
    "credits": 8
  },
  {
    "id": "P267",
    "name": "Azmatullah Omarzai",
    "category": "All-Rounder",
    "team": "AFG",
    "group": "D",
    "credits": 9
  },
  {
    "id": "P268",
    "name": "Mujeeb Ur Rahman",
    "category": "Bowler",
    "team": "AFG",
    "group": "D",
    "credits": 8
  },
  {
    "id": "P269",
    "name": "Darwish Rasooli",
    "category": "Batter",
    "team": "AFG",
    "group": "D",
    "credits": 7
  },
  {
    "id": "P270",
    "name": "Ibrahim Zadran",
    "category": "Batter",
    "team": "AFG",
    "group": "D",
    "credits": 8.5
  },
  {
    "id": "P271",
    "name": "Dilpreet Bajwa",
    "category": "All-Rounder",
    "team": "CAN",
    "group": "D",
    "credits": 6
  },
  {
    "id": "P272",
    "name": "Ajayveer Hundal",
    "category": "All-Rounder",
    "team": "CAN",
    "group": "D",
    "credits": 5
  },
  {
    "id": "P273",
    "name": "Ansh Patel",
    "category": "All-Rounder",
    "team": "CAN",
    "group": "D",
    "credits": 5.5
  },
  {
    "id": "P274",
    "name": "Dilon Heyliger",
    "category": "Bowler",
    "team": "CAN",
    "group": "D",
    "credits": 4.5
  },
  {
    "id": "P275",
    "name": "Harsh Thaker",
    "category": "All-Rounder",
    "team": "CAN",
    "group": "D",
    "credits": 4.5
  },
  {
    "id": "P276",
    "name": "Jaskaran Singh",
    "category": "Bowler",
    "team": "CAN",
    "group": "D",
    "credits": 3.5
  },
  {
    "id": "P277",
    "name": "Kaleem Sana",
    "category": "Bowler",
    "team": "CAN",
    "group": "D",
    "credits": 5
  },
  {
    "id": "P278",
    "name": "Kanwarpal Tathgur",
    "category": "Batter",
    "team": "CAN",
    "group": "D",
    "credits": 2.5
  },
  {
    "id": "P279",
    "name": "Navneet Dhaliwal",
    "category": "All-Rounder",
    "team": "CAN",
    "group": "D",
    "credits": 3.5
  },
  {
    "id": "P280",
    "name": "Nicholas Kirton",
    "category": "All-Rounder",
    "team": "CAN",
    "group": "D",
    "credits": 4
  },
  {
    "id": "P281",
    "name": "Ravinderpal Singh",
    "category": "Batter",
    "team": "CAN",
    "group": "D",
    "credits": 5
  },
  {
    "id": "P282",
    "name": "Saad Bin Zafar",
    "category": "All-Rounder",
    "team": "CAN",
    "group": "D",
    "credits": 2
  },
  {
    "id": "P283",
    "name": "Shivam Sharma",
    "category": "Bowler",
    "team": "CAN",
    "group": "D",
    "credits": 2.5
  },
  {
    "id": "P284",
    "name": "Shreyas Movva",
    "category": "Wicket-Keeper",
    "team": "CAN",
    "group": "D",
    "credits": 1.5
  },
  {
    "id": "P285",
    "name": "Yuvraj Samra",
    "category": "Batter",
    "team": "CAN",
    "group": "D",
    "credits": 1
  },
  {
    "id": "P286",
    "name": "Muhammad Waseem",
    "category": "Batter",
    "team": "UAE",
    "group": "D",
    "credits": 6
  },
  {
    "id": "P287",
    "name": "Alishan Sharafu",
    "category": "All-Rounder",
    "team": "UAE",
    "group": "D",
    "credits": 3
  },
  {
    "id": "P288",
    "name": "Aryansh Sharma",
    "category": "Wicket-Keeper",
    "team": "UAE",
    "group": "D",
    "credits": 3.5
  },
  {
    "id": "P289",
    "name": "Dhruv Parashar",
    "category": "All-Rounder",
    "team": "UAE",
    "group": "D",
    "credits": 1.5
  },
  {
    "id": "P290",
    "name": "Haider Ali",
    "category": "Bowler",
    "team": "UAE",
    "group": "D",
    "credits": 2
  },
  {
    "id": "P291",
    "name": "Harshit Kaushik",
    "category": "All-Rounder",
    "team": "UAE",
    "group": "D",
    "credits": 3.5
  },
  {
    "id": "P292",
    "name": "Junaid Siddique",
    "category": "Bowler",
    "team": "UAE",
    "group": "D",
    "credits": 2
  },
  {
    "id": "P293",
    "name": "Mayank Kumar",
    "category": "Batter",
    "team": "UAE",
    "group": "D",
    "credits": 3.5
  },
  {
    "id": "P294",
    "name": "Muhammad Arfan",
    "category": "Bowler",
    "team": "UAE",
    "group": "D",
    "credits": 2.5
  },
  {
    "id": "P295",
    "name": "Muhammad Farooq",
    "category": "Bowler",
    "team": "UAE",
    "group": "D",
    "credits": 4
  },
  {
    "id": "P296",
    "name": "Muhammad Jawadullah",
    "category": "Bowler",
    "team": "UAE",
    "group": "D",
    "credits": 2.5
  },
  {
    "id": "P297",
    "name": "Muhammad Zohaib",
    "category": "Batter",
    "team": "UAE",
    "group": "D",
    "credits": 3.5
  },
  {
    "id": "P298",
    "name": "Rohid Khan",
    "category": "Bowler",
    "team": "UAE",
    "group": "D",
    "credits": 5
  },
  {
    "id": "P299",
    "name": "Sohaib Khan",
    "category": "Batter",
    "team": "UAE",
    "group": "D",
    "credits": 2.5
  },
  {
    "id": "P300",
    "name": "Simranjeet Singh",
    "category": "Bowler",
    "team": "UAE",
    "group": "D",
    "credits": 5
  }
];
