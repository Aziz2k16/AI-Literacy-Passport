import { Unit } from '../types';

export const CURRICULUM: Unit[] = [
  {
    id: 1,
    title: 'Unit 1: What is AI, Really?',
    subtitle: 'LLMs, Training Data, Tokens & Limitations',
    description: 'Demystify artificial intelligence. Learn how Large Language Models predict text, why tokens matter, and what AI can and cannot do.',
    badgeTitle: 'Token Pioneer',
    badgeIcon: 'Cpu',
    color: 'from-blue-600 via-indigo-600 to-purple-600',
    lessons: [
      {
        id: 'u1-l1',
        title: 'How LLMs Actually Think',
        description: 'Understand word prediction and pattern recognition.',
        durationMinutes: 3,
        xpReward: 20,
        gemReward: 10,
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            prompt: 'At its fundamental level, how does a Large Language Model (LLM) generate text?',
            options: [
              'By searching Google and copying exact pages in real time',
              'By predicting the next statistical "token" based on learned patterns',
              'By retrieving pre-written answers stored in a massive database',
              'By experiencing human thoughts and reasoning logic'
            ],
            correctAnswer: 1,
            explanation: 'LLMs are advanced pattern matching engines. They compute probabilities to predict the next token (word or sub-word) based on billions of parameters trained on text.',
            tip: 'Think of an LLM as an ultra-capable auto-complete engine.'
          },
          {
            id: 'q2',
            type: 'true_false',
            prompt: 'True or False: LLMs possess an active memory of past conversations unless explicitly provided in the context window.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'LLMs do not retain memory between independent API requests. Every new prompt relies on the context passed during that specific request.'
          },
          {
            id: 'q3',
            type: 'spot_mistake',
            prompt: 'Spot the incorrect statement about AI Model Training:',
            options: [
              'Training data consists of billions of web pages, books, and articles.',
              'During training, the model adjusts mathematical parameters called weights.',
              'AI models continuously update their core weights live after every user chat.',
              'Reinforcement Learning with Human Feedback (RLHF) helps align AI responses.'
            ],
            correctAnswer: 2,
            explanation: 'Models do NOT update their base weights during user conversations. Live learning requires a separate retraining or fine-tuning pass.',
            tip: 'Conversational AI context is temporary; core model weights are static after training.'
          },
          {
            id: 'q4',
            type: 'fill_blank',
            prompt: 'The basic unit of data processed by a language model is called a ____.',
            blankPrefix: 'An LLM measures text length in ',
            blankSuffix: 's rather than character counts.',
            options: ['Byte', 'Token', 'Vector', 'Pixel'],
            correctAnswer: 'Token',
            explanation: 'A token is a chunk of text. On average, 1 token is roughly 4 characters or 0.75 words in English.'
          },
          {
            id: 'q5',
            type: 'rewrite_prompt',
            prompt: 'Evaluate this request: "Explain tokens simply for a 10-year-old using a Lego analogy."',
            options: [
              'Poor prompt: Too vague and abstract',
              'Great prompt: Has clear persona, audience, and analogy constraint'
            ],
            correctAnswer: 1,
            explanation: 'Specifying the target audience (10-year-old) and a concrete metaphor (Lego blocks) helps the AI calibrate its tone and vocabulary perfectly.'
          }
        ]
      },
      {
        id: 'u1-l2',
        title: 'Understanding Tokens & Context',
        description: 'Context limits, tokenization tricks, and context windows.',
        durationMinutes: 4,
        xpReward: 25,
        gemReward: 15,
        questions: [
          {
            id: 'q2-1',
            type: 'multiple_choice',
            prompt: 'Approximately how many words is 1,000 AI tokens?',
            options: [
              '100 words',
              '750 words',
              '2,000 words',
              '5,000 words'
            ],
            correctAnswer: 1,
            explanation: 'A rule of thumb is 100 tokens ≈ 75 words, so 1,000 tokens ≈ 750 English words.',
            tip: 'Tokens include sub-words, spaces, and punctuation.'
          },
          {
            id: 'q2-2',
            type: 'fill_blank',
            prompt: 'The maximum amount of text an AI can process in a single conversation is its _____ window.',
            blankPrefix: 'If your prompt exceeds the ',
            blankSuffix: ' window, the AI forgets earlier parts of the chat.',
            options: ['Memory', 'Context', 'Buffer', 'Processing'],
            correctAnswer: 'Context',
            explanation: 'The context window limits how much text (input + output) the AI can hold in active memory at one time.'
          },
          {
            id: 'q2-3',
            type: 'spot_mistake',
            prompt: 'Which of these is a known side effect when an AI prompt reaches the limit of its context window?',
            options: [
              'The AI summarizes earlier details smoothly without data loss',
              'The AI begins "forgetting" instructions given at the beginning of the chat',
              'New tokens push out the oldest tokens in the active buffer',
              'The model might hallucinate missing details it no longer sees'
            ],
            correctAnswer: 0,
            explanation: 'Context truncation is abrupt, not smooth! When the window fills, oldest tokens drop off unless manually summarized.'
          },
          {
            id: 'q2-4',
            type: 'true_false',
            prompt: 'True or False: Modern models like Gemini can handle over 1 million tokens in a single prompt context.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'Gemini models feature massive context windows (up to 1M–2M tokens), enabling entire books or long codebases to be analyzed at once.'
          }
        ]
      },
      {
        id: 'u1-l3',
        title: 'AI Hallucinations & Limits',
        description: 'Why models sound confident even when completely wrong.',
        durationMinutes: 4,
        xpReward: 25,
        gemReward: 15,
        questions: [
          {
            id: 'q3-1',
            type: 'multiple_choice',
            prompt: 'What is an "AI hallucination"?',
            options: [
              'A visual glitch in image generation tools',
              'When the model presents false or invented facts with high confidence',
              'A virus transmitted through AI prompts',
              'When the AI refuses to answer a dangerous question'
            ],
            correctAnswer: 1,
            explanation: 'Hallucination occurs because LLMs generate plausibly sounding text based on statistics rather than consulting a true fact database.'
          },
          {
            id: 'q3-2',
            type: 'drag_rank',
            prompt: 'Rank these verification steps from MOST reliable to LEAST reliable when double-checking AI facts:',
            options: [
              '1. Cross-reference with primary official sources or peer-reviewed domain data',
              '2. Ask the same AI model "Are you 100% sure?"',
              '3. Use search engine grounding or external verification tools',
              '4. Assume it is correct because it cited a book title'
            ],
            correctAnswer: [
              '1. Cross-reference with primary official sources or peer-reviewed domain data',
              '3. Use search engine grounding or external verification tools',
              '2. Ask the same AI model "Are you 100% sure?"',
              '4. Assume it is correct because it cited a book title'
            ],
            explanation: 'Primary sources are most reliable. Asking the same model if it is sure often leads to confirmation bias or double hallucinations!'
          },
          {
            id: 'q3-3',
            type: 'spot_mistake',
            prompt: 'Spot the scenario where an LLM is MOST prone to hallucinating:',
            options: [
              'Summarizing a pasted 500-word article provided directly in the prompt',
              'Translating a common Spanish phrase into English',
              'Asking for citations on a obscure niche topic without providing sources',
              'Formatting a list of dates into JSON format'
            ],
            correctAnswer: 2,
            explanation: 'When asked for obscure citations without context, the AI predicts realistic-looking author names and paper titles that do not actually exist!'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Unit 2: Prompting Fundamentals',
    subtitle: 'Clarity, Context, Examples & Iteration',
    description: 'Learn the core anatomy of a winning prompt. Discover how context, constraints, and examples turn average AI responses into brilliant results.',
    badgeTitle: 'Prompt Architect',
    badgeIcon: 'Terminal',
    color: 'from-cyan-600 via-blue-600 to-indigo-600',
    lessons: [
      {
        id: 'u2-l1',
        title: 'The 4 Pillars of Effective Prompts',
        description: 'Task, Context, Exemplars, and Constraints.',
        durationMinutes: 4,
        xpReward: 25,
        gemReward: 15,
        questions: [
          {
            id: 'u2-q1',
            type: 'multiple_choice',
            prompt: 'Which of the following is considered a weak prompt?',
            options: [
              'Write an email to a client explaining a 2-day project delay gently',
              'Write me a email',
              'Draft a friendly 3-paragraph email to customer John about order #1042 being delayed by weather.',
              'Act as a customer manager. Draft a polite delay notification email under 150 words.'
            ],
            correctAnswer: 1,
            explanation: '"Write me a email" lacks context, audience, tone, and goal. The AI has to guess everything.',
            tip: 'The more specificity you give the AI, the less it has to guess.'
          },
          {
            id: 'u2-q2',
            type: 'drag_rank',
            prompt: 'Order the elements of a high-performing prompt from START to END:',
            options: [
              '1. Role / Persona ("Act as a senior marketing strategist")',
              '2. Core Task ("Draft 3 catchphrases for a green tea brand")',
              '3. Context & Target Audience ("Targeting busy urban professionals")',
              '4. Format Constraints ("Keep each under 6 words, output as a bulleted list")'
            ],
            correctAnswer: [
              '1. Role / Persona ("Act as a senior marketing strategist")',
              '2. Core Task ("Draft 3 catchphrases for a green tea brand")',
              '3. Context & Target Audience ("Targeting busy urban professionals")',
              '4. Format Constraints ("Keep each under 6 words, output as a bulleted list")'
            ],
            explanation: 'Starting with persona frames the model, followed by the main objective, key background context, and finally output formatting rules.'
          },
          {
            id: 'u2-q3',
            type: 'rewrite_prompt',
            prompt: 'How would you improve the prompt: "Make a lesson plan for math"?',
            options: [
              'Add: "Make it really good and fun"',
              'Add: "For 5th grade fractions, 45-minute class, with an interactive group activity and 3 quiz questions"'
            ],
            correctAnswer: 1,
            explanation: 'Adding grade level, duration, activity style, and desired components turns a generic prompt into an actionable curriculum tool.'
          }
        ]
      },
      {
        id: 'u2-l2',
        title: 'Few-Shot Prompting (Giving Examples)',
        description: 'Show, don\'t just tell, the AI what you want.',
        durationMinutes: 4,
        xpReward: 30,
        gemReward: 15,
        questions: [
          {
            id: 'u2-2q1',
            type: 'multiple_choice',
            prompt: 'What is "Few-Shot Prompting"?',
            options: [
              'Giving the model only a few seconds to respond',
              'Providing 1 to 3 input-output examples in your prompt before asking the actual question',
              'Asking the model 5 unrelated questions in a row',
              'Limiting the AI output to a few bullet points'
            ],
            correctAnswer: 1,
            explanation: 'Few-shot prompting provides concrete examples of expected input/output patterns, guiding the model on formatting, tone, and logic.'
          },
          {
            id: 'u2-2q2',
            type: 'fill_blank',
            prompt: 'When you provide zero examples in a prompt, it is called ____-shot prompting.',
            blankPrefix: 'Asking an AI to complete a task without prior examples is known as ',
            blankSuffix: ' prompting.',
            options: ['Zero', 'One', 'Single', 'Direct'],
            correctAnswer: 'Zero',
            explanation: 'Zero-shot prompting relies solely on the instruction without pre-formatted input/output pairs.'
          },
          {
            id: 'u2-2q3',
            type: 'spot_mistake',
            prompt: 'Spot the main benefit of Few-Shot Prompting over Zero-Shot:',
            options: [
              'It forces the model to run 10x faster',
              'It dramatically increases output format consistency and precision',
              'It eliminates the need for an API key',
              'It bypasses context window limits'
            ],
            correctAnswer: 1,
            explanation: 'Providing examples gives the model an exact structural pattern to follow, reducing formatting errors significantly.'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Unit 3: Advanced Prompting',
    subtitle: 'Chain-of-Thought, Personas, System Prompts',
    description: 'Master step-by-step reasoning prompts, role-play personas, system vs user instructions, and techniques to eliminate unwanted output.',
    badgeTitle: 'Chain-of-Thought Explorer',
    badgeIcon: 'Sparkles',
    color: 'from-violet-600 via-purple-600 to-fuchsia-600',
    lessons: [
      {
        id: 'u3-l1',
        title: 'Chain-of-Thought (CoT) Reasoning',
        description: 'Force AI to think step-by-step before answering.',
        durationMinutes: 5,
        xpReward: 35,
        gemReward: 20,
        questions: [
          {
            id: 'u3-1q1',
            type: 'multiple_choice',
            prompt: 'What simple phrase dramatically improves AI performance on complex math and logic puzzles?',
            options: [
              '"Answer as quickly as possible"',
              '"Think step-by-step before providing your final answer"',
              '"Be super creative and funny"',
              '"Do not explain your reasoning"'
            ],
            correctAnswer: 1,
            explanation: 'Prompting "Think step-by-step" triggers Chain-of-Thought (CoT). It lets the model generate intermediate reasoning tokens before reaching the final conclusion.',
            tip: 'CoT prevents the AI from jumping to an incorrect statistical guess.'
          },
          {
            id: 'u3-1q2',
            type: 'true_false',
            prompt: 'True or False: LLMs can correct their own mistakes mid-sentence if forced to write out their reasoning steps line by line.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'Yes! Because auto-regressive models see their own preceding reasoning text, writing out steps allows them to stay logically grounded.'
          },
          {
            id: 'u3-1q3',
            type: 'spot_mistake',
            prompt: 'Which task benefits MOST from Chain-of-Thought prompting?',
            options: [
              'Translating "Hello" into French',
              'Solving a multi-step financial word problem with taxes and discounts',
              'Generating a list of random color names',
              'Formatting a name as Last, First'
            ],
            correctAnswer: 1,
            explanation: 'Multi-step logic, math, and conditional reasoning benefit massively from explicit chain-of-thought steps.'
          }
        ]
      },
      {
        id: 'u3-l2',
        title: 'System Prompts vs User Prompts',
        description: 'Understand the hierarchy of AI instruction layers.',
        durationMinutes: 4,
        xpReward: 30,
        gemReward: 15,
        questions: [
          {
            id: 'u3-2q1',
            type: 'multiple_choice',
            prompt: 'What is the primary role of a System Prompt in AI applications?',
            options: [
              'To store user login passwords',
              'To establish global behavior, tone, safety boundaries, and capabilities for the entire chat session',
              'To speed up internet connectivity',
              'To render HTML graphics'
            ],
            correctAnswer: 1,
            explanation: 'System prompts set the foundational rules and persona of the AI assistant, taking precedence over individual user messages.'
          },
          {
            id: 'u3-2q2',
            type: 'fill_blank',
            prompt: 'In a chat interface, the message sent directly by the human user is the _____ prompt.',
            blankPrefix: 'While developer rules go in the system prompt, user questions are sent as ',
            blankSuffix: ' prompts.',
            options: ['User', 'Client', 'Input', 'Query'],
            correctAnswer: 'User',
            explanation: 'User prompts contain the dynamic turn-by-turn input from the end user.'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Unit 4: Spotting AI Mistakes',
    subtitle: 'Hallucinations, Confident Falsehoods & Fact-Checking',
    description: 'Develop an expert radar for AI errors, fake legal citations, invented statistics, and subtle bias.',
    badgeTitle: 'Hallucination Hunter',
    badgeIcon: 'ShieldCheck',
    color: 'from-amber-600 via-orange-600 to-red-600',
    lessons: [
      {
        id: 'u4-l1',
        title: 'The Mechanics of Fake Citations',
        description: 'Why AI invents real-sounding books, paper titles, and authors.',
        durationMinutes: 4,
        xpReward: 30,
        gemReward: 15,
        questions: [
          {
            id: 'u4-q1',
            type: 'multiple_choice',
            prompt: 'Why does an LLM produce convincing fake academic citations?',
            options: [
              'It deliberate tries to trick the user',
              'It combines common author names, realistic journal titles, and plausible publication years statistically',
              'It reads broken links from Wikipedia',
              'It is searching private databases'
            ],
            correctAnswer: 1,
            explanation: 'The model recognizes what a valid academic citation looks like structurally, so it generates statistically believable text strings without verifying existence.'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Unit 5: Bias & Ethics',
    subtitle: 'Training Data Bias, Privacy & Responsible AI',
    description: 'Examine how historical human biases infiltrate training datasets, data privacy risks, and ethical guidelines.',
    badgeTitle: 'Ethics Guardian',
    badgeIcon: 'Scale',
    color: 'from-emerald-600 via-teal-600 to-cyan-600',
    lessons: [
      {
        id: 'u5-l1',
        title: 'Understanding Algorithmic Bias',
        description: 'How training data shapes AI assumptions.',
        durationMinutes: 4,
        xpReward: 30,
        gemReward: 15,
        questions: [
          {
            id: 'u5-q1',
            type: 'true_false',
            prompt: 'True or False: If an AI model is objective, it cannot display cultural or gender bias.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'AI models reflect the training data scraped from internet text, inheriting historical human biases and stereotypes.'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Unit 6: AI at Work',
    subtitle: 'Writing, Analysis, Emails & Coding',
    description: 'Transform daily productivity with AI workflows for email drafting, document analysis, spreadsheet formulas, and code debugging.',
    badgeTitle: 'Workplace Navigator',
    badgeIcon: 'Briefcase',
    color: 'from-sky-600 via-blue-600 to-indigo-600',
    lessons: [
      {
        id: 'u6-l1',
        title: 'Executive Email & Doc Summaries',
        description: 'Streamline communication using structured prompts.',
        durationMinutes: 4,
        xpReward: 30,
        gemReward: 15,
        questions: [
          {
            id: 'u6-q1',
            type: 'multiple_choice',
            prompt: 'What is the best prompt technique for summarizing a long 10-page document for executive leadership?',
            options: [
              '"Summarize this"',
              '"Extract 3 key decisions, 2 action items with owners, and a 50-word TL;DR executive summary in bullet points"',
              '"Rewrite this document in French"',
              '"Make this document sound more formal"'
            ],
            correctAnswer: 1,
            explanation: 'Specifying precise structural outputs (decisions, action items, TL;DR) yields executive-ready actionable summaries.'
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Unit 7: AI Tools Landscape',
    subtitle: 'Chatbots vs Image Gen vs Agents vs Copilots',
    description: 'Map out the ecosystem: when to use standard chat, multimodality, code copilots, or specialized design tools.',
    badgeTitle: 'Ecosystem Specialist',
    badgeIcon: 'Compass',
    color: 'from-fuchsia-600 via-pink-600 to-rose-600',
    lessons: [
      {
        id: 'u7-l1',
        title: 'Choosing the Right Tool for the Job',
        description: 'Navigating LLMs, Diffusion models, and Copilots.',
        durationMinutes: 4,
        xpReward: 30,
        gemReward: 15,
        questions: [
          {
            id: 'u7-q1',
            type: 'multiple_choice',
            prompt: 'Which type of AI architecture powers tools like Midjourney and Gemini Image generation?',
            options: [
              'Diffusion and Transformer multimodal models',
              'Standard relational SQL databases',
              'Symbolic rule engines',
              'Audio synthesis vocoders'
            ],
            correctAnswer: 0,
            explanation: 'Modern image generation uses diffusion/multimodal models trained to map text prompts into high-resolution visual pixels.'
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: 'Unit 8: Agents & Automation',
    subtitle: 'Tool Use, Planning & Multi-step Execution',
    description: 'Learn how AI Agents move beyond simple answers to execute multi-step tasks, call APIs, search the web, and run code.',
    badgeTitle: 'Agent Orchestrator',
    badgeIcon: 'Bot',
    color: 'from-indigo-600 via-purple-600 to-violet-700',
    lessons: [
      {
        id: 'u8-l1',
        title: 'What Makes an AI "Agent"?',
        description: 'Perception, tool execution, and goal-driven loops.',
        durationMinutes: 4,
        xpReward: 35,
        gemReward: 20,
        questions: [
          {
            id: 'u8-q1',
            type: 'multiple_choice',
            prompt: 'What distinguishes an AI Agent from a standard Chatbot?',
            options: [
              'An agent can autonomously take actions, call tools/APIs, and execute multi-step plans to achieve a goal',
              'An agent uses more colorful emojis in chat',
              'An agent runs without electricity',
              'An agent can only speak one language'
            ],
            correctAnswer: 0,
            explanation: 'Agents combine reasoning with tool access (web search, code execution, database queries) to complete multi-step objectives.'
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: 'Unit 9: Building Your Own',
    subtitle: 'No-Code AI Apps & System Prompt Architecture',
    description: 'Put it all together! Build custom micro-AI apps, system prompt tools, and design workflows to automate your life.',
    badgeTitle: 'System Creator',
    badgeIcon: 'Layers',
    color: 'from-blue-600 via-violet-600 to-fuchsia-600',
    lessons: [
      {
        id: 'u9-l1',
        title: 'Designing Custom System Instructions',
        description: 'Architecting standalone AI assistants.',
        durationMinutes: 5,
        xpReward: 40,
        gemReward: 25,
        questions: [
          {
            id: 'u9-q1',
            type: 'multiple_choice',
            prompt: 'When building a custom AI assistant, what should you include in its system instruction?',
            options: [
              'Role definition, tone guidelines, knowledge constraints, output format rules, and fallback behavior',
              'Just a polite greeting',
              'Your home address and personal phone number',
              'A copy of the entire internet'
            ],
            correctAnswer: 0,
            explanation: 'A strong system prompt defines clear guardrails, role boundaries, response formatting, and instructions on how to handle edge cases.'
          }
        ]
      }
    ]
  }
];
