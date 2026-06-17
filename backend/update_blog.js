const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./src/models/Blog'); // Assuming model is exported here

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('MongoDB connected');

    const slug = "creating-quality-ai-enhanced-blogs-in-renewable-energy";
    
    const blog = await Blog.findOne({ slug });
    if (!blog) {
        console.log("Blog not found!");
        process.exit();
    }

    const newSections = [
        {
            title: "The Power of Wind Energy",
            description: "Wind energy is one of the fastest-growing renewable energy technologies. Usage is on the rise worldwide, in part because costs are falling.\n\nGlobal installed wind-generation capacity onshore and offshore has increased by a factor of almost 75 in the past two decades, jumping from 7.5 gigawatts (GW) in 1997 to some 564 GW by 2018.",
            images: [
                "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            title: "Solar Innovations and Future",
            description: "Solar technologies convert sunlight into electrical energy either through photovoltaic (PV) panels or through mirrors that concentrate solar radiation.\n\nThis energy can be used to generate electricity or be stored in batteries or thermal storage. The amount of solar radiation that reaches the earth's surface every hour is more than enough to satisfy global energy needs for a whole year.",
            images: [
                "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            title: "Biomass and Green Fuels",
            description: "Biomass is plant or animal material used as fuel to produce electricity or heat. Examples are wood, energy crops and waste from forests, yards, or farms.\n\nSince biomass technically can be used as a fuel directly, some people use the terms biomass and biofuel interchangeably. More often than not, the word biomass simply denotes the biological raw material the fuel is made of.",
            images: [
                "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            title: "Hydropower's Global Impact",
            description: "Hydropower, or hydroelectric power, is a renewable source of energy that generates power by using a dam or diversion structure to alter the natural flow of a river or other body of water.\n\nIt is one of the oldest power sources on the planet, generating power when water flows through a pipe, or penstock, then pushes against and turns blades in a turbine to spin a generator to produce electricity.",
            images: [
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80"
            ]
        }
    ];

    // If blog already has sections, keep the first one and add the new ones, 
    // or just append them if user wanted 4 sections. I'll append.
    blog.sections = [...(blog.sections || []), ...newSections];

    await blog.save();
    console.log("Successfully added 4 new sections with Unsplash images!");
    process.exit();

}).catch(err => {
    console.error(err);
    process.exit(1);
});
