import type { CollectionConfig } from 'payload';

export const JobPositions: CollectionConfig = {
  slug: 'job-positions',
  admin: {
    useAsTitle: 'jobTitle',
    description: 'Manage open job positions.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'jobPortal',
      type: 'text',
    },
    {
      name: 'sponsor',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'jobImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
    },
    {
      name: 'jobType',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Internship', value: 'internship' },
      ],
    },
    {
      name: 'experienceLevel',
      type: 'select',
      options: [
        { label: 'Entry-level', value: 'entry-level' },
        { label: 'Mid-level', value: 'mid-level' },
        { label: 'Senior', value: 'senior' },
        { label: 'Director', value: 'director' },
      ],
    },
    {
      name: 'salaryRange',
      type: 'text',
      admin: {
        description: 'e.g., $50,000 - $70,000 USD',
      },
    },
    {
      name: 'responsibilities',
      type: 'richText',
    },
    {
      name: 'qualifications',
      type: 'richText',
    },
    {
      name: 'benefits',
      type: 'richText',
    },
    {
      name: 'locationType',
      type: 'select',
      options: [
        { label: 'On-site', value: 'on-site' },
        { label: 'Remote', value: 'remote' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'stateProvince',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'timezone',
      type: 'text',
      admin: {
        condition: (_: unknown, siblingData: { locationType?: string }) => siblingData.locationType === 'remote',
        description: 'e.g., America/New_York',
      },
    },
    {
      name: 'applicationUrl',
      type: 'text',
      label: 'Application URL',
    },
    {
      name: 'applicationEmail',
      type: 'email',
      label: 'Application Email',
    },
    {
      name: 'applicationDeadline',
      type: 'date',
    },
    {
      name: 'companyDescription',
      type: 'richText',
    },
    {
      name: 'companyWebsite',
      type: 'text',
      label: 'Company Website',
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [({ data }) => {
  const jobTitle = data?.jobTitle;
  return typeof jobTitle === 'string'
    ? jobTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    : '';
}],
      },
    },
    {
      name: 'seoTitle',
      type: 'text',
      label: 'SEO Title',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      label: 'SEO Description',
    },
  ],
}; 