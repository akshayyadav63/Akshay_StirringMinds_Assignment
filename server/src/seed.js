const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Deal = require('./models/Deal');

dotenv.config();

const deals = [
    {
        partnerName: 'AWS',
        title: 'AWS Activate Portfolio',
        description: 'Get up to $100,000 in AWS Cloud credits and business support for your startup.',
        category: 'Cloud',
        benefit: '$100k Credits',
        accessLevel: 'restricted',
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg',
    },
    {
        partnerName: 'DigitalOcean',
        title: 'Hatch Startup Program',
        description: '12 months of credit to build and scale your startup on DigitalOcean.',
        category: 'Cloud',
        benefit: '$5k Credits',
        accessLevel: 'public',
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/digitalocean-2.svg',
    },
    {
        partnerName: 'HubSpot',
        title: 'HubSpot for Startups',
        description: 'Get up to 90% off HubSpot marketing, sales, and service software.',
        category: 'Marketing',
        benefit: '90% OFF',
        accessLevel: 'public',
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg',
    },
    {
        partnerName: 'Stripe',
        title: 'Stripe Atlas and Credits',
        description: 'Priority support and fee-free processing for your first $20,000 in payments.',
        category: 'Productivity',
        benefit: 'Fee-free Processing',
        accessLevel: 'restricted',
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg',
    },
    {
        partnerName: 'Slack',
        title: 'Slack for Teams',
        description: 'Get 50% off for 12 months on Slack Pro and Business+ plans.',
        category: 'Productivity',
        benefit: '50% OFF',
        accessLevel: 'public',
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
    },
    {
        partnerName: 'Sentry',
        title: 'Error Tracking for Developers',
        description: 'Get 6 months of Sentry Business plan for free to track errors in real-time.',
        category: 'Analytics',
        benefit: '6 Months Free',
        accessLevel: 'public',
        logoUrl: 'https://cdn.worldvectorlogo.com/logos/sentry-3.svg',
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        await Deal.deleteMany();
        console.log('Deals deleted');

        await Deal.insertMany(deals);
        console.log('Deals added');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
