// Use the database
const database = "KokebiQuizApp";
use(database);

// Drop existing collections if they exist to recreate fresh
db.users.drop();
db.quiz.drop();
db.zodiac.drop();
db.ai.drop();

// 1. Users Collection
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "password", "createdAt"],
      properties: {
        username: {
          bsonType: "string",
          description: "Username must be a string and is required",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email must be a valid email string and is required",
        },
        password: {
          bsonType: "string",
          description: "Hashed password must be a string and is required",
        },
        profilePicture: {
          bsonType: "string",
          description: "URL to profile picture",
        },
        bio: {
          bsonType: "string",
          description: "User biography",
        },
        quizHistory: {
          bsonType: "array",
          description: "Array of quiz attempts",
          items: {
            bsonType: "object",
            required: ["quizId", "score", "completedAt"],
            properties: {
              quizId: {
                bsonType: "objectId",
                description: "Reference to quiz",
              },
              score: {
                bsonType: "int",
                description: "User's score",
              },
              completedAt: {
                bsonType: "date",
                description: "Completion date",
              },
            },
          },
        },
        badges: {
          bsonType: "array",
          description: "User achievements",
          items: {
            bsonType: "string",
          },
        },
        createdAt: {
          bsonType: "date",
          description: "Account creation date",
        },
        lastLogin: {
          bsonType: "date",
          description: "Last login timestamp",
        },
      },
    },
  },
});

// 2. Quiz Collection
db.createCollection("quiz", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "description", "questions", "createdAt", "createdBy"],
      properties: {
        title: {
          bsonType: "string",
          description: "Quiz title is required",
        },
        description: {
          bsonType: "string",
          description: "Quiz description is required",
        },
        category: {
          bsonType: "string",
          description: "Quiz category",
        },
        tags: {
          bsonType: "array",
          description: "Tags for quiz",
          items: {
            bsonType: "string",
          },
        },
        difficulty: {
          enum: ["easy", "medium", "hard"],
          description: "Difficulty level",
        },
        questions: {
          bsonType: "array",
          minItems: 1,
          description: "Array of questions",
          items: {
            bsonType: "object",
            required: ["question", "options", "correctAnswer"],
            properties: {
              question: {
                bsonType: "string",
                description: "Question text",
              },
              options: {
                bsonType: "array",
                minItems: 2,
                items: {
                  bsonType: "string",
                },
              },
              correctAnswer: {
                bsonType: ["string", "array"],
                description: "Correct answer(s)",
              },
              explanation: {
                bsonType: "string",
                description: "Explanation for the answer",
              },
              points: {
                bsonType: "int",
                description: "Points for the question",
              },
            },
          },
        },
        timeLimit: {
          bsonType: "int",
          description: "Time limit in seconds",
        },
        createdAt: {
          bsonType: "date",
          description: "Creation date",
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update date",
        },
        createdBy: {
          bsonType: "objectId",
          description: "User who created the quiz",
        },
        isPublic: {
          bsonType: "bool",
          description: "Public availability",
        },
        plays: {
          bsonType: "int",
          description: "Number of times played",
        },
        avgRating: {
          bsonType: "double",
          description: "Average rating",
        },
      },
    },
  },
});

// 3. Zodiac Collection
db.createCollection("zodiac", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["sign", "dateRange", "element", "characteristics"],
      properties: {
        sign: {
          bsonType: "string",
          description: "Zodiac sign name",
        },
        dateRange: {
          bsonType: "object",
          required: ["start", "end"],
          properties: {
            start: {
              bsonType: "string",
              description: "Start date MM-DD",
            },
            end: {
              bsonType: "string",
              description: "End date MM-DD",
            },
          },
        },
        element: {
          enum: ["Fire", "Earth", "Air", "Water"],
          description: "Element",
        },
        planet: {
          bsonType: "string",
          description: "Ruling planet",
        },
        symbol: {
          bsonType: "string",
          description: "Symbol",
        },
        characteristics: {
          bsonType: "object",
          required: ["personality", "strengths", "weaknesses"],
          properties: {
            personality: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            strengths: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            weaknesses: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
          },
        },
        compatibility: {
          bsonType: "object",
          properties: {
            good: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            bad: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
          },
        },
        dailyHoroscopes: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["date", "content"],
            properties: {
              date: { bsonType: "date" },
              content: { bsonType: "string" },
              luckyNumbers: {
                bsonType: "array",
                items: { bsonType: "int" },
              },
              mood: { bsonType: "string" },
            },
          },
        },
      },
    },
  },
});

// 4. AI Collection (for AI-generated content/settings)
db.createCollection("ai", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["type", "content", "createdAt"],
      properties: {
        type: {
          enum: ["horoscope", "quiz", "personality", "advice"],
          description: "AI content type",
        },
        content: {
          bsonType: "object",
          description: "Content varies by type",
        },
        parameters: {
          bsonType: "object",
          description: "Generation parameters",
        },
        relatedTo: {
          bsonType: ["objectId", "null"],
          description: "Related document reference",
        },
        userId: {
          bsonType: ["objectId", "null"],
          description: "User who requested content",
        },
        createdAt: {
          bsonType: "date",
          description: "Creation date",
        },
        expiresAt: {
          bsonType: "date",
          description: "Expiration date",
        },
        feedback: {
          bsonType: "object",
          properties: {
            rating: {
              bsonType: "int",
              minimum: 1,
              maximum: 5,
              description: "User rating",
            },
            comments: {
              bsonType: "string",
              description: "User comments",
            },
          },
        },
      },
    },
  },
});

// Create indexes for performance and uniqueness
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });
db.quiz.createIndex({ title: 1 });
db.quiz.createIndex({ tags: 1 });
db.quiz.createIndex({ createdBy: 1 });
db.zodiac.createIndex({ sign: 1 }, { unique: true });

// Insert sample data to verify setup

// Sample user
const userId = db.users.insertOne({
  username: "testuser",
  email: "test@gmail.com",
  password: "$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // hashed password placeholder
  createdAt: new Date(),
  quizHistory: [],
  badges: ["Newcomer"],
}).insertedId;

// Sample quiz
db.quiz.insertOne({
  title: "Zodiac Knowledge Quiz",
  description: "Test your knowledge about zodiac signs",
  category: "astrology",
  tags: ["zodiac", "astrology", "personality"],
  difficulty: "medium",
  questions: [
    {
      question: "Which zodiac sign is represented by the ram?",
      options: ["Aries", "Taurus", "Leo", "Capricorn"],
      correctAnswer: "Aries",
      explanation: "Aries is represented by the ram symbol.",
      points: 10,
    },
  ],
  timeLimit: 300,
  createdAt: new Date(),
  createdBy: userId,
  isPublic: true,
  plays: 0,
  avgRating: 0,
});

// Sample zodiac sign
const ariesId = db.zodiac.insertOne({
  sign: "Aries",
  dateRange: { start: "03-21", end: "04-19" },
  element: "Fire",
  planet: "Mars",
  symbol: "Ram",
  characteristics: {
    personality: ["Bold", "Independent", "Courageous"],
    strengths: ["Leadership", "Confidence", "Enthusiasm"],
    weaknesses: ["Impatience", "Moodiness", "Short-tempered"],
  },
  compatibility: {
    good: ["Leo", "Sagittarius"],
    bad: ["Cancer", "Capricorn"],
  },
  dailyHoroscopes: [
    {
      date: new Date(),
      content:
        "Today is a good day to start new projects. Your energy is high and your focus is sharp.",
      luckyNumbers: [3, 7, 12],
      mood: "Energetic",
    },
  ],
}).insertedId;

// Sample AI content
db.ai.insertOne({
  type: "horoscope",
  content: {
    prediction:
      "Your creativity will be at its peak today. Use this energy to solve problems that have been troubling you.",
    advice:
      "Take time to connect with old friends. A surprising opportunity may arise from these connections.",
  },
  parameters: {
    sign: "Aries",
    date: new Date(),
  },
  relatedTo: ariesId,
  userId: userId,
  createdAt: new Date(),
});

// Confirmation output
print(
  "Successfully created collections with schema validation and inserted sample data!"
);

// List collections and document counts
print("\nCollections in the database:");
db.getCollectionNames().forEach((coll) => {
  print(` - ${coll}: ${db[coll].countDocuments()} documents`);
});
