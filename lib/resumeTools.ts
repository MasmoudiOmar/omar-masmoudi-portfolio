import { RESUME } from '../constants';

/**
 * The tools the resume agent can call.
 *
 * Kept separate from the Pages Function so the dispatch layer can be exercised
 * without a model in the loop — every executor is a pure function of RESUME.
 */

export interface ToolDeclaration {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, { type: string; description: string; enum?: string[] }>;
    required?: string[];
  };
}

export const toolDeclarations: ToolDeclaration[] = [
  {
    name: 'search_experience',
    description:
      "Search Omar's work history. Use the company filter for questions about a specific employer, or the query filter to find roles that involved a particular technology or kind of work.",
    parameters: {
      type: 'object',
      properties: {
        company: { type: 'string', description: 'Company name, e.g. "Solvizor", "AMI", "Mercor".' },
        query: {
          type: 'string',
          description: 'Free-text term to match against role titles and bullet points, e.g. "Redis", "frontend".',
        },
      },
    },
  },
  {
    name: 'get_skills',
    description:
      'List the technologies Omar works with, optionally narrowed to one category. Call this before claiming he does or does not know something.',
    parameters: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'One of the skill categories.',
          enum: RESUME.skills.map((group) => group.category),
        },
      },
    },
  },
  {
    name: 'get_projects',
    description:
      'Get the featured projects, including what each one does and whether a case study or live site is available.',
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'get_metrics',
    description:
      'Get the quantified outcomes from Omar\'s work — user counts, performance improvements, data volumes. Use this for "how much" or "what impact" questions.',
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'get_profile',
    description:
      'Get the high-level profile: current role, years of experience, location, education, and how to get in touch.',
    parameters: { type: 'object', properties: {} },
  },
];

/** Pulls figures like "5k+ users" or "95%" out of an experience bullet. */
const METRIC_PATTERN = /(\d[\d,.]*\s*(?:%|k\+|m\+|\+)?)/i;

const extractMetrics = () =>
  RESUME.experience.flatMap((role) =>
    role.points
      .filter((point) => /\d/.test(point) && METRIC_PATTERN.test(point))
      .map((point) => ({ company: role.company, period: role.period, achievement: point })),
  );

type ToolArgs = Record<string, unknown>;

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export const executeTool = (name: string, args: ToolArgs = {}): unknown => {
  switch (name) {
    case 'search_experience': {
      const company = asString(args.company).toLowerCase();
      const query = asString(args.query).toLowerCase();

      let roles = RESUME.experience;
      if (company) {
        roles = roles.filter((role) => role.company.toLowerCase().includes(company));
      }
      if (query) {
        roles = roles.filter(
          (role) =>
            role.role.toLowerCase().includes(query) ||
            role.points.some((point) => point.toLowerCase().includes(query)),
        );
      }

      return {
        matches: roles.length,
        roles: roles.map((role) => ({
          company: role.company,
          role: role.role,
          period: role.period,
          location: role.location,
          highlights: role.points,
        })),
      };
    }

    case 'get_skills': {
      const category = asString(args.category).toLowerCase();
      const groups = category
        ? RESUME.skills.filter((group) => group.category.toLowerCase() === category)
        : RESUME.skills;
      return { categories: groups };
    }

    case 'get_projects':
      return {
        projects: RESUME.projects.map((project) => ({
          name: project.name,
          description: project.description,
          liveUrl: project.link ?? null,
          caseStudy: project.showcase ? `#/${project.showcase.slug}` : null,
        })),
      };

    case 'get_metrics':
      return { achievements: extractMetrics() };

    case 'get_profile': {
      const [current] = RESUME.experience;
      return {
        name: RESUME.personal.name,
        title: RESUME.personal.title,
        currentRole: current ? `${current.role} at ${current.company} (${current.period})` : null,
        location: RESUME.personal.location,
        summary: RESUME.personal.summary,
        education: RESUME.education.map((entry) => ({
          school: entry.school,
          degree: entry.degree,
          period: entry.period,
        })),
        contact: {
          email: RESUME.personal.email,
          linkedin: RESUME.personal.linkedin,
          github: RESUME.personal.github,
        },
      };
    }

    default:
      return { error: `Unknown tool: ${name}` };
  }
};
