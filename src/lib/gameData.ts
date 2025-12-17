// Learning Module Data

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningModule {
  id: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
  content: {
    title: string;
    text: string;
    emoji: string;
  }[];
  quiz: QuizQuestion[];
}

export const MODULES: LearningModule[] = [
  {
    id: 'climate',
    title: 'Climate Change Basics',
    emoji: '🌍',
    description: 'Learn what climate change is and why it matters',
    color: 'from-blue-400 to-green-400',
    content: [
      {
        title: 'What is Climate?',
        text: 'Climate is the weather pattern of a place over a long time. It includes things like temperature, rain, and wind. Earth\'s climate keeps all living things healthy!',
        emoji: '🌤️'
      },
      {
        title: 'The Greenhouse Effect',
        text: 'Imagine wearing a thick blanket on a warm day - you\'d get too hot! Gases in our air work like a blanket around Earth. Some of these gases trap heat and make our planet warmer.',
        emoji: '🏠'
      },
      {
        title: 'Why It\'s Changing',
        text: 'When we burn fuel for cars, planes, and factories, we add more "blanket gases" to the air. This makes Earth warmer than it should be. That\'s climate change!',
        emoji: '🚗'
      },
      {
        title: 'What Can We Do?',
        text: 'We can help by using less energy, planting trees, and choosing eco-friendly options. Every small action adds up to make a big difference!',
        emoji: '🌱'
      }
    ],
    quiz: [
      {
        id: 'c1',
        question: 'What does climate mean?',
        options: ['Weather today', 'Weather patterns over a long time', 'Only temperature', 'Only rain'],
        correctIndex: 1,
        explanation: 'Climate is the weather pattern of a place over many years, not just one day!'
      },
      {
        id: 'c2',
        question: 'What do greenhouse gases do?',
        options: ['Cool the Earth', 'Trap heat like a blanket', 'Make it rain', 'Stop the wind'],
        correctIndex: 1,
        explanation: 'Greenhouse gases trap heat around Earth, just like a blanket keeps you warm!'
      },
      {
        id: 'c3',
        question: 'What causes more greenhouse gases?',
        options: ['Planting trees', 'Burning fuel', 'Swimming', 'Sleeping'],
        correctIndex: 1,
        explanation: 'Burning fuel in cars and factories releases greenhouse gases into the air.'
      },
      {
        id: 'c4',
        question: 'How can kids help the climate?',
        options: ['Use more electricity', 'Plant trees and save energy', 'Leave lights on', 'Waste water'],
        correctIndex: 1,
        explanation: 'Planting trees and saving energy are great ways kids can help our planet!'
      }
    ]
  },
  {
    id: 'recycling',
    title: 'Recycling & Waste',
    emoji: '♻️',
    description: 'Discover how to reduce, reuse, and recycle',
    color: 'from-green-400 to-emerald-400',
    content: [
      {
        title: 'The Three Rs',
        text: 'Reduce, Reuse, Recycle! These are the three magic words to help our planet. First, try to use less. Then, use things again. Finally, recycle what\'s left!',
        emoji: '3️⃣'
      },
      {
        title: 'What Can Be Recycled?',
        text: 'Paper, cardboard, plastic bottles, glass jars, and metal cans can all be recycled! Look for the recycling symbol ♻️ on items to know they can be recycled.',
        emoji: '📦'
      },
      {
        title: 'Why Recycling Matters',
        text: 'When we recycle, we turn old things into new things! This saves trees, uses less energy, and keeps trash out of nature. One recycled can saves enough energy to run a TV for 3 hours!',
        emoji: '⚡'
      },
      {
        title: 'Be a Recycling Hero',
        text: 'Sort your trash at home! Put paper with paper, plastic with plastic. Wash containers before recycling. You\'re helping save the planet with every item you recycle!',
        emoji: '🦸'
      }
    ],
    quiz: [
      {
        id: 'r1',
        question: 'What are the Three Rs?',
        options: ['Run, Rest, Repeat', 'Reduce, Reuse, Recycle', 'Read, Write, Run', 'Red, Rose, Rain'],
        correctIndex: 1,
        explanation: 'Reduce, Reuse, Recycle are the three Rs that help protect our planet!'
      },
      {
        id: 'r2',
        question: 'Which item can be recycled?',
        options: ['Food waste', 'Plastic bottles', 'Dirty diapers', 'Broken glass'],
        correctIndex: 1,
        explanation: 'Plastic bottles can be recycled! Look for the ♻️ symbol.'
      },
      {
        id: 'r3',
        question: 'What should you do before recycling a container?',
        options: ['Paint it', 'Wash it', 'Break it', 'Hide it'],
        correctIndex: 1,
        explanation: 'Washing containers before recycling helps them get recycled properly!'
      },
      {
        id: 'r4',
        question: 'Why is recycling good for trees?',
        options: ['It feeds them', 'We use less paper so fewer trees are cut', 'It waters them', 'It gives them shade'],
        correctIndex: 1,
        explanation: 'When we recycle paper, we don\'t need to cut down as many trees to make new paper!'
      }
    ]
  },
  {
    id: 'water-energy',
    title: 'Water & Energy Saving',
    emoji: '💧',
    description: 'Learn to save water and energy every day',
    color: 'from-cyan-400 to-blue-400',
    content: [
      {
        title: 'Precious Water',
        text: 'Only 1% of Earth\'s water is fresh and available for us to use! That\'s why saving water is super important. Every drop counts!',
        emoji: '💧'
      },
      {
        title: 'Water-Saving Tips',
        text: 'Turn off the tap while brushing teeth. Take shorter showers. Fix leaky faucets. Use a watering can for plants instead of a hose. These small changes save lots of water!',
        emoji: '🚿'
      },
      {
        title: 'Energy All Around',
        text: 'Energy powers our lights, computers, and TVs. Most energy comes from burning things like coal, which isn\'t good for Earth. Saving energy helps the planet!',
        emoji: '⚡'
      },
      {
        title: 'Be an Energy Saver',
        text: 'Turn off lights when leaving a room. Unplug devices you\'re not using. Open curtains for sunlight instead of turning on lights. You can be an energy-saving superhero!',
        emoji: '💡'
      }
    ],
    quiz: [
      {
        id: 'w1',
        question: 'How much of Earth\'s water can we use?',
        options: ['All of it', 'Half of it', 'Only about 1%', '99%'],
        correctIndex: 2,
        explanation: 'Only about 1% of Earth\'s water is fresh water we can use!'
      },
      {
        id: 'w2',
        question: 'When should you turn off the tap?',
        options: ['Never', 'While brushing teeth', 'While washing hands', 'While watering plants'],
        correctIndex: 1,
        explanation: 'Turning off the tap while brushing teeth saves a lot of water!'
      },
      {
        id: 'w3',
        question: 'What\'s a good way to save energy?',
        options: ['Leave all lights on', 'Turn off lights when leaving a room', 'Keep the TV on all day', 'Never use sunlight'],
        correctIndex: 1,
        explanation: 'Turning off lights when you leave a room is a great way to save energy!'
      },
      {
        id: 'w4',
        question: 'What can you use instead of turning on lights during the day?',
        options: ['A flashlight', 'Sunlight through windows', 'Night vision goggles', 'Candles'],
        correctIndex: 1,
        explanation: 'Using natural sunlight during the day saves energy and is great for you!'
      }
    ]
  },
  {
    id: 'green-habits',
    title: 'Green Habits at Home',
    emoji: '🌱',
    description: 'Simple eco-friendly habits for everyday life',
    color: 'from-green-400 to-lime-400',
    content: [
      {
        title: 'Green Living',
        text: 'Living green means making choices that are good for the Earth. It\'s about small daily habits that add up to big changes! Anyone can live green!',
        emoji: '🏡'
      },
      {
        title: 'Eco-Friendly Eating',
        text: 'Eat more fruits and vegetables! Try to waste less food. Bring your own bag to the store. Choose foods with less packaging. Your tummy and Earth will thank you!',
        emoji: '🥗'
      },
      {
        title: 'Green Transportation',
        text: 'Walk, bike, or take the bus when you can. Cars produce gases that warm up Earth. Plus, walking and biking are fun exercise!',
        emoji: '🚲'
      },
      {
        title: 'Nature Connection',
        text: 'Spend time in nature! Plant flowers or vegetables. Create a home for birds or butterflies. The more we love nature, the more we want to protect it!',
        emoji: '🦋'
      }
    ],
    quiz: [
      {
        id: 'g1',
        question: 'What does "living green" mean?',
        options: ['Painting everything green', 'Making eco-friendly choices', 'Only eating vegetables', 'Living in a forest'],
        correctIndex: 1,
        explanation: 'Living green means making choices every day that are good for our planet!'
      },
      {
        id: 'g2',
        question: 'Which is an eco-friendly eating habit?',
        options: ['Throwing away food', 'Using lots of plastic bags', 'Eating more fruits and vegetables', 'Wasting food'],
        correctIndex: 2,
        explanation: 'Eating more fruits and vegetables is great for you and the planet!'
      },
      {
        id: 'g3',
        question: 'What\'s a green way to get to school?',
        options: ['Having parents drive you alone', 'Walking or biking', 'Taking a helicopter', 'Staying home'],
        correctIndex: 1,
        explanation: 'Walking or biking doesn\'t use any fuel and is great exercise!'
      },
      {
        id: 'g4',
        question: 'Why should we spend time in nature?',
        options: ['It\'s boring', 'We learn to love and protect it', 'There\'s nothing else to do', 'Nature doesn\'t need us'],
        correctIndex: 1,
        explanation: 'When we spend time in nature, we learn to love it and want to protect it!'
      }
    ]
  }
];

// Recycling game items
export interface RecycleItem {
  id: string;
  name: string;
  emoji: string;
  bin: 'paper' | 'plastic' | 'metal' | 'organic';
}

export const RECYCLE_ITEMS: RecycleItem[] = [
  { id: '1', name: 'Newspaper', emoji: '📰', bin: 'paper' },
  { id: '2', name: 'Cardboard Box', emoji: '📦', bin: 'paper' },
  { id: '3', name: 'Water Bottle', emoji: '🍶', bin: 'plastic' },
  { id: '4', name: 'Milk Jug', emoji: '🥛', bin: 'plastic' },
  { id: '5', name: 'Soda Can', emoji: '🥫', bin: 'metal' },
  { id: '6', name: 'Food Can', emoji: '🥫', bin: 'metal' },
  { id: '7', name: 'Apple Core', emoji: '🍎', bin: 'organic' },
  { id: '8', name: 'Banana Peel', emoji: '🍌', bin: 'organic' },
  { id: '9', name: 'Magazine', emoji: '📖', bin: 'paper' },
  { id: '10', name: 'Plastic Bag', emoji: '🛍️', bin: 'plastic' },
  { id: '11', name: 'Aluminum Foil', emoji: '🔲', bin: 'metal' },
  { id: '12', name: 'Orange Peel', emoji: '🍊', bin: 'organic' },
];

export const BINS = [
  { id: 'paper', name: 'Paper', emoji: '📄', color: 'bg-blue-500' },
  { id: 'plastic', name: 'Plastic', emoji: '🧴', color: 'bg-yellow-500' },
  { id: 'metal', name: 'Metal', emoji: '🥫', color: 'bg-gray-500' },
  { id: 'organic', name: 'Organic', emoji: '🌿', color: 'bg-green-500' },
];

// Quiz race questions
export interface QuizRaceQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const QUIZ_RACE_QUESTIONS: QuizRaceQuestion[] = [
  { question: 'What color is the recycling symbol?', options: ['Red', 'Green', 'Blue', 'Yellow'], correctIndex: 1 },
  { question: 'What do plants need to grow?', options: ['Sunlight and water', 'Candy', 'Ice cream', 'Television'], correctIndex: 0 },
  { question: 'Which animal is endangered?', options: ['Dog', 'Cat', 'Polar Bear', 'Chicken'], correctIndex: 2 },
  { question: 'What do trees produce?', options: ['Noise', 'Oxygen', 'Plastic', 'Metal'], correctIndex: 1 },
  { question: 'Which is renewable energy?', options: ['Coal', 'Oil', 'Solar', 'Gas'], correctIndex: 2 },
  { question: 'What happens when ice melts?', options: ['It becomes fire', 'It becomes water', 'It disappears', 'It becomes rock'], correctIndex: 1 },
  { question: 'Which uses less water?', options: ['Bath', 'Short shower', 'Swimming pool', 'Sprinkler'], correctIndex: 1 },
  { question: 'What can you do with old clothes?', options: ['Throw away', 'Donate or reuse', 'Burn them', 'Hide them'], correctIndex: 1 },
  { question: 'Which vehicle is eco-friendly?', options: ['Big truck', 'Airplane', 'Bicycle', 'Race car'], correctIndex: 2 },
  { question: 'What helps reduce pollution?', options: ['More cars', 'Planting trees', 'More factories', 'Burning trash'], correctIndex: 1 },
  { question: 'Where does rain come from?', options: ['Space', 'Clouds', 'Underground', 'Mountains'], correctIndex: 1 },
  { question: 'Which item is compostable?', options: ['Plastic bottle', 'Metal can', 'Banana peel', 'Glass jar'], correctIndex: 2 },
];
