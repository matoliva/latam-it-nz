import type { CollectionConfig } from 'payload';

export const JobPositions: CollectionConfig = {
  slug: 'job-positions',
  admin: {
    useAsTitle: 'title',
    description: 'Manage open job positions.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'modality',
      type: 'select',
      options: [
        { label: 'Onsite', value: 'onsite' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'Remote', value: 'remote' },
      ],
    },
    {
      name: 'isSponsorAvailable',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'technology',
          type: 'text',
        },
      ],
    },
    {
      name: 'companyImageUrl',
      type: 'text',
      admin: {
        description: 'URL of the company image/logo',
      },
    },
    {
      name: 'companyName',
      type: 'text',
    },
    {
      name: 'jobPostUrl',
      type: 'text',
      admin: {
        description: 'URL to the job post',
      },
    },
    {
      name: 'salary',
      type: 'text',
      admin: {
        description: 'e.g., $100,000 - $120,000',
      },
    },
    {
      name: 'jobType',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contractor', value: 'contractor' },
      ],
    },
    {
      name: 'seniorityLevel',
      type: 'select',
      options: [
        { label: 'Junior', value: 'junior' },
        { label: 'Mid', value: 'mid' },
        { label: 'Senior', value: 'senior' },
        { label: 'Lead', value: 'lead' },
      ],
    },
    {
      name: 'reviews',
      type: 'number',
      min: 1,
      max: 5,
    },
    {
      name: 'referral',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        },
      ],
      admin: {
        description: 'Optional referral information',
      },
    },
  ],
}; 