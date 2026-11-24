import type { HostBrand } from './types.ts';

export type FieldErrors = Record<string, string>;

export class CommunityHttpError extends Error {
  status: number;
  fields?: FieldErrors;

  constructor(status: number, message: string, fields?: FieldErrors) {
    super(message);
    this.name = 'CommunityHttpError';
    this.status = status;
    this.fields = fields;
  }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function asRecord(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new CommunityHttpError(400, 'Invalid submission.', { form: 'Invalid submission.' });
  }
  return input as Record<string, unknown>;
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function optionalText(
  value: unknown,
  max: number,
  field: string,
  errors: FieldErrors,
): string | null {
  if (value == null || value === '') return null;
  const cleaned = text(value);
  if (!cleaned) return null;
  if (cleaned.length > max) errors[field] = `Use ${max} characters or fewer.`;
  return cleaned;
}

export type ValidRegistration = {
  name: string;
  email: string;
  emailNormalized: string;
  workshopId: string;
  businessName: string | null;
  businessCategory: string | null;
  learningGoals: string | null;
  workshopCommunicationConsent: true;
  marketingConsent: boolean;
  sourceBrand: HostBrand;
};

export function honeypotTripped(input: unknown): boolean {
  if (!input || typeof input !== 'object') return false;
  const value = (input as Record<string, unknown>).companyWebsite;
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateRegistration(input: unknown): ValidRegistration {
  const raw = asRecord(input);
  const errors: FieldErrors = {};
  const name = text(raw.name);
  if (name.length < 1 || name.length > 120) errors.name = 'Enter your name.';
  const email = text(raw.email);
  if (!EMAIL.test(email) || email.length > 200) errors.email = 'Enter a valid email address.';
  const workshopId = text(raw.workshopId);
  if (!workshopId || workshopId.length > 80) errors.workshopId = 'Choose a scheduled workshop.';
  if (raw.workshopCommunicationConsent !== true) {
    errors.workshopCommunicationConsent = 'Consent to workshop emails is required to register.';
  }
  let marketingConsent = false;
  if (raw.marketingConsent === true) marketingConsent = true;
  else if (
    raw.marketingConsent === false ||
    raw.marketingConsent == null ||
    raw.marketingConsent === ''
  ) {
    marketingConsent = false;
  } else {
    errors.marketingConsent = 'Marketing consent must be yes or no.';
  }
  const sourceBrand = brand(raw.sourceBrand, 'sourceBrand', errors);
  const businessName = optionalText(raw.businessName, 160, 'businessName', errors);
  const businessCategory = optionalText(raw.businessCategory, 120, 'businessCategory', errors);
  const learningGoals = optionalText(raw.learningGoals, 2000, 'learningGoals', errors);
  if (Object.keys(errors).length > 0) {
    throw new CommunityHttpError(400, 'Please check the form and try again.', errors);
  }
  return {
    name,
    email,
    emailNormalized: normalizeEmail(email),
    workshopId,
    businessName,
    businessCategory,
    learningGoals,
    workshopCommunicationConsent: true,
    marketingConsent,
    sourceBrand: sourceBrand!,
  };
}

export type ValidHostingRequest = {
  name: string;
  email: string;
  emailNormalized: string;
  businessName: string | null;
  message: string;
  hostingContactConsent: true;
  marketingConsent: boolean;
  sourceBrand: HostBrand;
};

export function validateHostingRequest(input: unknown): ValidHostingRequest {
  const raw = asRecord(input);
  const errors: FieldErrors = {};
  const name = text(raw.name);
  if (name.length < 1 || name.length > 120) errors.name = 'Enter your name.';
  const email = text(raw.email);
  if (!EMAIL.test(email) || email.length > 200) errors.email = 'Enter a valid email address.';
  const message = text(raw.message);
  if (message.length < 1 || message.length > 2000) {
    errors.message = 'Tell us a little about the workshop you want to host.';
  }
  if (raw.hostingContactConsent !== true) {
    errors.hostingContactConsent = 'Consent to be contacted about this request is required.';
  }
  let marketingConsent = false;
  if (raw.marketingConsent === true) marketingConsent = true;
  else if (raw.marketingConsent === false || raw.marketingConsent == null || raw.marketingConsent === '') {
    marketingConsent = false;
  } else {
    errors.marketingConsent = 'Marketing consent must be yes or no.';
  }
  const sourceBrand = brand(raw.sourceBrand, 'sourceBrand', errors);
  const businessName = optionalText(raw.businessName, 160, 'businessName', errors);
  if (Object.keys(errors).length > 0) {
    throw new CommunityHttpError(400, 'Please check the form and try again.', errors);
  }
  return {
    name,
    email,
    emailNormalized: normalizeEmail(email),
    businessName,
    message,
    hostingContactConsent: true,
    marketingConsent,
    sourceBrand: sourceBrand!,
  };
}

export type ValidEventInput = {
  id: string;
  title: string;
  description: string;
  hostBrand: HostBrand;
  start: string;
  end: string;
  timeZone: 'America/Denver';
  venue: string | null;
  onlineUrl: string | null;
  capacity: number | null;
  registrationStatus: 'open' | 'closed';
  topic: string;
  instructor: string;
  image: string | null;
  registrationUrl: string | null;
};

export function validateEventInput(input: unknown): ValidEventInput {
  const raw = asRecord(input);
  const errors: FieldErrors = {};
  const id = text(raw.id) || crypto.randomUUID();
  if (!/^[a-z0-9-]{3,80}$/.test(id)) errors.id = 'Use a short lowercase id.';
  const title = text(raw.title);
  if (title.length < 3 || title.length > 160) errors.title = 'Enter a title.';
  const description = text(raw.description);
  if (description.length < 3 || description.length > 2000) errors.description = 'Enter a description.';
  const hostBrand = brand(raw.hostBrand, 'hostBrand', errors);
  const start = text(raw.start);
  const end = text(raw.end);
  if (!Number.isFinite(Date.parse(start))) errors.start = 'Enter a valid start datetime.';
  if (!Number.isFinite(Date.parse(end))) errors.end = 'Enter a valid end datetime.';
  if (Number.isFinite(Date.parse(start)) && Number.isFinite(Date.parse(end)) && Date.parse(end) <= Date.parse(start)) {
    errors.end = 'End must be after the start.';
  }
  if (raw.timeZone !== 'America/Denver') errors.timeZone = 'Time zone must be America/Denver.';
  const venue = optionalText(raw.venue, 240, 'venue', errors);
  const onlineUrl = optionalText(raw.onlineUrl, 400, 'onlineUrl', errors);
  if (!venue && !onlineUrl) errors.venue = 'Add a venue or an online link.';
  let capacity: number | null = null;
  if (raw.capacity === null || raw.capacity === '' || raw.capacity == null) capacity = null;
  else if (typeof raw.capacity === 'number' && Number.isInteger(raw.capacity) && raw.capacity > 0) {
    capacity = raw.capacity;
  } else errors.capacity = 'Capacity must be a positive whole number, or empty.';
  const registrationStatus = raw.registrationStatus === 'open' ? 'open' : raw.registrationStatus === 'closed' ? 'closed' : null;
  if (!registrationStatus) errors.registrationStatus = 'Registration status must be open or closed.';
  const topic = text(raw.topic);
  if (!topic || topic.length > 160) errors.topic = 'Enter a topic.';
  const instructor = text(raw.instructor);
  if (!instructor || instructor.length > 160) errors.instructor = 'Enter an instructor.';
  const image = optionalText(raw.image, 400, 'image', errors);
  const registrationUrl = optionalText(raw.registrationUrl, 400, 'registrationUrl', errors);
  if (Object.keys(errors).length > 0 || !hostBrand || !registrationStatus) {
    throw new CommunityHttpError(400, 'Please check the event and try again.', errors);
  }
  return {
    id,
    title,
    description,
    hostBrand,
    start,
    end,
    timeZone: 'America/Denver',
    venue,
    onlineUrl,
    capacity,
    registrationStatus,
    topic,
    instructor,
    image,
    registrationUrl,
  };
}

function brand(value: unknown, field: string, errors: FieldErrors): HostBrand | null {
  if (value === 'foundforai' || value === 'fripse') return value;
  errors[field] = 'Brand must be foundforai or fripse.';
  return null;
}
