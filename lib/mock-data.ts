export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string; // YouTube video ID
  description: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  duration: string; // e.g. "12h 45m"
  modules: Module[];
  studentsCount: number;
  rating: number;
  color: string; // Tailwind border accent colors
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courseIds: string[];
  duration: string;
  coursesCount: number;
  level: string;
  color: string;
}

export interface UserProgress {
  courseId: string;
  completedLessons: string[]; // lessonIds
  progressPercentage: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  learningPathId: string;
  enrolledCourses: string[]; // courseIds
  progress: UserProgress[];
}

export interface Activity {
  id: string;
  username: string;
  action: string;
  target: string;
  time: string;
  type: 'commit' | 'lesson' | 'enroll' | 'project';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface UserSettings {
  displayName: string;
  bio: string;
  emailNotifications: boolean;
  courseUpdates: boolean;
  activityAlerts: boolean;
  newsletter: boolean;
  profileVisibility: boolean;
  showActivityStatus: boolean;
  fontSize: 'small' | 'medium' | 'large';
  theme: 'Dark' | 'Light' | 'System';
}

// ----------------------------------------------------
// Mock Data Core
// ----------------------------------------------------

export const mockLearningPaths: LearningPath[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Master modern responsive web interfaces with React, Next.js, Framer Motion, and Tailwind CSS.',
    courseIds: ['nextjs-masterclass', 'react-design-systems'],
    duration: '35 hours',
    coursesCount: 2,
    level: 'Beginner to Advanced',
    color: 'from-violet-500 to-indigo-500',
  },
  {
    id: 'backend',
    title: 'Backend Architecture',
    description: 'Build hyper-scalable distributed APIs, microservices, and databases in Go, gRPC, and PostgreSQL.',
    courseIds: ['go-grpc-backend', 'postgres-deep-dive'],
    duration: '42 hours',
    coursesCount: 2,
    level: 'Intermediate to Advanced',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Engineering',
    description: 'The end-to-end pathway. Connect React frontends to robust databases, serverless architectures, and GraphQL.',
    courseIds: ['nextjs-masterclass', 'go-grpc-backend'],
    duration: '68 hours',
    coursesCount: 2,
    level: 'Beginner to Advanced',
    color: 'from-rose-500 to-red-500',
  },
  {
    id: 'devops',
    title: 'Cloud Native DevOps',
    description: 'Learn containerization, CI/CD, Kubernetes cluster orchestration, and automated server infrastructure.',
    courseIds: ['docker-kubernetes-devops'],
    duration: '28 hours',
    coursesCount: 1,
    level: 'Intermediate to Advanced',
    color: 'from-amber-500 to-orange-500',
  },
];

export const mockCourses: Course[] = [
  {
    id: 'nextjs-masterclass',
    title: 'Next.js 15 Masterclass: Production Ready Apps',
    slug: 'nextjs-15-masterclass',
    description: 'Build enterprise-grade applications using React 19 Server Components, Server Actions, PPR, and next-gen layouts.',
    longDescription: 'Go from developer to software engineer by mastering the cutting edge of React and Next.js. We cover asynchronous server data boundaries, streaming Suspense layouts, dynamic route caching mechanism, and SEO optimizations. You will build a production-scale dashboard with a simulated payment gateway.',
    level: 'Intermediate',
    tags: ['React 19', 'Next.js', 'TypeScript', 'Tailwind'],
    duration: '15h 30m',
    studentsCount: 18450,
    rating: 4.9,
    color: 'border-violet-500/20 text-violet-400 shadow-violet-500/5',
    modules: [
      {
        id: 'nextjs-m1',
        title: 'Module 1: Next.js Foundation & Rendering Archetypes',
        lessons: [
          {
            id: 'nextjs-l1',
            title: 'Welcome & Next.js Architecture Deep Dive',
            duration: '12:34',
            videoUrl: 'dQw4w9WgXcQ', // Rickroll placeholder for test
            description: 'Overview of the course, what you will build, and a deep architectural look at how Next.js unifies client and server rendering.'
          },
          {
            id: 'nextjs-l2',
            title: 'Server vs Client Components: The Paradigm Shift',
            duration: '22:15',
            videoUrl: '91F8reC8kvo',
            description: 'Understand the boundary rules, when to use React Server Components, client-side hydration, and the serialized data transmission.'
          },
          {
            id: 'nextjs-l3',
            title: 'Dynamic Routing, Layouts, and Segment Configuration',
            duration: '18:40',
            videoUrl: 'VwzZ1xUvKxM',
            description: 'Master nested routing, route groups, layout composition, and how page metadata works.'
          }
        ]
      },
      {
        id: 'nextjs-m2',
        title: 'Module 2: Advanced Data Fetching & Server Actions',
        lessons: [
          {
            id: 'nextjs-l4',
            title: 'Async Page params & Streaming layouts',
            duration: '14:20',
            videoUrl: '3Y_E8tS-3uU',
            description: 'Learn why page params are asynchronous in modern Next.js and how to design beautiful skeleton states using React Suspense.'
          },
          {
            id: 'nextjs-l5',
            title: 'Data Mutations with React 19 Server Actions',
            duration: '25:10',
            videoUrl: 'dDpZ1W50yR8',
            description: 'Perform secure database updates directly from forms, handle state transitions with useActionState, and manage optimistic updates.'
          }
        ]
      }
    ]
  },
  {
    id: 'go-grpc-backend',
    title: 'Go & gRPC Backend Engineering: High Throughput Microservices',
    slug: 'go-grpc-backend',
    description: 'Design low-latency microservices with Golang, protocol buffers, gRPC streams, Redis caching, and PostgreSQL.',
    longDescription: 'Enter the world of high-concurrency systems. Learn Golang coroutines, channel patterns, protocol buffer compilation, and unary vs streaming RPCs. Implement robust logging, structured database migrations, Redis connection pooling, and connection rate limiters.',
    level: 'Advanced',
    tags: ['Go', 'gRPC', 'Protobuf', 'Redis', 'PostgreSQL'],
    duration: '22h 15m',
    studentsCount: 12100,
    rating: 4.85,
    color: 'border-emerald-500/20 text-emerald-400 shadow-emerald-500/5',
    modules: [
      {
        id: 'go-m1',
        title: 'Module 1: Go Concurrency & Protobuf Defs',
        lessons: [
          {
            id: 'go-l1',
            title: 'Designing Concurrency: Goroutines and Channels',
            duration: '20:15',
            videoUrl: 'qyMZaYn17cI',
            description: 'Master the CSP concurrency model, prevent goroutine leaks, and manage worker pools efficiently.'
          },
          {
            id: 'go-l2',
            title: 'Protocol Buffers: Defining the Schema Contracts',
            duration: '15:45',
            videoUrl: '46O73M1DH88',
            description: 'Write custom message descriptors, use sub-messages, enums, and compile protobuf files into Go structures.'
          }
        ]
      },
      {
        id: 'go-m2',
        title: 'Module 2: Building and Testing the gRPC Server',
        lessons: [
          {
            id: 'go-l3',
            title: 'Implementing Unary RPC Handlers in Go',
            duration: '18:50',
            videoUrl: 'qFp_3h4e6v8',
            description: 'Set up the gRPC listener, bind handlers, manage context timeouts, and implement structured error mappings.'
          },
          {
            id: 'go-l4',
            title: 'Bidirectional Streaming & Microservices Communication',
            duration: '28:30',
            videoUrl: 'Z3y8k2Uv1w8',
            description: 'Build real-time chat/notification streams using bidirectional gRPC channels and manage stream lifecycle safely.'
          }
        ]
      }
    ]
  },
  {
    id: 'docker-kubernetes-devops',
    title: 'Cloud Native DevOps: Docker, Kubernetes & CI/CD Pipelines',
    slug: 'docker-kubernetes-devops',
    description: 'Architect auto-scaling container configurations, secure Helm charts, and custom GitHub Action workflows.',
    longDescription: 'Bridge the gap between code and infrastructure. Package complex web apps, construct multi-stage Docker builds, and orchestrate containerized platforms on local Kubernetes (Minikube/Kind) or cloud services. Master load balancers, ingress controllers, persistent volumes, and automated rollout configurations.',
    level: 'Advanced',
    tags: ['Docker', 'Kubernetes', 'Helm', 'CI/CD', 'GitHub Actions'],
    duration: '18h 40m',
    studentsCount: 9400,
    rating: 4.78,
    color: 'border-amber-500/20 text-amber-400 shadow-amber-500/5',
    modules: [
      {
        id: 'devops-m1',
        title: 'Module 1: Docker Containerization Best Practices',
        lessons: [
          {
            id: 'devops-l1',
            title: 'Multi-stage Dockerfiles: Minimizing Image Size',
            duration: '18:10',
            videoUrl: 'gAkwW2tuIqE',
            description: 'Write optimized Dockerfiles, utilize Alpine and distroless baselines, and manage build context caches.'
          },
          {
            id: 'devops-l2',
            title: 'Docker Compose for Multi-container Local Environments',
            duration: '14:50',
            videoUrl: 'hP77Rua1E0c',
            description: 'Link frontend, backend, database, and Redis instances. Configure volumes, environment variables, and healthchecks.'
          }
        ]
      },
      {
        id: 'devops-m2',
        title: 'Module 2: Kubernetes Orchestration & Ingress Controls',
        lessons: [
          {
            id: 'devops-l3',
            title: 'Pods, Deployments, and Service Architecture',
            duration: '25:20',
            videoUrl: 'X48VuDVv0do',
            description: 'Declare YAML manifests, manage replica counts, perform zero-downtime rolling updates, and expose services internally.'
          },
          {
            id: 'devops-l4',
            title: 'Ingress Controllers, SSL/TLS termination, and Helm',
            duration: '22:15',
            videoUrl: 'fy88N-xCo0c',
            description: 'Deploy Nginx Ingress, map virtual host routing, configure TLS certificates, and package configurations into Helm charts.'
          }
        ]
      }
    ]
  },
  {
    id: 'react-design-systems',
    title: 'React 19 & Tailwind: Building Design Systems from Scratch',
    slug: 'react-design-systems',
    description: 'Learn modern UI component design using Radix primitives, styling tokens, Framer Motion transitions, and accessibility standards.',
    longDescription: 'Design and deploy a customizable UI design system. We dive deep into ARIA accessibility compliance, keyboard focus states, polymorphic React elements, CSS variables layout control, and custom NPM deployment of UI kits.',
    level: 'Beginner',
    tags: ['React 19', 'Tailwind CSS', 'Radix UI', 'Framer Motion'],
    duration: '12h 10m',
    studentsCount: 14200,
    rating: 4.88,
    color: 'border-rose-500/20 text-rose-400 shadow-rose-500/5',
    modules: [
      {
        id: 'design-m1',
        title: 'Module 1: Tokens, Theme & Radix Primitives',
        lessons: [
          {
            id: 'design-l1',
            title: 'Design Tokens & CSS Custom Property Sync',
            duration: '15:20',
            videoUrl: '5tYkK4N1eCo',
            description: 'Define semantic colors, typography configurations, borders, and spacing tokens in Tailwind CSS.'
          },
          {
            id: 'design-l2',
            title: 'Unstyled Radix Primitives: Creating Accessible Buttons & Modals',
            duration: '19:45',
            videoUrl: 'sL2J-A4G28Q',
            description: 'Wrap Radix dialogs and popovers. Inject custom Tailwind styling while retaining native keyboard controls and screen reader attributes.'
          }
        ]
      }
    ]
  }
];

export const mockUser: User = {
  name: 'Alex Rivera',
  email: 'alex.rivera@omnikon.dev',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80',
  learningPathId: 'frontend',
  enrolledCourses: ['nextjs-masterclass', 'react-design-systems'],
  progress: [
    {
      courseId: 'nextjs-masterclass',
      completedLessons: ['nextjs-l1', 'nextjs-l2'],
      progressPercentage: 40,
    },
    {
      courseId: 'react-design-systems',
      completedLessons: ['design-l1'],
      progressPercentage: 50,
    }
  ]
};

export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    username: 'mittalsonal',
    action: 'commented on "accessibility: add semantic section headings to RightSidebar telemetry inspector"',
    target: 'Astrodex',
    time: '2h ago',
    type: 'commit',
  },
  {
    id: 'act-2',
    username: 'alex_rivera',
    action: 'completed lesson "Server vs Client Components: The Paradigm Shift"',
    target: 'Next.js 15 Masterclass',
    time: '3h ago',
    type: 'lesson',
  },
  {
    id: 'act-3',
    username: 'mergify[bot]',
    action: 'merged pull request "fix: add semantic headings to right sidebar"',
    target: 'Astrodex',
    time: '3h ago',
    type: 'commit',
  },
  {
    id: 'act-4',
    username: 'kunal_dev',
    action: 'enrolled in course',
    target: 'Go & gRPC Backend Engineering',
    time: '5h ago',
    type: 'enroll',
  },
  {
    id: 'act-5',
    username: 'github-actions[bot]',
    action: 'passed workflow verification check in',
    target: 'IssueSwipe CI/CD',
    time: '6h ago',
    type: 'project',
  },
  {
    id: 'act-6',
    username: 'nathan_k',
    action: 'submitted project "Terminal-based micro-DB"',
    target: 'Go Backend Cohort',
    time: '8h ago',
    type: 'project',
  },
  {
    id: 'act-7',
    username: 'mittalsonal',
    action: 'opened pull request "feat: setup Redis caching container deployment"',
    target: 'Astrodex',
    time: '12h ago',
    type: 'commit',
  }
];

// ----------------------------------------------------
// Utility Functions
// ----------------------------------------------------

export function getCourseAndLessonByLessonId(lessonId: string): {
  course: Course;
  module: Module;
  lesson: Lesson;
} | null {
  for (const course of mockCourses) {
    for (const module of course.modules) {
      const lesson = module.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return { course, module, lesson };
      }
    }
  }
  return null;
}

export function getCourseById(courseId: string): Course | undefined {
  return mockCourses.find((c) => c.id === courseId);
}

export function getLearningPathById(pathId: string): LearningPath | undefined {
  return mockLearningPaths.find((p) => p.id === pathId);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return mockBlogPosts.find((p) => p.slug === slug);
}

// ----------------------------------------------------
// Mock Blog Posts
// ----------------------------------------------------

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Understanding React 19 Server Components',
    slug: 'react-19-server-components',
    excerpt: 'A deep dive into how Server Components change the way we build modern web applications.',
    content: `React 19 Server Components represent a fundamental shift in how we think about rendering. Unlike traditional client-side React, Server Components execute on the server, reducing bundle size and improving initial load performance.

## Key Benefits

1. **Reduced Bundle Size** - Components don't ship JavaScript to the client
2. **Direct Database Access** - Fetch data without API layers
3. **Automatic Code Splitting** - Only client components load on the browser

## Getting Started

To use Server Components in Next.js, simply create components in the \`app\` directory without the \`"use client"\` directive. By default, all components in the App Router are Server Components.

\`\`\`tsx
// This is a Server Component
async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findById(userId);
  return <div>{user.name}</div>;
}
\`\`\`

## When to Use Client Components

Use \`"use client"\` only when you need:
- Event handlers
- Browser APIs
- React hooks (useState, useEffect)
- Third-party libraries that use client features

Server Components are the future of React development, enabling better performance and simpler data fetching patterns.`,
    author: 'Alex Rivera',
    authorRole: 'Senior Frontend Engineer',
    publishedAt: '2026-01-15',
    readTime: '8 min read',
    tags: ['React', 'Next.js', 'Server Components'],
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Building Scalable Microservices with Go and gRPC',
    slug: 'go-grpc-microservices',
    excerpt: 'Learn how to design high-performance distributed systems using Go and gRPC protocol buffers.',
    content: `Go's concurrency model and gRPC's efficient serialization make them perfect for building scalable microservices. In this guide, we'll explore the core patterns.

## Why Go + gRPC?

- **Performance**: gRPC uses Protocol Buffers, which are 3-10x faster than JSON
- **Type Safety**: Compile-time checks prevent runtime errors
- **Bidirectional Streaming**: Real-time communication between services
- **Go Concurrency**: Goroutines handle thousands of simultaneous connections

## Setting Up Your First Service

\`\`\`go
package main

import (
    "google.golang.org/grpc"
    "context"
)

func main() {
    lis, _ := net.Listen("tcp", ":50051")
    s := grpc.NewServer()
    pb.RegisterUserServiceServer(s, &server{})
    s.Serve(lis)
}
\`\`\`

## Best Practices

1. Design your proto files first
2. Use interceptors for cross-cutting concerns
3. Implement proper error handling with status codes
4. Monitor with distributed tracing

The combination of Go and gRPC provides a robust foundation for microservices architecture.`,
    author: 'Sonal Mittal',
    authorRole: 'Backend Architect',
    publishedAt: '2026-01-10',
    readTime: '12 min read',
    tags: ['Go', 'gRPC', 'Microservices'],
    featured: false
  },
  {
    id: 'blog-3',
    title: 'Docker Best Practices for Production Deployments',
    slug: 'docker-production-best-practices',
    excerpt: 'Optimize your Docker images for security, size, and performance in production environments.',
    content: `Running Docker in production requires more than just creating a Dockerfile. Here are the essential practices every team should follow.

## Multi-Stage Builds

Reduce image size dramatically by separating build and runtime stages:

\`\`\`dockerfile
# Build stage
FROM golang:1.22 AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o server

# Runtime stage
FROM alpine:3.19
COPY --from=builder /app/server /server
CMD ["/server"]
\`\`\`

## Security Essentials

1. **Don't run as root** - Create non-root users
2. **Scan images** - Use tools like Trivy or Snyk
3. **Pin versions** - Avoid \`latest\` tags
4. **Use .dockerignore** - Prevent sensitive files from being copied

## Image Optimization

- Use Alpine or Distroless base images
- Minimize layers by combining RUN commands
- Leverage build caching effectively
- Remove unnecessary files and dependencies

## Production Checklist

- [ ] Health checks configured
- [ ] Resource limits set
- [ ] Logging to stdout/stderr
- [ ] Secrets managed externally
- [ ] Graceful shutdown handling

Following these practices ensures your containers are production-ready.`,
    author: 'Kunal Dev',
    authorRole: 'DevOps Engineer',
    publishedAt: '2026-01-05',
    readTime: '10 min read',
    tags: ['Docker', 'DevOps', 'Containers'],
    featured: false
  },
  {
    id: 'blog-4',
    title: 'Kubernetes Deployment Strategies Explained',
    slug: 'kubernetes-deployment-strategies',
    excerpt: 'Master zero-downtime deployments with rolling updates, blue-green, and canary strategies.',
    content: `Deploying to Kubernetes requires careful planning to ensure high availability. Let's explore the main deployment strategies.

## Rolling Updates (Default)

Kubernetes gradually replaces old pods with new ones:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
spec:
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
\`\`\`

## Blue-Green Deployment

Maintain two identical environments and switch traffic instantly:

- **Blue**: Current production version
- **Green**: New version being deployed
- **Switch**: Update service selector to point to green

## Canary Deployment

Gradually route a percentage of traffic to the new version:

1. Deploy new version alongside old
2. Route 5% traffic to new version
3. Monitor metrics
4. Gradually increase to 100%

## Choosing a Strategy

| Strategy | Downtime | Rollback | Resource Cost |
|----------|----------|----------|---------------|
| Rolling | None | Slower | Low |
| Blue-Green | None | Instant | High |
| Canary | None | Instant | Medium |

For most applications, rolling updates provide the best balance of simplicity and reliability.`,
    author: 'Nathan Kim',
    authorRole: 'Platform Engineer',
    publishedAt: '2024-12-28',
    readTime: '9 min read',
    tags: ['Kubernetes', 'DevOps', 'Deployment'],
    featured: false
  },
  {
    id: 'blog-5',
    title: 'Transitioning from Bootcamp to Senior Engineer',
    slug: 'bootcamp-to-senior-engineer',
    excerpt: 'Practical advice for accelerating your career growth in software engineering.',
    content: `Moving from junior to senior engineer isn't just about technical skills. Here's what separates successful transitions.

## Technical Growth

1. **Read production code** - Study how successful companies architect systems
2. **Write tests first** - TDD forces you to think about edge cases
3. **Learn system design** - Architecture decisions impact entire teams
4. **Contribute to open source** - Real-world code review experience

## Soft Skills Matter

- **Communication**: Explain technical concepts to non-technical stakeholders
- **Mentorship**: Teaching others accelerates your own learning
- **Ownership**: Take responsibility for outcomes, not just tasks
- **Collaboration**: The best engineers make their teams better

## Building Your Reputation

1. Document your work clearly
2. Share knowledge through blogs and talks
3. Help others in code reviews
4. Take on challenging projects

## Common Mistakes to Avoid

- Optimizing too early
- Over-engineering solutions
- Not asking for feedback
- Ignoring business requirements

The path to senior engineer is a marathon, not a sprint. Focus on consistent growth and helping your team succeed.`,
    author: 'Alex Rivera',
    authorRole: 'Senior Frontend Engineer',
    publishedAt: '2024-12-20',
    readTime: '7 min read',
    tags: ['Career', 'Engineering', 'Growth'],
    featured: true
  },
  {
    id: 'blog-6',
    title: 'Getting Started with Open Source Contributions',
    slug: 'open-source-contributions-guide',
    excerpt: 'A practical guide to making your first open source contribution and building your GitHub profile.',
    content: `Contributing to open source can seem intimidating, but it's one of the best ways to grow as a developer.

## Finding Your First Project

1. **Start with documentation** - Fix typos, improve READMEs
2. **Look for "good first issue" labels** - Maintainers mark beginner-friendly issues
3. **Choose technologies you know** - Reduce friction in your first contribution
4. **Read contributing guidelines** - Every project has different expectations

## Making Your First PR

\`\`\`bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOU/REPO.git

# Create a branch
git checkout -b fix/typo-in-readme

# Make your changes
# Commit with a clear message
git commit -m "Fix typo in README installation section"

# Push and create PR
git push origin fix/typo-in-readme
\`\`\`

## Building Relationships

- Be respectful and patient
- Ask questions when unsure
- Respond to feedback graciously
- Thank maintainers for their time

## Beyond Code Contributions

- Help with documentation
- Review other people's PRs
- Triage issues
- Improve test coverage

Open source is about community. Your contributions, no matter how small, are valued.`,
    author: 'Sonal Mittal',
    authorRole: 'Backend Architect',
    publishedAt: '2024-12-15',
    readTime: '6 min read',
    tags: ['Open Source', 'GitHub', 'Community'],
    featured: false
  }
];

// ----------------------------------------------------
// Mock Team Members
// ----------------------------------------------------

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Arjun Patel',
    role: 'Founder & CEO',
    bio: 'Former staff engineer at major tech companies. Passionate about democratizing developer education and building open-source communities.',
    avatar: '',
    social: {
      github: 'https://github.com/arjunpatel',
      twitter: 'https://twitter.com/arjunpatel',
      linkedin: 'https://linkedin.com/in/arjunpatel'
    }
  },
  {
    id: 'team-2',
    name: 'Alex Rivera',
    role: 'Head of Curriculum',
    bio: 'Senior frontend engineer with expertise in React and Next.js. Designed the frontend development learning paths at Omnikon.',
    avatar: '',
    social: {
      github: 'https://github.com/alexrivera',
      twitter: 'https://twitter.com/alexrivera'
    }
  },
  {
    id: 'team-3',
    name: 'Sonal Mittal',
    role: 'Backend Lead',
    bio: 'Backend architect specializing in Go and distributed systems. Builds the infrastructure powering Omnikon Academy.',
    avatar: '',
    social: {
      github: 'https://github.com/sonalmittal',
      linkedin: 'https://linkedin.com/in/sonalmittal'
    }
  },
  {
    id: 'team-4',
    name: 'Kunal Dev',
    role: 'DevOps Engineer',
    bio: 'Cloud native enthusiast with deep Kubernetes expertise. Manages deployment pipelines and infrastructure automation.',
    avatar: '',
    social: {
      github: 'https://github.com/kunaldev',
      twitter: 'https://twitter.com/kunaldev'
    }
  },
  {
    id: 'team-5',
    name: 'Nathan Kim',
    role: 'Platform Engineer',
    bio: 'Full-stack developer focused on developer experience. Created the interactive playground and course player.',
    avatar: '',
    social: {
      github: 'https://github.com/nathankim',
      linkedin: 'https://linkedin.com/in/nathankim'
    }
  },
  {
    id: 'team-6',
    name: 'Priya Sharma',
    role: 'Community Manager',
    bio: 'Builds and nurtures the Omnikon developer community. Organizes hackathons and manages student success programs.',
    avatar: '',
    social: {
      twitter: 'https://twitter.com/priyasharma',
      linkedin: 'https://linkedin.com/in/priyasharma'
    }
  }
];

// ----------------------------------------------------
// Mock User Settings
// ----------------------------------------------------

export const mockUserSettings: UserSettings = {
  displayName: 'Alex Rivera',
  bio: 'Full-stack developer passionate about React and Go. Learning system design and distributed systems.',
  emailNotifications: true,
  courseUpdates: true,
  activityAlerts: false,
  newsletter: true,
  profileVisibility: true,
  showActivityStatus: true,
  fontSize: 'medium',
  theme: 'Dark'
};
