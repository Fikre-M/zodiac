import React, { useState, useEffect } from "react";
import {
  Star,
  Heart,
  DollarSign,
  Briefcase,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

const QuizContainer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [zodiacSign, setZodiacSign] = useState("");

  // Zodiac data with personality traits and predictions
  const zodiacData = {
    aries: {
      name: "Aries",
      element: "Fire",
      symbol: "♈",
      dates: "Mar 21 - Apr 19",
      traits: ["Leadership", "Ambitious", "Energetic", "Competitive"],
      love: "You're passionate and direct in love. This week brings romantic opportunities through bold actions.",
      career:
        "Your leadership skills shine. Expect recognition for recent projects and new opportunities.",
      finance:
        "Impulsive spending needs attention. Focus on long-term investments rather than quick gains.",
      compatibility: ["Leo", "Sagittarius", "Gemini"],
    },
    taurus: {
      name: "Taurus",
      element: "Earth",
      symbol: "♉",
      dates: "Apr 20 - May 20",
      traits: ["Reliable", "Patient", "Practical", "Determined"],
      love: "Stability in relationships is highlighted. Single? Look for genuine connections, not fleeting attractions.",
      career:
        "Your persistence pays off. A steady approach to current projects yields better results than rushing.",
      finance:
        "Excellent time for savings and investment. Your practical nature guides wise financial decisions.",
      compatibility: ["Virgo", "Capricorn", "Cancer"],
    },
    gemini: {
      name: "Gemini",
      element: "Air",
      symbol: "♊",
      dates: "May 21 - Jun 20",
      traits: ["Adaptable", "Curious", "Witty", "Social"],
      love: "Communication is key in relationships. Express your feelings clearly to avoid misunderstandings.",
      career:
        "Your versatility opens multiple paths. Consider roles that utilize your communication skills.",
      finance:
        "Diverse income streams suit you. Avoid putting all financial eggs in one basket.",
      compatibility: ["Libra", "Aquarius", "Aries"],
    },
    cancer: {
      name: "Cancer",
      element: "Water",
      symbol: "♋",
      dates: "Jun 21 - Jul 22",
      traits: ["Nurturing", "Intuitive", "Emotional", "Protective"],
      love: "Deep emotional connections are favored. Trust your intuition about potential partners.",
      career:
        "Your empathy makes you valuable in team settings. Consider roles in caregiving or counseling.",
      finance:
        "Focus on security and emergency funds. Your cautious approach to money serves you well.",
      compatibility: ["Scorpio", "Pisces", "Taurus"],
    },
    leo: {
      name: "Leo",
      element: "Fire",
      symbol: "♌",
      dates: "Jul 23 - Aug 22",
      traits: ["Confident", "Generous", "Creative", "Dramatic"],
      love: "Romance and grand gestures are highlighted. Don't be afraid to show your affection boldly.",
      career:
        "Your creativity and leadership shine. Perfect time for presentations or leading new initiatives.",
      finance:
        "Generous nature may lead to overspending. Balance treating others with personal financial goals.",
      compatibility: ["Aries", "Sagittarius", "Libra"],
    },
    virgo: {
      name: "Virgo",
      element: "Earth",
      symbol: "♍",
      dates: "Aug 23 - Sep 22",
      traits: ["Analytical", "Practical", "Modest", "Helpful"],
      love: "Focus on practical expressions of love. Small, thoughtful gestures mean more than grand displays.",
      career:
        "Your attention to detail is highly valued. Excellent time for quality control and process improvement.",
      finance:
        "Methodical approach to budgeting pays off. Review and optimize your financial systems.",
      compatibility: ["Taurus", "Capricorn", "Scorpio"],
    },
    libra: {
      name: "Libra",
      element: "Air",
      symbol: "♎",
      dates: "Sep 23 - Oct 22",
      traits: ["Diplomatic", "Fair", "Social", "Romantic"],
      love: "Harmony in relationships is essential. Work on balancing give and take with your partner.",
      career:
        "Your diplomatic skills are in demand. Consider roles in mediation, law, or public relations.",
      finance:
        "Seek balance in spending vs. saving. Avoid financial decisions based purely on aesthetics.",
      compatibility: ["Gemini", "Aquarius", "Leo"],
    },
    scorpio: {
      name: "Scorpio",
      element: "Water",
      symbol: "♏",
      dates: "Oct 23 - Nov 21",
      traits: ["Intense", "Mysterious", "Determined", "Loyal"],
      love: "Deep, transformative connections are possible. Don't fear vulnerability with the right person.",
      career:
        "Your investigative nature serves you well. Excellent for research, psychology, or detective work.",
      finance:
        "Research investments thoroughly. Your intuition about hidden opportunities is strong.",
      compatibility: ["Cancer", "Pisces", "Virgo"],
    },
    sagittarius: {
      name: "Sagittarius",
      element: "Fire",
      symbol: "♐",
      dates: "Nov 22 - Dec 21",
      traits: ["Adventurous", "Optimistic", "Philosophical", "Independent"],
      love: "Adventure and growth in relationships. Perfect time for travel with a partner or meeting someone abroad.",
      career:
        "Your worldview and optimism inspire others. Consider teaching, travel, or international business.",
      finance:
        "Avoid risky investments driven by overconfidence. Your optimism needs realistic planning.",
      compatibility: ["Aries", "Leo", "Aquarius"],
    },
    capricorn: {
      name: "Capricorn",
      element: "Earth",
      symbol: "♑",
      dates: "Dec 22 - Jan 19",
      traits: ["Ambitious", "Disciplined", "Responsible", "Traditional"],
      love: "Long-term commitment and stability are highlighted. Build solid foundations in relationships.",
      career:
        "Your discipline and ambition are recognized. Promotions or new responsibilities are likely.",
      finance:
        "Conservative investments and long-term planning are favored. Your patience yields steady returns.",
      compatibility: ["Taurus", "Virgo", "Pisces"],
    },
    aquarius: {
      name: "Aquarius",
      element: "Air",
      symbol: "♒",
      dates: "Jan 20 - Feb 18",
      traits: ["Independent", "Innovative", "Humanitarian", "Eccentric"],
      love: "Unconventional approaches to love work well. Friendship-based relationships are especially favored.",
      career:
        "Innovation and technology suit you. Consider roles in startups, tech, or social causes.",
      finance:
        "Cryptocurrency and tech investments appeal to you. Balance innovation with proven strategies.",
      compatibility: ["Gemini", "Libra", "Sagittarius"],
    },
    pisces: {
      name: "Pisces",
      element: "Water",
      symbol: "♓",
      dates: "Feb 19 - Mar 20",
      traits: ["Compassionate", "Artistic", "Intuitive", "Dreamy"],
      love: "Emotional and spiritual connections are emphasized. Trust your intuition about romantic partners.",
      career:
        "Your creativity and empathy are assets. Consider arts, healing professions, or non-profit work.",
      finance:
        "Emotional spending needs attention. Create systems to protect against impulsive purchases.",
      compatibility: ["Cancer", "Scorpio", "Capricorn"],
    },
  };

  const questions = [
    {
      id: 1,
      question: "What's your birth date?",
      type: "birthdate",
      description:
        "This helps us determine your zodiac sign for accurate predictions",
    },
    {
      id: 2,
      question: "How do you typically handle stress?",
      type: "multiple",
      options: [
        { value: "confront", text: "Face it head-on with action" },
        { value: "analyze", text: "Analyze and plan systematically" },
        { value: "social", text: "Talk it through with friends" },
        { value: "retreat", text: "Take time alone to process" },
      ],
    },
    {
      id: 3,
      question: "What motivates you most in relationships?",
      type: "multiple",
      options: [
        { value: "passion", text: "Intense passion and excitement" },
        { value: "stability", text: "Security and long-term commitment" },
        { value: "growth", text: "Personal growth and adventure" },
        { value: "harmony", text: "Peace and emotional connection" },
      ],
    },
    {
      id: 4,
      question: "Your ideal work environment is:",
      type: "multiple",
      options: [
        { value: "leadership", text: "Leading teams and making decisions" },
        { value: "creative", text: "Creative and flexible" },
        { value: "structured", text: "Organized with clear goals" },
        { value: "collaborative", text: "Collaborative and social" },
      ],
    },
    {
      id: 5,
      question: "How do you approach financial decisions?",
      type: "multiple",
      options: [
        { value: "bold", text: "Take calculated risks for big rewards" },
        { value: "conservative", text: "Prefer safe, steady investments" },
        { value: "research", text: "Thoroughly research before deciding" },
        { value: "intuitive", text: "Go with gut feelings and trends" },
      ],
    },
    {
      id: 6,
      question: "What's your biggest strength?",
      type: "multiple",
      options: [
        { value: "determination", text: "Determination and persistence" },
        { value: "creativity", text: "Creativity and innovation" },
        { value: "empathy", text: "Understanding and helping others" },
        { value: "logic", text: "Logical thinking and analysis" },
      ],
    },
  ];

  const determineZodiacSign = (birthDate) => {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return "aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return "taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return "gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return "cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return "libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return "scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return "sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return "capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
      return "pisces";

    return "aries"; // fallback
  };

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (questionId === 1) {
      const sign = determineZodiacSign(answer);
      setZodiacSign(sign);
    }
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateResults();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateResults = () => {
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const signData = zodiacData[zodiacSign];
      const personalityScore = calculatePersonalityScore();

      setResults({
        zodiacSign: signData,
        personalityScore,
        predictions: {
          love: generatePersonalizedPrediction("love", personalityScore),
          career: generatePersonalizedPrediction("career", personalityScore),
          finance: generatePersonalizedPrediction("finance", personalityScore),
        },
      });
      setIsLoading(false);
    }, 2000);
  };

  const calculatePersonalityScore = () => {
    // Simple scoring based on answers
    let scores = {
      leadership: 0,
      creativity: 0,
      stability: 0,
      empathy: 0,
    };

    if (answers[2] === "passion") scores.leadership += 2;
    if (answers[2] === "stability") scores.stability += 2;
    if (answers[3] === "passion") scores.leadership += 1;
    if (answers[3] === "harmony") scores.empathy += 2;
    if (answers[4] === "leadership") scores.leadership += 2;
    if (answers[4] === "creative") scores.creativity += 2;
    if (answers[5] === "bold") scores.leadership += 1;
    if (answers[5] === "conservative") scores.stability += 2;
    if (answers[6] === "creativity") scores.creativity += 2;
    if (answers[6] === "empathy") scores.empathy += 2;

    return scores;
  };

  const generatePersonalizedPrediction = (category, scores) => {
    const signData = zodiacData[zodiacSign];
    const basePrediction = signData[category];

    // Enhance prediction based on personality scores
    let enhancement = "";
    if (category === "love" && scores.empathy > 3) {
      enhancement =
        " Your empathetic nature will deepen emotional connections.";
    } else if (category === "career" && scores.leadership > 3) {
      enhancement =
        " Leadership opportunities are especially prominent for you.";
    } else if (category === "finance" && scores.stability > 3) {
      enhancement =
        " Your conservative approach will yield steady financial growth.";
    }

    return basePrediction + enhancement;
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
    setZodiacSign("");
  };

  const renderQuestion = () => {
    const question = questions[currentStep];

    return (
      <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-purple-600 font-medium">
              Question {currentStep + 1} of {questions.length}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {question.question}
          </h2>
          {question.description && (
            <p className="text-gray-600 text-sm">{question.description}</p>
          )}
        </div>

        {question.type === "birthdate" ? (
          <div className="mb-8">
            <input
              type="date"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              value={answers[question.id] || ""}
            />
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:border-purple-400 ${
                  answers[question.id] === option.value
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handleAnswer(question.id, option.value)}
              >
                <span className="font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </button>

          <button
            onClick={nextStep}
            disabled={!answers[question.id]}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {currentStep === questions.length - 1 ? "Get Results" : "Next"}
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const { zodiacSign: sign, predictions } = results;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Zodiac Sign Header */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
          <div className="text-6xl mb-4">{sign.symbol}</div>
          <h1 className="text-4xl font-bold mb-2">{sign.name}</h1>
          <p className="text-purple-100 text-lg">{sign.dates}</p>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {sign.element} Sign
            </span>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <span className="text-sm">Personality Match: 95%</span>
            </div>
          </div>
        </div>

        {/* Personality Traits */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
            Your Core Traits
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sign.traits.map((trait, index) => (
              <div
                key={index}
                className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-center font-medium"
              >
                {trait}
              </div>
            ))}
          </div>
        </div>

        {/* Predictions */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Love Prediction */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">
                Love & Romance
              </h3>
            </div>
            <p className="text-gray-600 mb-4">{predictions.love}</p>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">Compatible Signs:</p>
              <div className="flex space-x-2">
                {sign.compatibility.map((compatSign, index) => (
                  <span
                    key={index}
                    className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs"
                  >
                    {compatSign}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Career Prediction */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">Career & Work</h3>
            </div>
            <p className="text-gray-600 mb-4">{predictions.career}</p>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Success Probability
                </span>
                <span className="text-blue-600 font-bold">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "87%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Finance Prediction */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-green-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">
                Finance & Money
              </h3>
            </div>
            <p className="text-gray-600 mb-4">{predictions.finance}</p>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Financial Outlook</span>
                <span className="text-green-600 font-bold">Positive</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">
                  Strong growth potential
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={resetQuiz}
            className="flex items-center justify-center mx-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 font-medium"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className="bg-white rounded-xl p-12 shadow-lg max-w-md mx-auto text-center">
        <div className="animate-spin w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full mx-auto mb-6"></div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Analyzing Your Cosmic Profile
        </h3>
        <p className="text-gray-600">
          Our AI is processing your answers and consulting the stars...
        </p>
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Calculating zodiac compatibility</span>
            <span className="text-purple-600">100%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Analyzing personality traits</span>
            <span className="text-purple-600">95%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Generating predictions</span>
            <span className="text-purple-600">78%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Cosmic Personality Quiz
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover your zodiac personality and get personalized predictions
            for love, career, and finance through our AI-powered cosmic
            analysis.
          </p>
        </div>

        {/* Main Content */}
        {isLoading
          ? renderLoading()
          : results
          ? renderResults()
          : renderQuestion()}
      </div>
    </div>
  );
};

export default QuizContainer;
