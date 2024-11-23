import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Check, Star, Trophy, BookOpen, GitBranchPlus } from 'lucide-react';

// RoadmapSection component remains the same as before
const RoadmapSection = ({ title, items, level }) => {
  const getLevelColor = (itemLevel) => {
    return itemLevel === 'junior' ? 'bg-emerald-100' :
           itemLevel === 'mid' ? 'bg-yellow-100' :
           'bg-red-100';
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-rgb-25-114-101 flex items-center gap-2">
        {title === "Junior Level" && <Star className="w-5 h-5" />}
        {title === "Mid Level" && <Trophy className="w-5 h-5" />}
        {title === "Senior Level" && <BookOpen className="w-5 h-5" />}
        {title}
      </h3>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg flex items-center gap-2 ${getLevelColor(level)} transition-transform hover:scale-102`}
          >
            <Check className="w-4 h-4 text-rgb-25-114-101 flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// New TreeNode component for the summary view
const TreeNode = ({ title, children, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const paddingLeft = level * 24;
  
  return (
    <div className="relative" style={{ paddingLeft: `${paddingLeft}px` }}>
      <div 
        className={`
          flex items-center gap-2 p-2 rounded-lg
          ${level === 0 ? 'bg-[rgb(25,114,101)] text-white' : 'hover:bg-gray-50'}
          cursor-pointer transition-colors
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <GitBranchPlus className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        <span className="font-medium">{title}</span>
      </div>
      {isExpanded && children && (
        <div className="relative mt-2">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
          {children}
        </div>
      )}
    </div>
  );
};

// Main component
const FrontendRoadmap = () => {
  const [activeTab, setActiveTab] = useState("summary");

  const categories = {
    core: {
      title: "Core Technologies",
      junior: [
        "HTML5 fundamentals and semantic markup",
        "CSS3 basics including Flexbox and Grid",
        "Basic JavaScript (ES6+)",
        "Basic Tailwind CSS",
      ],
      mid: [
        "Advanced CSS (SCSS, CSS Modules)",
        "Advanced JavaScript concepts",
        "Advanced Tailwind CSS patterns",
      ],
      senior: [
        "CSS architecture and optimization",
        "JavaScript performance optimization",
        "Complex responsive layouts",
      ]
    },
    frameworks: {
      title: "Frameworks and Libraries",
      junior: [
        "Basic React concepts and hooks",
        "React Router DOM basics",
        "Basic state management with Redux",
        "Axios for API calls",
      ],
      mid: [
        "Advanced React patterns",
        "Next.js fundamentals",
        "Complex state management",
        "Form handling with React Hook Form & Yup",
      ],
      senior: [
        "Advanced Next.js features",
        "Performance optimization",
        "Custom hook development",
        "Advanced state management patterns",
      ]
    },
    styling: {
      title: "Styling Libraries",
      junior: [
        "Material UI basics",
        "Basic component styling",
        "Understanding design systems",
      ],
      mid: [
        "Multiple UI library proficiency",
        "Styled Components",
        "Custom theming",
      ],
      senior: [
        "Creating design systems",
        "Performance optimization",
        "Custom UI library development",
      ]
    },
    testing: {
      title: "Testing",
      junior: [
        "Basic unit testing with Jest",
        "React Testing Library basics",
        "Understanding test coverage",
      ],
      mid: [
        "Integration testing",
        "E2E testing with Cypress",
        "Test-driven development basics",
      ],
      senior: [
        "Advanced testing patterns",
        "Testing architecture",
        "Performance testing",
        "Accessibility testing",
      ]
    },
    tools: {
      title: "Build Tools & Others",
      junior: [
        "Basic Git commands",
        "npm/yarn basics",
        "Basic Webpack concepts",
      ],
      mid: [
        "Git workflow mastery",
        "Docker basics",
        "Advanced build optimization",
      ],
      senior: [
        "CI/CD implementation",
        "Build tool optimization",
        "Infrastructure decisions",
      ]
    },
    soft: {
      title: "Soft Skills",
      junior: [
        "Basic time management",
        "Team collaboration",
        "Communication skills",
        "Problem-solving basics",
      ],
      mid: [
        "Project management",
        "Mentoring juniors",
        "Technical documentation",
        "Cross-team collaboration",
      ],
      senior: [
        "Leadership skills",
        "Architecture planning",
        "Team building",
        "Strategic thinking",
        "Stakeholder management",
      ]
    },
    summary: {
      title: "Summary",
      content: "Tree View Summary"
    }
  };

  const renderSummaryTree = () => (
    <div className="p-6 space-y-4">
      <TreeNode title="Frontend Development Roadmap">
        {Object.entries(categories).map(([key, category]) => {
          if (key === 'summary') return null;
          return (
            <TreeNode key={key} title={category.title} level={1}>
              <TreeNode title="Junior Level" level={2}>
                {category.junior.map((item, index) => (
                  <div key={index} className="ml-6 p-2 text-gray-600 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    {item}
                  </div>
                ))}
              </TreeNode>
              <TreeNode title="Mid Level" level={2}>
                {category.mid.map((item, index) => (
                  <div key={index} className="ml-6 p-2 text-gray-600 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    {item}
                  </div>
                ))}
              </TreeNode>
              <TreeNode title="Senior Level" level={2}>
                {category.senior.map((item, index) => (
                  <div key={index} className="ml-6 p-2 text-gray-600 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    {item}
                  </div>
                ))}
              </TreeNode>
            </TreeNode>
          );
        })}
      </TreeNode>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-rgb-25-114-101 text-center">
          Kelaasor Frontend Development Roadmap
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap gap-2 mb-8 justify-center">
            <TabsTrigger
              value="summary"
              className={`px-4 py-2 rounded-full transition-all
                ${activeTab === 'summary' 
                  ? 'bg-[rgb(25,114,101)] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Summary Tree
            </TabsTrigger>
            {Object.keys(categories).filter(key => key !== 'summary').map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className={`px-4 py-2 rounded-full transition-all
                  ${activeTab === category 
                    ? 'bg-[rgb(25,114,101)] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {categories[category].title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="summary">
            <Card className="border-t-4 border-t-[rgb(25,114,101)]">
              <CardContent>
                {renderSummaryTree()}
              </CardContent>
            </Card>
          </TabsContent>

          {Object.keys(categories).filter(key => key !== 'summary').map((category) => (
            <TabsContent key={category} value={category}>
              <Card className="border-t-4 border-t-[rgb(25,114,101)]">
                <CardContent className="pt-6">
                  <RoadmapSection 
                    title="Junior Level"
                    items={categories[category].junior}
                    level="junior"
                  />
                  <RoadmapSection 
                    title="Mid Level"
                    items={categories[category].mid}
                    level="mid"
                  />
                  <RoadmapSection 
                    title="Senior Level"
                    items={categories[category].senior}
                    level="senior"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FrontendRoadmap;