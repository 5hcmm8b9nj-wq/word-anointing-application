/* The Word, the Anointing & the Application — teaching record data.
   One file = one service. All Scripture is King James Version (KJV).
   ORIGINAL slots are left empty until exact wording is taken from the recording/transcript. */
window.TEACHING = {
  isSample: true,
  ministry: "Dominion Hour",
  minister: "Prophet Prince Amo David",
  title: "The Power of the Name of Jesus",
  date: "Sample teaching record",
  mainScripture: {
    ref: "Philippians 2:9–11",
    verses: [
      ["9", "Wherefore God also hath highly exalted him, and given him a name which is above every name:"],
      ["10", "That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth;"],
      ["11", "And that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father."]
    ]
  },

  /* SERVICE JOURNEY — follow the actual order of the service. Omit any part not used. */
  journey: [
    {
      id: "praise", title: "Thanksgiving and Praise", role: "scripture",
      scripture: { ref: "Psalm 100:4", verses: [["4", "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name."]] },
      original: [],
      note: "We begin by giving God thanks and praise."
    },
    {
      id: "repent", title: "Confession and Repentance", role: "scripture",
      scripture: { ref: "1 John 1:9", verses: [["9", "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."]] },
      original: [],
      note: "We bring our sins honestly before the Lord."
    },
    {
      id: "forgive", title: "Forgiveness of Others", role: "application",
      scripture: { ref: "Mark 11:25", verses: [["25", "And when ye stand praying, forgive, if ye have ought against any: that your Father also which is in heaven may forgive you your trespasses."]] },
      original: [],
      note: "Before we pray, we release those who have hurt us."
    },
    {
      id: "spirit", title: "Welcoming the Holy Spirit", role: "scripture",
      scripture: { ref: "Luke 11:13", verses: [["13", "If ye then, being evil, know how to give good gifts unto your children: how much more shall your heavenly Father give the Holy Spirit to them that ask him?"]] },
      original: [],
      note: "We ask the Father for the Holy Spirit."
    }
  ],

  /* THE MAIN WORD — about five points. Summaries below are illustrative sample topics,
     NOT quotations from the minister. */
  points: [
    {
      title: "Jesus has been highly exalted",
      scripture: { ref: "Philippians 2:9–11", verses: [
        ["9", "Wherefore God also hath highly exalted him, and given him a name which is above every name:"],
        ["10", "That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth;"],
        ["11", "And that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father."]] },
      summary: "God the Father has given Jesus the name that is above every name.",
      remember: "No name is higher than the name of Jesus."
    },
    {
      title: "There is salvation in no other name",
      scripture: { ref: "Acts 4:12", verses: [["12", "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved."]] },
      summary: "Peter declares before the council that salvation is found only in Jesus Christ.",
      remember: "Jesus is the only name by which we must be saved."
    },
    {
      title: "Authority in His name",
      scripture: { ref: "Mark 16:17", verses: [["17", "And these signs shall follow them that believe; In my name shall they cast out devils; they shall speak with new tongues;"]] },
      summary: "Jesus told His disciples that signs would follow believers who act in His name.",
      remember: "The believer's authority is in the name of Jesus, not in himself."
    },
    {
      title: "Praying in His name",
      scripture: { ref: "John 14:13–14", verses: [
        ["13", "And whatsoever ye shall ask in my name, that will I do, that the Father may be glorified in the Son."],
        ["14", "If ye shall ask any thing in my name, I will do it."]] },
      summary: "Jesus invites His disciples to ask in His name so that the Father is glorified.",
      remember: "We pray in Jesus' name so that the Father is glorified."
    },
    {
      title: "Abiding in Christ",
      scripture: { ref: "John 15:4–5", verses: [
        ["4", "Abide in me, and I in you. As the branch cannot bear fruit of itself, except it abide in the vine; no more can ye, except ye abide in me."],
        ["5", "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing."]] },
      summary: "Jesus teaches that fruit comes from remaining joined to Him, like a branch on the vine.",
      remember: "Without Him we can do nothing; in Him we bear much fruit."
    }
  ],

  /* DECLARATIONS
     original: exact words spoken by the minister (empty until verified from recording)
     scripture: separately labeled declarations drawn directly from a Bible verse */
  originalDeclarations: [],
  scriptureDeclarations: [
    { text: "Jesus Christ is Lord, to the glory of God the Father.", ref: "Philippians 2:11", personal: "Jesus Christ is Lord over {NAME}, to the glory of God the Father." },
    { text: "At the name of Jesus every knee shall bow.", ref: "Philippians 2:10", personal: "At the name of Jesus every knee shall bow concerning {NAME}." },
    { text: "There is none other name under heaven whereby we must be saved. I am saved by the name of Jesus.", ref: "Acts 4:12", personal: "There is none other name under heaven whereby we must be saved. {NAME} shall be saved by the name of Jesus." },
    { text: "I abide in Jesus, and Jesus abides in me. I shall bring forth much fruit.", ref: "John 15:5", personal: "{NAME} shall abide in Jesus, and Jesus in {OBJ}. {NAME} shall bring forth much fruit." },
    { text: "The anointing which I have received of Him abideth in me.", ref: "1 John 2:27", personal: "The anointing which {NAME} received of Him shall abide in {OBJ}." },
    { text: "Whatsoever I do in word or deed, I will do all in the name of the Lord Jesus.", ref: "Colossians 3:17", personal: "Whatsoever {NAME} shall do in word or deed, {NAME} shall do all in the name of the Lord Jesus." }
  ],

  /* KEEPING THE ANOINTING — supplementary Bible study (not the minister's words) */
  keep: [
    {
      title: "Trust that God's work continues beyond the service",
      scripture: { ref: "1 John 2:27", verses: [["27", "But the anointing which ye have received of him abideth in you, and ye need not that any man teach you: but as the same anointing teacheth you of all things, and is truth, and is no lie, and even as it hath taught you, ye shall abide in him."]] },
      meaning: "Abideth means remains. In context, John is warning believers not to be drawn away from Christ by false teaching. The anointing does not disappear when the service ends.",
      steps: ["Thank Jesus for what you received.", "Write down the Scriptures that stood out.", "Read the message again with your Bible open."]
    },
    {
      title: "Guard your heart in your relationships",
      scripture: { ref: "Ephesians 4:30–32", verses: [
        ["30", "And grieve not the holy Spirit of God, whereby ye are sealed unto the day of redemption."],
        ["31", "Let all bitterness, and wrath, and anger, and clamour, and evil speaking, be put away from you, with all malice:"],
        ["32", "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you."]] },
      meaning: "Paul connects not grieving the Holy Spirit with ordinary things: anger, bitterness, hurtful speech, kindness and forgiveness.",
      steps: ["Refuse gossip and hurtful speech.", "Pause before answering when irritated.", "Forgive instead of replaying the offense."]
    },
    {
      title: "Keep praying, giving thanks and testing all things",
      scripture: { ref: "1 Thessalonians 5:16–22", verses: [
        ["16", "Rejoice evermore."], ["17", "Pray without ceasing."],
        ["18", "In every thing give thanks: for this is the will of God in Christ Jesus concerning you."],
        ["19", "Quench not the Spirit."], ["20", "Despise not prophesyings."],
        ["21", "Prove all things; hold fast that which is good."],
        ["22", "Abstain from all appearance of evil."]] },
      meaning: "Prove means test or examine. Hold fast means keep. We welcome the Spirit's work and weigh everything by Scripture.",
      steps: ["Talk to God throughout the day.", "Thank Him for the truth you heard.", "Bring questions to Scripture and to your pastors."]
    },
    {
      title: "Let the Word and the name of Jesus shape daily life",
      scripture: { ref: "Colossians 3:16–17", verses: [
        ["16", "Let the word of Christ dwell in you richly in all wisdom; teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord."],
        ["17", "And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him."]] },
      meaning: "Doing all in the name of the Lord Jesus means letting our words and actions honor Him at home, at work and everywhere.",
      steps: ["Meditate on the Scriptures from the message.", "Keep worshipping during the week.", "Ask: does this honor the Lord Jesus?"]
    },
    {
      title: "Look for lasting fruit",
      scripture: { ref: "Galatians 5:22–25", verses: [
        ["22", "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith,"],
        ["23", "Meekness, temperance: against such there is no law."],
        ["24", "And they that are Christ's have crucified the flesh with the affections and lusts."],
        ["25", "If we live in the Spirit, let us also walk in the Spirit."]] },
      meaning: "Longsuffering means patience. Temperance means self-control. The lasting sign of the Spirit's work is a changed life.",
      steps: ["Choose one fruit to practice this week.", "Answer gently where you would be harsh.", "Help someone in Jesus' name."]
    }
  ],

  closingPrayer: [
    "Heavenly Father, thank You for the ministry I received and for every truth that drew me closer to Jesus. Help me treasure Your Word and put it into practice.",
    "Holy Spirit, teach me to remain in Christ. Guard my heart from bitterness, pride, careless speech, and anything that grieves You.",
    "Let the name of Jesus be honored in my thoughts, my words, my relationships, and my actions. Produce Your fruit in me.",
    "In the name of Jesus Christ, amen."
  ],

  quiz: [
    { q: "According to Philippians 2:9, what has God given Jesus?", a: ["A name which is above every name", "A crown of gold", "A new kingdom on earth"], c: 0, ref: "Philippians 2:9" },
    { q: "Acts 4:12 says there is salvation in…", a: ["Many names", "No other name but Jesus", "Good works alone"], c: 1, ref: "Acts 4:12" },
    { q: "In John 15:5, who is the vine?", a: ["The church", "The believer", "Jesus"], c: 2, ref: "John 15:5" },
    { q: "1 John 2:27 says the anointing you received…", a: ["Fades after the service", "Abideth in you", "Must be bought"], c: 1, ref: "1 John 2:27" },
    { q: "Ephesians 4:32 tells us to be…", a: ["Kind, tenderhearted, forgiving", "Silent and alone", "Angry but holy"], c: 0, ref: "Ephesians 4:32" },
    { q: "What does 'Prove all things' (1 Thessalonians 5:21) mean?", a: ["Argue with everyone", "Test and examine them", "Believe everything"], c: 1, ref: "1 Thessalonians 5:21" },
    { q: "Why do we ask in Jesus' name (John 14:13)?", a: ["So we sound spiritual", "That the Father may be glorified in the Son", "To end the prayer"], c: 1, ref: "John 14:13" }
  ]
};
